import React, { useEffect, useState } from 'react'
import { DomBaseStyle, DragZoomType } from '@/types/editorType'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import {
  clickData,
  setMouseDown,
  setMouseMove,
  setMouseUp,
  setZoom,
} from './utils'

interface Props {
  index: number
  dragRangeInfo: DomBaseStyle
  assemblyParam: AssemblyParam
  item: DragZoomType
  sunXZoomEvent: (data: DragZoomType, key: number) => void
}

// 拖动时是px，松开时是百分比。这样才不会因为页面大小出现位置错误
const symbol = 'px'

const zoomArr = [
  'top',
  'bottom',
  'left',
  'right',
  'left-top',
  'left-bottom',
  'right-top',
  'right-bottom',
]

export const RndZoneView = (props: Props) => {
  const { index, dragRangeInfo, item, sunXZoomEvent } = props
  const [isMove, setIsMove] = useState<boolean>(false) //判断是在移动
  const [isZoom, setIsZoom] = useState<boolean>(false) //判断伸缩
  const { width, height, top, left } = item
  const [rndStyle, setRndStyle] = useState<DragZoomType>({
    width,
    height,
    left,
    top,
  })

  //更换单位
  const setSymbol = (type: string, itemStyle: DragZoomType): DragZoomType => {
    const { width: p_w, height: p_h } = dragRangeInfo
    const { left, top, height, width } = itemStyle
    const obj = {} as DragZoomType
    if (type === 'px') {
      //如果是%换成px
      function value(a: number | string, b: number | string) {
        const v = (Number(a) * Number(b)) / 100
        return v
      }
      obj['left'] = value(p_w, left)
      obj['width'] = value(p_w, width)
      obj['top'] = value(p_h, top)
      obj['height'] = value(p_h, height)
    }
    if (type === '%') {
      function value(a: number | string, b: number | string) {
        const v = (Number(a) / Number(b)) * 100
        return v.toFixed(2)
      }
      obj['left'] = value(left, p_w)
      obj['width'] = value(width, p_w)
      obj['top'] = value(top, p_h)
      obj['height'] = value(height, p_h)
    }

    return obj
  }

  useEffect(() => {
    if (dragRangeInfo.width && dragRangeInfo.height) {
      const convertStyle = {
        width: width || 20,
        height: height || 20,
        top: top || 20,
        left: left || 20,
      }

      const style = setSymbol('px', convertStyle)
      setRndStyle({ ...style })
    }
  }, [dragRangeInfo, width, height, top, left])

  // 鼠标按下
  const handleMouseDown = (e: {
    preventDefault: () => void
    stopPropagation: () => void
    clientX: number
    clientY: number
  }) => {
    setIsMove(true)
    setMouseDown(e, rndStyle)
  }

  // 按下鼠标移动
  const handleMouseMove = (e: {
    preventDefault: () => void
    stopPropagation: () => void
    clientX: number
    clientY: number
  }) => {
    if (isMove === false) return
    const { scrollLeft, scrollTop } = setMouseMove(e)
    const left = clickData.clickLeft + scrollLeft
    const top = clickData.clickTop + scrollTop

    setRndStyle({ ...rndStyle, left, top })
  }

  //鼠标按下松开
  const handleMouseUp = (e: {
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    setIsMove(false)
    setMouseUp(e)
    const style = setSymbol('%', rndStyle)
    sunXZoomEvent(style, index)
  }
  //-----------------移动end---------------------

  const handleZoomMouseDown = (e: {
    preventDefault: () => void
    stopPropagation: () => void
    clientX: number
    clientY: number
  }) => {
    setIsZoom(true)
    setMouseDown(e, rndStyle)
  }

  const handleZoomMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string,
  ) => {
    if (isZoom === false) return
    const data = setZoom(e, type, rndStyle) as DragZoomType
    if (Number(data?.width) < 32 || Number(data?.height) < 32) return
    setRndStyle({ ...data })
  }

  const handleZoomMouseUp = () => {
    setIsZoom(false)
  }
  //--------------缩放end-----------------

  return (
    <div
      className="drag-zoom dragAndZoom-box-color"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        left: rndStyle.left + symbol,
        top: rndStyle.top + symbol,
        width: rndStyle.width + symbol,
        height: rndStyle.height + symbol,
      }}
    >
      <div className="dragAndZoom__zoom">
        {`热区${index + 1}`}
        {/* 设置热区缩放start */}
        {/* 设置热区缩放start */}
        {zoomArr.map((item) => {
          const s = {} as DragZoomType
          if (item === 'top' || item === 'bottom') {
            s['width'] = rndStyle.width + 'px'
            s['height'] = '1.5625rem'
          }
          if (item === 'left' || item === 'right') {
            s['height'] = rndStyle.height + 'px'
            s['width'] = Number(rndStyle.width) / 2 + 'px'
          }
          return (
            <div
              key={item}
              className={`dragAndZoom__zoom-${item}`}
              style={s}
              onMouseDown={handleZoomMouseDown}
              onMouseMove={(e) => handleZoomMouseMove(e, item)}
              onMouseUp={handleZoomMouseUp}
              onMouseLeave={handleZoomMouseUp}
            />
          )
        })}
        {/* 设置热区缩放end */}
        {/* 设置热区缩放end */}
      </div>
    </div>
  )
}
