import React from 'react'
import { useAuth } from '../hooks/useAuth'
import {Layout, Menu} from 'antd'
import { HomeOutlined, EditOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const {isLogged, name, logout} = useAuth()
    const handleLogout = () => logout()

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
                    <Menu.Item icon={<UnlockOutlined />} onClick={handleLogout}>
                        Выйти
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
