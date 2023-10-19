import React, { useEffect, useState } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { ProductListView } from '@/components/editor/components/ProdRecommend'
import { processData, random, setDefaultApiList } from '@/common/utils'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { squareImg } from '@/common/constants'

const defaultApiList = [
  {
    src: squareImg,
    name: '商品的名称',
    group: [],
    activityType: '促销',
    activityPrice: 'X.X',
    price: 'XX',
    linePrice: 'XXX',
    orderPrice: '',
  },
]

const defaultProps = {
  rowType: 'horizontal',
  noTab: {
    title: '',
    way: 'custom',
    list: [],
    apiList: defaultApiList,
  },
  isShowTab: false,
  showKeys: ['linePrice', 'activityTag', 'prodName', 'prodPrice'],
  buyType: 'none',
  onlyCode: random(),
}

export const ProdRecommendView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const [newAssemblyParam, setNewAssemblyParam] =
    useState<AssemblyParam>(defaultProps)

  useEffect(() => {
    /**设置初始商品配置 */
    const productList = setDefaultApiList(
      assemblyParam?.rowType,
      defaultApiList,
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
  }, [assemblyParam])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">
        <ProductListView assemblyParam={newAssemblyParam} />
      </div>
    </DraggableView>
  )
}
