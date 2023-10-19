import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { processData, random } from '@/common/utils'

const defaultProps = {
  height: 24,
  onlyCode: random(),
}

export const PaddingLineView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props

  const newAssemblyParam = useMemo(
    () => processData(assemblyParam, defaultProps),
    [assemblyParam],
  )

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div
        className="editable"
        style={{
          height: newAssemblyParam?.height && newAssemblyParam?.height / 2.96,
        }}
      ></div>
    </DraggableView>
  )
}
