import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { ActiveView } from '@/components/editor/components/ActiveView'
import { processData, random } from '@/common/utils'

const defaultProps = {
  RadioGet: 1, // 1 手动获取; 2 自动获取
  rowType: 'vertical', // 列表样式
  widgetType: 'discountTime', // 组件类型，控制显示字段
  showExtra: false, // 是否展示更多按钮
  miniPage: [],
  activity: [],
  showKeys: [
    // 显示字段
    'itemName', // 商品名称
    'linePrice', // 商品原价
    'robNumber', // 已抢件数
    'countDown', // 倒计时
    'inventory', // 剩余库存
    'activityTag', // 活动标签
    'activityPrice', // 活动价格
    'activityTitle', // 活动标题
  ],
  onlyCode: random(),
}

export const DiscountTimeView = (props: DraggableViewProps) => {
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
          <ActiveView
            assemblyParam={newAssemblyParam}
            pageType="discountTime"
          />
        </div>
      </div>
    </DraggableView>
  )
}
