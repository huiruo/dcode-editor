import React, { useEffect, useState } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { ProductListView } from '@/components/editor/components/ProdRecommend'
import { processData, random, setDefaultApiList } from '@/common/utils'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { squareImg } from '@/common/constants'

const defaultProps = {
  rowType: 'vertical',
  noTab: {
    title: '',
    way: 'custom',
    list: [
      {
        id: '',
        name: '苹果XR',
        itemId: '',
        shopId: '',
      },
    ],
    apiList: [
      {
        src: squareImg,
        name: '积分商品--名称',
        cashType: 2, //1为纯积分  2为积分+金额
        cashIntegral: 'XX',
        cashAmount: 'XXX',
        price: 'XX',
        linePrice: 'XXX',
      },
    ],
  },
  isShowTab: false,
  showKeys: ['linePrice'],
  onlyCode: random(),
}

export const PointsMerchandiseView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const [newAssemblyParam, setNewAssemblyParam] =
    useState<AssemblyParam>(defaultProps)

  useEffect(() => {
    const productList = setDefaultApiList(
      assemblyParam?.rowType,
      defaultProps.noTab.apiList,
    )

    let defaultAssemblyParam = processData(assemblyParam, defaultProps)
    defaultAssemblyParam = {
      ...defaultAssemblyParam,
      noTab: {
        ...defaultAssemblyParam.noTab,
        apiList: productList,
      },
    }
    setNewAssemblyParam(defaultAssemblyParam)
  }, [assemblyParam.rowType, assemblyParam.isShowTab])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">
        <ProductListView assemblyParam={newAssemblyParam} pageType={'points'} />
      </div>
    </DraggableView>
  )
}
