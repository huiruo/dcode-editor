import React, { useMemo, useState } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { Image } from 'antd-mobile'
import { cloneDeep } from 'lodash'
import { DomBaseStyle, DragZoomType } from '@/types/editorType'
import classnames from 'classnames'
import { RndZoneView } from '@/components/editor/components/RndZoneView'
import { useAppSelector } from '@/store/hook'
import { currentSelectViewState } from '@/store/designerSlice'

interface Props extends DraggableViewProps {
  handleFormValue?: <T>(field: string, value: T) => void
}

export const HotZoneView = (props: Props) => {
  const currentSelectView = useAppSelector(currentSelectViewState)
  const [domBaseInfo, setDomBaseInfo] = useState<DomBaseStyle>({
    width: 0,
    height: 0,
  })
  const { assemblyInfo, assemblyParam, index, handleFormValue } = props
  const { dragZoomData, imgUrl, isRound, padding, onlyCode } = assemblyParam

  /**
   * 热区拖拽区域样式
   */
  const HotZoneStyle = useMemo(() => {
    const style = {
      marginLeft: padding + 'px',
      marginRight: padding + 'px',
      borderRadius: isRound ? 24 + 'px' : 0,
    }
    return style
  }, [assemblyParam])

  const BaseEventOrigFunction = () => {
    setTimeout(() => {
      const elem = document.querySelector(`.hotZoom-${index}`)
      if (!elem) return
      const { width, height } = elem.getBoundingClientRect()
      setDomBaseInfo({ width, height })
    }, 500)
  }

  // 块组件拖动反馈
  const sunXZoomEvent = (data: DragZoomType, key: number) => {
    const dragData = cloneDeep(dragZoomData) as DragZoomType[]
    dragData[key].height = data.height
    dragData[key].left = data.left
    dragData[key].top = data.top
    dragData[key].width = data.width
    if (onlyCode === currentSelectView.assemblyParam.onlyCode) {
      handleFormValue && handleFormValue('dragZoomData', dragData)
    }
  }

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div
        className={classnames('hotZoom', `hotZoom-${index}`)}
        style={HotZoneStyle}
      >
        {imgUrl && imgUrl?.length > 0 ? (
          <div className="hotZoom-img">
            <Image
              src={imgUrl && imgUrl[0]}
              width={'100%'}
              onLoad={BaseEventOrigFunction}
            />
          </div>
        ) : (
          <div className="noData"></div>
        )}
        {dragZoomData &&
          dragZoomData.map((item, inx) => {
            return (
              <RndZoneView
                key={`dragZoom${inx}`}
                index={inx}
                dragRangeInfo={domBaseInfo}
                item={item}
                assemblyParam={assemblyParam}
                sunXZoomEvent={sunXZoomEvent}
              />
            )
          })}
      </div>
    </DraggableView>
  )
}
