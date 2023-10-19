import React from 'react'
// import { Button } from 'antd-mobile'
import { EnvironmentOutline, DownOutline } from 'antd-mobile-icons'

import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'

interface Props extends DraggableViewProps {
  text?: string
}

export const LocationView = (props: Props) => {
  const { assemblyInfo, assemblyParam, index } = props
  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      {/* <Button> */}
      {/* LocationView:{assemblyInfo.title} */}
      {/* </Button> */}
      <div className="location">
        <div className="location-icon">
          <EnvironmentOutline />
        </div>
        <div className="location-content">定位中...</div>
        <div className="location-arrow">
          <DownOutline fontSize={14} />
        </div>
      </div>
    </DraggableView>
  )
}
