import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { Image } from 'antd-mobile'
import { NoticeBarItemView } from '@/components/editor/components/NoticeBarItemView'

export const NoticeBarView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="notice-bar-wrap">
        <Image className="logo" src={assemblyParam?.imgUrl}></Image>
        <NoticeBarItemView assemblyParam={assemblyParam} speed={10} />
      </div>
    </DraggableView>
  )
}
