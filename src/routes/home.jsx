import React, { useState, useEffect, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {Card, Checkbox, Divider, Spin, message} from 'antd'

const Home = () => {
    /**
     * data = [
     *  {id: '123...', date: 12-12-12, list: [1, 2, 'text', ...]},
     *  {id: '123...', date: 13-12-12, list: [1, 2, 'text', ...]},
     *  ...
     * ]
     */
    const [data, setData] = useState(null)
    const [reduced, setReduced] = useState(false)

    useEffect(()=>{
        if (data) return
        axios.post('/api/get_all_data')
             .then(ret => {
                 console.log(ret.data)
                setData(ret.data)
             })
             .catch(err => message.error('Ошибка: ' + err))
    }, [data])

    if (!data) return <Spin tip='Загрузка...'/>
    return(
        <div>
            <Checkbox onChange={e=>setReduced(e.target.checked)}>Отфильтровать по дате</Checkbox>
            {reduced?
                <ReducedGrid data={data}/>
                :
                <SimpleGrid data={data}/>
            }
        </div>
    )
}

const SimpleGrid = ({data}) => data.map((e, num) => <Elem {...e} key={e.date+num}/>)

/**
 * после reduc-а будет { '12-12-12': [{_id: '', list: []}, {}, ...], '13-12-12': [...]}
 */
const ReducedGrid = ({data}) => {
    const reduced = data.reduce((red, curr)=> {
        const {date, list, _id} = curr
        if (red[date])
            red[date].push({list, _id})
        else
            red[date] = [{list, _id}]
        return red
    }, {})

    return Object.entries(reduced).map(([date, elems], num) => 
        <Fragment key={date+num}>
            <Divider>{date}</Divider>
            {elems.map(e=> <Elem {...e} key={e.list[0]+num}/>)}
        </Fragment>
    )
}

const Elem = ({date, list, _id}) => 
    <Card title={date} extra={<NavLink to={`/edit/${_id}`}>Изменить</NavLink>}>
        {list.map(e => <p key={e}>{e}</p>)}
    </Card>

export default Home