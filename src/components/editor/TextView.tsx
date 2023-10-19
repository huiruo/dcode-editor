import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'

interface Props extends DraggableViewProps {
  text?: string
}

export const TextView = (props: Props) => {
  const { assemblyInfo, assemblyParam, index } = props
  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">{assemblyInfo.title}</div>
    </DraggableView>
  )
}
