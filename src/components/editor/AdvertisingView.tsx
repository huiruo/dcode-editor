import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import '@/styles/advertising.less'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { GridView } from '@/components/editor/components/GridView'
import { random } from '@/common/utils'

/**广告图初始配置 */
const defaultAssemblyParam: AssemblyParam = {
  height: 375,
  mode: 'lineTwo',
  data: [],
  padding: 20,
  isRound: true,
  onlyCode: random(),
}

export const AdvertisingView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props

  const setRowTypeHtml = (assemblyParam: AssemblyParam) => {
    const { mode } = assemblyParam
    let gap = 0
    let columns = 1
    let type = mode as string
    let assemblyParamVar: AssemblyParam = { ...assemblyParam }
    switch (mode) {
      case 'lineOne':
        gap = 0
        columns = 1
        break
      case 'lineTwo':
        gap = 4
        columns = 2
        break
      case 'lineThree':
        gap = 3
        columns = 3
        break
      case 'lineFour':
        gap = 3
        columns = 4
        break
      case 'lineFive':
        gap = 2
        columns = 5
        break
      case 'rightTwo':
        gap = 2
        columns = 4
        break
      case 'bottomTwo':
        gap = 2
        columns = 4
        break
      default:
        gap = 4
        columns = 2
        type = 'lineTwo'
        assemblyParamVar = { ...defaultAssemblyParam }
        break
    }
    return (
      <div>
        <GridView
          assemblyParam={assemblyParamVar}
          gap={gap}
          columns={columns}
          type={type}
        />
      </div>
    )
  }

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      {setRowTypeHtml(assemblyParam)}
    </DraggableView>
  )
}
