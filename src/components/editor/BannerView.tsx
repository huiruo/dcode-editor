import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { Swiper, Image } from 'antd-mobile'
import { random, processData, px2rem } from '@/common/utils'
import { rectangular } from '@/common/constants'

/**首次插入的初始配置 */
const defaultAssemblyParam = {
  height: 260,
  mode: 'scaleToFill',
  data: [
    {
      imgUrl: [rectangular],
      jumpPath: '',
      id: '',
    },
    {
      imgUrl: [rectangular],
      jumpPath: '',
      id: '',
    },
    {
      imgUrl: [rectangular],
      jumpPath: '',
      id: '',
    },
  ],
  autoplay: false,
  onlyCode: random(),
}

export const BannerView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const newAssemblyParam = useMemo(() => {
    return processData(assemblyParam, defaultAssemblyParam)
  }, [assemblyParam])

  const { autoplay = false, data = [], height = 260 } = newAssemblyParam

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="banner-swipe">
        <Swiper autoplay={autoplay}>
          {data &&
            data?.map((item, index) => {
              return (
                <Swiper.Item key={index}>
                  <div style={{ height: px2rem(height) }}>
                    <Image
                      height={'100%'}
                      width={'100%'}
                      src={item.imgUrl && item.imgUrl[0]}
                    />
                  </div>
                </Swiper.Item>
              )
            })}
        </Swiper>
      </div>
    </DraggableView>
  )
}
