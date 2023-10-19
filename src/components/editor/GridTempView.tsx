import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { Image } from 'antd-mobile'
import { DataListParam } from '@/types/editorType'
import { random, processData } from '@/common/utils'
import { squareImg } from '@/common/constants'

/**图文导航首次插入的初始配置 */
const defaultAssemblyParam = {
  data1: [
    {
      jumpPath: '',
      text: '导航一',
      imgUrl: [squareImg],
    },
    {
      jumpPath: '',
      text: '导航二',
      imgUrl: [squareImg],
    },
    {
      jumpPath: '',
      text: '导航三',
      imgUrl: [squareImg],
    },
    {
      jumpPath: '',
      text: '导航四',
      imgUrl: [squareImg],
    },
    {
      jumpPath: '',
      text: '导航五',
      imgUrl: [squareImg],
    },
  ],
  data2: [],
  onlyCode: random(),
}

export const GridTempView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const newAssemblyParam = processData(assemblyParam, defaultAssemblyParam)

  /**
   * 渲染单个图标+文字
   * @param data
   * @returns
   */
  const renderGridTemp = (data: DataListParam[]) => {
    return (
      <div className="scroll-row">
        {data?.map((item, index) => {
          return (
            <div className="scroll-col" key={index}>
              <div className="grid-basicAction">
                <div className="grid-imageText">
                  <Image
                    src={item.imgUrl && item.imgUrl[0]}
                    width={36}
                    height={32}
                  />
                </div>
                <div className="grid-imageText">
                  <span className="grid-text">{item.text}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">
        <div className="grid-default">
          <div className="grid-scrollX">
            {renderGridTemp(newAssemblyParam?.data1)}
            {newAssemblyParam?.data2?.length > 0 &&
              renderGridTemp(newAssemblyParam?.data2)}
          </div>
        </div>
      </div>
    </DraggableView>
  )
}
