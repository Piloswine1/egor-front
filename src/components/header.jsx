import React from 'react'
import { useAuth } from '../hooks/useAuth'
import {Layout, Menu} from 'antd'
import { HomeOutlined, EditOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const {isLogged, name, logout} = useAuth()
    const handleLogout = e => {
        e.preventDefault()
        logout()
    }
    return(
        <Layout.Header>
            {isLogged? 
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item icon={<HomeOutlined />}>
                        <NavLink to='/'>
                            Главная
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined />}>
                        <NavLink to='/create'>
                            Создать
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<UnlockOutlined />}>
                        <a to='/' onClick={handleLogout}>
                            Выйти
                        </a>
                    </Menu.Item>
                    <Menu.Item icon={<UserOutlined />}>
                        Привет, {name}
                    </Menu.Item>
                </Menu>
                : 
                null
            }
        </Layout.Header>
    )
}

export default Header