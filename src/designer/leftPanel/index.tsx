import React from 'react'
import { LeftPanelItem } from './LeftPanelItem'
import { componentList } from '@/common/componentList'
import '@/styles/leftPanel.less'

export const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="site-card-wrapper">
        {componentList.map((item) => {
          return (
            <LeftPanelItem
              key={item.id}
              id={item.id}
              iconType={item.iconType}
              title={item.title}
            />
          )
        })}
      </div>
    </div>
  )
}
