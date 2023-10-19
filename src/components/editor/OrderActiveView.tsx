import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { processData, random } from '@/common/utils'
import { ActiveView } from '@/components/editor/components/ActiveView'

const defaultProps = {
  RadioGet: 1, // 1 手动获取; 2 自动获取
  rowType: 'vertical', // 列表样式
  widgetType: 'timeLimit', // 组件类型，控制显示字段
  activity: [], //活动数据
  radioActiveType: 'FULL_PRESENT_ACTIVITY', // 活动类型
  showExtra: false, // 是否展示更多按钮
  extraLinkType: 'miniPage',
  miniPage: {},
  showKeys: [
    // 显示字段
    'itemName', // 商品名称
    'linePrice', // 商品原价
    'activityTag', // 活动标签
    'activityPrice', // 活动价格
    'activityTitle', // 活动标题
  ],
  onlyCode: random(),
}

export const OrderActiveView = (props: DraggableViewProps) => {
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
      <div className="orderActive-time">
        <ActiveView assemblyParam={newAssemblyParam} pageType="orderActivity" />
      </div>
    </DraggableView>
  )
}
