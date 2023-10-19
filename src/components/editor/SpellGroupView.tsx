import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { processData, random } from '@/common/utils'
import { ActiveView } from './components/ActiveView'

const defaultProps = {
  rowType: 'horizontal',
  widgetType: 'prodRecom',
  activity: [],
  showKeys: [
    'linePrice',
    'groupNum',
    'groupNumOff',
    'robNumber',
    'activityTag',
  ],
  onlyCode: random(),
}

export const SpellGroupView = (props: DraggableViewProps) => {
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
      <div className="editable">
        <div className="orderActive-time">
          <ActiveView assemblyParam={newAssemblyParam} pageType="sellGroup" />
        </div>
      </div>
    </DraggableView>
  )
}
