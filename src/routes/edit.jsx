import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import {Form, DatePicker, Input, Button, Spin, Space, message} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 4 },
}
const config = {
    rules: [{ type: 'object' }],
}
const dateFormat = 'YYYY/MM/DD'

const SubElem = ({data, edit, id}) => {
    const history = useHistory()
    const api_url = edit ? '/api/change_data' : '/api/create_data'
    const button_message = edit ? 'Изменить' : 'Создать'
    /**
     * формат: 
     * {
     *  date: 1212/12/12,
     *  list: [1, 2, 'text', ...]
     * }
     */

    const onFinish = fields => {
        axios.post(api_url, {
            id,
            date: fields.date.format(dateFormat),
            list: fields.list
        })
        .then(_ => history.push('/'))
        .catch(err => 'Ошибка: ' + err)
    }

    return(
        <Form {...layout} name="subform" onFinish={onFinish}>
            <Form.Item
                {...config}
                initialValue={moment(data.date, dateFormat)}
                name='date'
            >
                <DatePicker
                    defaultValue={moment(data.date, dateFormat)}
                    format={dateFormat}
                />
            </Form.Item>
            <Form.List
                name='list'
                initialValue={data.list}
            >
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(field =>
                            <Space key={field.key} style={{ display: 'flex'}}>
                                <Form.Item
                                    key={field.key}
                                    name={field.name}
                                >
                                    <Input />
                                </Form.Item>
                                <MinusCircleOutlined onClick={()=>remove(field.name)}/>
                            </Space>
                        )}
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '60%' }}
                            icon={<PlusOutlined />}
                        >
                            Добавить заметку
                        </Button>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    {button_message}
                </Button>
                <Button htmlType="button" onClick={()=>history.push('/')}>
                    Закрыть
                </Button>
            </Form.Item>
        </Form>
    )
}
export const Create = () => {
    const now = new Date()
    return <SubElem data={{
        date: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
        list: []}}
    />
}

export const Edit = () => {
    const {id} = useParams()
    const [data, set] = useState(null)

    useEffect(()=>{
        if (data) return
        axios.post('/api/get_data', {id})
             .then(ret => set(ret.data))
             .catch(err => message.error('Ошибка: ' + err))
    }, [data])

    if (!data) return <Spin tip='Загрузка...'/>
    return <SubElem edit data={data} id={id}/>
}