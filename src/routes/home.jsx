import React, { useState, useEffect, useContext, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {Card, Checkbox, Divider, Spin, message, Space} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'

const gridStyle = {
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: 'repeat(4, 1fr)'
}

const ActionContext = React.createContext()

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

    const handleDelete = id => {
        axios.post('/api/delete_data', {id})
             .then(_ => setData(data.filter(e => e._id !== id)))
             .catch(err => message.error('Ошибка: ' + err))
    }

    if (!data) return <Spin tip='Загрузка...'/>
    return(
        <ActionContext.Provider value={handleDelete}>
            <Checkbox onChange={e=>setReduced(e.target.checked)}>Отфильтровать по дате</Checkbox>
            {reduced?
                <ReducedGrid data={data}/>
                :
                <SimpleGrid data={data}/>
            }
        </ActionContext.Provider>
    )
}

const SimpleGrid = ({data}) => 
    <div style={gridStyle}>
        {data.map((e, num) => <Elem {...e} key={num}/>)}
    </div>

/**
 * после reduce-а будет { '12-12-12': [{_id: '', list: []}, {}, ...], '13-12-12': [...]}
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
                    <div style={gridStyle}>
                        {elems.map(e=> <Elem {...e} key={e.list[0]+num}/>)}
                    </div>
                </Fragment>)
}

const Elem = ({date, list, _id}) => {
    const del = useContext(ActionContext)
    return(
        <Card 
            title={date}
            extra={ <Space>
                        <NavLink to={`/edit/${_id}`}>Изменить</NavLink>
                        <DeleteOutlined onClick={()=>del(_id)}/>
                    </Space>}
        >
            {list.map((e, num) => <p key={e+num}>{e}</p>)}
        </Card>
    )
}
export default Home
