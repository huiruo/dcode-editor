import React, { useState } from 'react'
import { Menu } from 'antd'

const menuLst = [
  {
    key: 'component',
    label: 'Component',
  },
]

export function DesignMenu() {
  const [defaultKeys ] = useState<string[]>(['component'])

  const onClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    // TODO
    console.log('log:',{ key, keyPath })
  }

  return (
    <Menu
      defaultSelectedKeys={defaultKeys}
      defaultOpenKeys={defaultKeys}
      mode="inline"
      theme="dark"
      onClick={onClick}
      items={menuLst}
    />
  )
}
