import React from 'react'
import { Image } from 'antd'
import { RemoteData } from './modal/types'
import { SelectRowDataFormType } from '@/services/product.type'

interface Props {
  dataKey: 'name' | 'children'
  dataSource: RemoteData[] | SelectRowDataFormType[]
}

export const ImgDisplay = (props: Props) => {
  const { dataSource = [], dataKey } = props

  return (
    <div>
      {dataSource.map((item, index) => {
        return (
          <div key={index} className="img-display-item">
            <Image
              width="100%"
              height="100%"
              preview={false}
              src={item[dataKey]}
            />
          </div>
        )
      })}
    </div>
  )
}
