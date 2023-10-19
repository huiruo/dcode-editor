import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { ActiveView } from './components/ActiveView'
import { processData, random } from '@/common/utils'

interface Props extends DraggableViewProps {
  text?: string
}

const defaultProps = {
  rowType: 'horizontal',
  widgetType: 'secondSkill',
  activity: [],
  showKeys: [
    'linePrice',
    'progress',
    'robNumber',
    'progress',
    'robNumber',
    'countDown',
    'activityTag',
  ],
  showExtra: false,
  extraLinkType: 'miniPage',
  miniPage: {
    id: '',
  },
  onlyCode: random(),
}

export const SecondsKillView = (props: Props) => {
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
          <ActiveView assemblyParam={newAssemblyParam} pageType="secondSkill" />
        </div>
      </div>
    </DraggableView>
  )
}
