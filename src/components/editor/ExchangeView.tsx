import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { processData, random } from '@/common/utils'
import { CouponsItemView } from '@/components/editor/components/CouponsItemView'

/**券信息默认配置信息 */
const defaultAssemblyParam = {
  coupons: [
    {
      couponValue: 'XX',
      tag: 'XXXX',
      activityId: '1345345514948133054',
      couponCategory: 40,
      couponName: 'XXXX',
      eventMarketingShow: 2,
      id: '1345345515026776270',
      text: '优先-单兑换鼠',
      isReceive: false,
    },
  ],
  onlyCode: random(),
}

export const ExchangeView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const newAssemblyParam = processData(assemblyParam, defaultAssemblyParam)
  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">
        <div className="coupons">
          <CouponsItemView
            assemblyParam={newAssemblyParam}
            pageType={'exchange'}
          />
        </div>
      </div>
    </DraggableView>
  )
}
