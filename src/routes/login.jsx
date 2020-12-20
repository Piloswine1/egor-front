import React from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import {Form, Input, Button, message} from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 4 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const Login = () => {
    const {login} = useAuth()
    const history = useHistory()

    const onFinish = val => {
        axios.post('/api/login', val)
             .then(_ => {
                login(val.username)
                history.push('/')
             })
             .catch(err => message.error('Ошибка: ' + err))
    }
    const onFinishFailed = err => message.error('Ошибка: ' + err)
    
    return(
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Имя:"
                name="username"
                rules={[{ required: true, message: 'Введите имя!' }]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Войти
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login
