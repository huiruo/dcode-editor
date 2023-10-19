import React, { ReactNode } from 'react'
import { Layout } from 'antd'
import { HeaderNav } from './headerNav'
import { DesignMenu } from './menu/index'

const { Header, Content, Sider } = Layout

interface BasicLayoutProps {
  children: ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <Layout className="ant-layout-container">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        {/* <div className="app-logo">Dcode web designer</div> */}
        <HeaderNav />
      </Header>
      <Layout>
        <Sider width={120} collapsed={false}>
          <DesignMenu />
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
