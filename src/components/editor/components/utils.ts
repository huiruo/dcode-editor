import { DragZoomType } from '@/types/editorType'

//鼠标按下
export const clickData = {
  downClientX: 0,
  downClientY: 0,
  clickH: 0,
  clickW: 0,
  clickLeft: 0,
  clickTop: 0,
}

//鼠标按下
export const setMouseDown = (
  e: {
    preventDefault: () => void
    stopPropagation: () => void
    clientX: number
    clientY: number
  },
  style: DragZoomType,
) => {
  //style做点击时初始值设置
  e.preventDefault()
  e.stopPropagation()
  const { left, top, height, width } = style
  clickData.clickLeft = Number(left) // 鼠标按下时，元素的边距
  clickData.clickTop = Number(top)
  clickData.clickH = Number(height)
  clickData.clickW = Number(width)
  clickData.downClientX = e.clientX // 鼠标按下时，鼠标相对于可视区域的x坐标
  clickData.downClientY = e.clientY // 鼠标按下时，鼠标相对于可视区域的x坐标
}

//鼠标移动
export const setMouseMove = (e: {
  preventDefault: () => void
  stopPropagation: () => void
  clientX: number
  clientY: number
}) => {
  e.preventDefault()
  e.stopPropagation()
  // 元素ele移动的距离l
  const l = e.clientX - clickData.downClientX
  // 元素ele移动的距离l
  const t = e.clientY - clickData.downClientY
  return {
    scrollLeft: l,
    scrollTop: t,
  }
}
//鼠标按下松开
export const setMouseUp = (e: {
  preventDefault: () => void
  stopPropagation: () => void
}) => {
  e.preventDefault()
  e.stopPropagation()
}

//计算拉升type:左，左上，左下，右，右上，右下，上，下距离
export const setZoom = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  type: string,
  style: DragZoomType,
) => {
  let obj = style
  const { scrollLeft, scrollTop } = setMouseMove(e)
  if (type === 'top') {
    obj = {
      ...obj, //初始值，有些不被改动
      top: clickData.clickTop + scrollTop,
      height: clickData.clickH - scrollTop,
    }
    return obj
  }
  if (type === 'bottom') {
    obj = {
      ...obj, //初始值，有些不被改动
      height: clickData.clickH + scrollTop,
    }
    return obj
  }
  if (type === 'left') {
    obj = {
      ...obj, //初始值，有些不被改动
      left: clickData.clickLeft + scrollLeft,
      width: clickData.clickW - scrollLeft,
    }
    return obj
  }
  if (type === 'right') {
    obj = {
      ...obj, //初始值，有些不被改动
      width: clickData.clickW + scrollLeft,
    }
    return obj
  }
  if (type === 'left-top') {
    obj = {
      top: clickData.clickTop + scrollTop,
      height: clickData.clickH - scrollTop,
      left: clickData.clickLeft + scrollLeft,
      width: clickData.clickW - scrollLeft,
    }
    return obj
  }
  if (type === 'right-top') {
    obj = {
      ...obj, //初始值，有些不被改动
      top: clickData.clickTop + scrollTop,
      height: clickData.clickH - scrollTop,
      width: clickData.clickW + scrollLeft,
    }
    return obj
  }
  if (type === 'right-bottom') {
    obj = {
      ...obj, //初始值，有些不被改动
      height: clickData.clickH + scrollTop,
      width: clickData.clickW + scrollLeft,
    }
    return obj
  }
  if (type === 'left-bottom') {
    obj = {
      ...obj, //初始值，有些不被改动
      left: clickData.clickLeft + scrollLeft,
      height: clickData.clickH + scrollTop,
      width: clickData.clickW - scrollLeft,
    }
    return obj
  }
}
