import React, { useState } from 'react'
import { Form, Input, Button, Typography, message } from 'antd'
// import { services } from '@/services/api'
// import { SUCCESS } from '@/common/constants'
import { history } from 'umi'

export interface UserFormValues {
  username: string;
  password: string;
}

const { Title } = Typography

/**
 * test account:
 * admin
 * dcode10086
*/
const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: UserFormValues) => {
    setLoading(true)
    /*
    const res = await services.loginApi(values)
    if (res.code === SUCCESS) {
      message.success('登录成功')
      setTimeout(() => {
        history.push('/dcode')
      }, 800)
    } else {
      message.success(res.msg)
    }
    */
    message.success('登录成功')

    setTimeout(() => {
      history.push('/dcode')
    }, 1000)

    setLoading(false)
  }

  return (
    <div className='xy-center' style={{ height: '100vh' }}
    >
      <Form
        name="loginForm"
        onFinish={onFinish}
        initialValues={{ remember: true,
          username: 'admin',
          password: 'dcode10086'
         }}
        style={{ width: 300 }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          欢迎来到dapp
        </Title>

        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账户名' }]}
        >
          <Input placeholder="账户" style={{ fontSize: '18px', height: '40px' }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" style={{ fontSize: '18px', height: '40px' }} />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ height: '38px', width: '200px' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login