import React, { useMemo } from 'react'
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
      activityId: '1346798662503872044',
      couponCategory: 50,
      couponName: 'XXXX',
      eventMarketingShow: 2,
      id: '1346798662594049595',
      text: 'yang企微券',
      isReceive: false,
    },
  ],
  onlyCode: random(),
}

export const CouponsView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const newAssemblyParam = useMemo(
    () => processData(assemblyParam, defaultAssemblyParam),
    [assemblyParam],
  )

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
            pageType={'coupons'}
          />
        </div>
      </div>
    </DraggableView>
  )
}
