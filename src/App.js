import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import { AuthProvider } from './hooks/useAuth'
import Routes from './routes'
import {Layout} from 'antd'

const  App = () => 
    <AuthProvider>
      <Layout>
        <Router>
          <Header />
          <Routes />
        </Router>
        <Footer />
      </Layout>
    </AuthProvider>

export default App;
