import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'

interface Props {
  updatePerson: string
}

export const UserView = (props: Props) => {
  const { updatePerson } = props

  const onChangePassword = () => {
    console.log('onChangePassword')
  }

  const onSignOut = () => {
    console.log('onSignOut')
  }

  return (
    <div className="xy-center">
      <Avatar
        size={34}
        style={{ backgroundColor: '#87d068' }}
        icon={<UserOutlined />}
      />
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: <div onClick={onChangePassword}>修改密码</div>,
            },
            {
              key: '2',
              label: <div onClick={onSignOut}>注销</div>,
            },
          ],
        }}
        placement="bottomLeft"
        arrow
      >
        <span className="app-user"> {updatePerson} </span>
      </Dropdown>
    </div>
  )
}
