import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {Layout} from 'antd'
import Home from './home'
import Login from './login'
import { useAuth } from '../hooks/useAuth'
import {Edit, Create} from './edit'

const Routes = () => 
    <Layout.Content 
        style={{paddingTop: 100, paddingLeft: 50, paddingRight: 50, minHeight: '80vh'}}
    >
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <PrivatePath exact path="/">
                <Home />
            </PrivatePath>
            <PrivatePath path="/edit/:id">
                <Edit />
            </PrivatePath>
            <PrivatePath path="/create">
                <Create />
            </PrivatePath>
        </Switch>
    </Layout.Content>

const PrivatePath = ({children, exact, path}) => {
    const {isLogged} = useAuth()
    return(
        <Route exact={exact} path={path}>
            {isLogged?
                children
                :
                <Redirect to="/login"/>
            }
        </Route>
    )
}

export default Routes