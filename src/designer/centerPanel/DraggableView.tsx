import React, { ReactNode, useMemo } from 'react'
import type { Identifier } from 'dnd-core'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd'
import store from '@/store/store'
import {
  DragItemViewType,
  DragType,
  DropAcceptList,
} from '@/types/dragItemViewType'
import {
  currentMoveState,
  currentSelectViewState,
  designerActions,
} from '@/store/designerSlice'
import { random } from '@/common/utils'
import { AssemblyInfo, AssemblyParam } from '@/types/pageAssemblyTypes'
import { DeleteOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/store/hook'
import { Dialog } from 'antd-mobile'
import { ASSEMBLY_INFO_ID } from '@/common/constants'
import classNames from 'classnames'

export interface DraggableViewProps {
  index: number
  children?: ReactNode
  assemblyInfo: AssemblyInfo
  assemblyParam: AssemblyParam
}

// TODO:  这个不用了?
interface DragItem {
  id: string
  type: string
  index: number
}

export const DraggableView: FC<DraggableViewProps> = ({
  assemblyInfo,
  assemblyParam,
  index,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const currentSelectView = useAppSelector(currentSelectViewState)
  const currentMoveView = useAppSelector(currentMoveState)

  // 改成了hover的形式
  // const style = {
  //   // 显示虚线框
  //   border:
  //     currentSelectView.assemblyInfo?.onlyCode === assemblyInfo.onlyCode &&
  //     !ASSEMBLY_INFO_ID.includes(currentSelectView.assemblyInfo.id)
  //       ? '1px dashed red'
  //       : '0px dashed red',
  //   /** 暂时屏蔽，组件要设置背景色,padding值不需要全局*/
  //   // padding: '0.5rem 0.5rem 0.5rem 0.5rem',
  //   marginBottom: '.5rem',
  //   backgroundColor: '#f5f7fa',
  //   cursor: 'move',
  // }

  const [mDragIndex, setMDragIndex] = useState(-1)

  const [
    {
      handlerId,
      isOverCurrent, // 当前悬停
    },
    drop,
  ] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isOver: boolean; isOverCurrent: boolean }
  >({
    accept: DropAcceptList,
    drop: (item, monitor: DropTargetMonitor) => {
      // console.log(
      //   'draggableView=>前置',
      //   store.getState().designer.currentDrag.dragType,
      //   '-',
      //   DragType.Add,
      // )
      /** 如果是新增 */
      if (store.getState().designer.currentDrag.dragType === DragType.Add) {
        const didDrop = monitor.didDrop()
        if (didDrop) return
        // console.log(
        //   'draggableView-->如果是新增',
        //   store.getState().designer.currentDrag.dragView,
        // )

        const onlyCode = random()
        store.dispatch(
          designerActions.insertIntoIndex({
            index: index,
            itemView: {
              assemblyInfo: {
                ...store.getState().designer.currentDrag.dragView,
                onlyCode,
              },
              assemblyParam: { onlyCode },
            },
          }),
        )
        /** 如果是调整 */
      } else if (
        store.getState().designer.currentDrag.dragType === DragType.Adjust
      ) {
        if (mDragIndex !== -1) {
          // console.log('如果是调整==>', {
          //   dragIndex: mDragIndex,
          //   hoverIndex: index,
          //   itemView: store.getState().designer.pageAssembly[mDragIndex],
          // })

          store.dispatch(
            designerActions.moveToIndex({
              dragIndex: mDragIndex,
              hoverIndex: index,
              itemView: store.getState().designer.pageAssembly[mDragIndex],
            }),
          )
        }
      }
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }), //当前悬停在此item上
      }
    },
    /** 拖拽悬停 */
    /* eslint-disable no-unused-vars */
    hover(item: DragItem, monitor) {
      // console.log('hover monitor:', monitor)
      if (!ref.current) return
      // 设置当前插入位置
      setMDragIndex(item.index)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: DragItemViewType.DcodeLocation,
    item: () => {
      // console.log('DragItemViewType.Card==>item:', {
      //   assemblyInfo,
      //   assemblyParam,
      // })
      return { itemView: { assemblyInfo, assemblyParam }, index }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleDrag = () => {
    const { id, iconType, title } = assemblyInfo
    store.dispatch(
      designerActions.dragItemView({
        dragItemView: { id, iconType, title },
        dragType: DragType.Adjust,
      }),
    )
  }

  const handleClick = () => {
    store.dispatch(
      designerActions.selectItemView({
        assemblyInfo,
        assemblyParam,
        index,
      }),
    )
  }

  const handleMouseEnter = () => {
    store.dispatch(
      designerActions.moveItemView({
        onlyCode: assemblyInfo.onlyCode,
        index,
        id: assemblyInfo.id,
      }),
    )
  }

  const onRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    event.stopPropagation?.()
    Dialog.confirm({
      content: (
        <div>
          <div className="dialog-title">消息</div>
          <div className="dialog-delete">是否要删除</div>
        </div>
      ),
      onConfirm: () => {
        store.dispatch(designerActions.removeView(index))
      },
    })
  }

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  const dragStyle = useMemo<{ top: boolean; color: string }>(() => {
    let color
    if (isOverCurrent) {
      // 悬停变色
      color = '#009a00'
    } else {
      color = 'transparent'
    }

    let top
    if (mDragIndex < index) {
      // 上边显示指示器 or 下边显示指示器
      top = true
    } else {
      top = false
    }

    return { top, color }
  }, [mDragIndex, isOverCurrent])

  return (
    <div>
      {/* 指示器 */}
      <div
        style={{
          width: '100%',
          height: 2,
          backgroundColor: !dragStyle.top ? dragStyle.color : 'transparent',
        }}
      />

      <div
        ref={ref}
        onDrag={handleDrag}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        style={{ opacity }}
        className={classNames({
          'draggable-content': !ASSEMBLY_INFO_ID.includes(assemblyInfo.id),
        })}
        data-handler-id={handlerId}
      >
        {(currentMoveView?.onlyCode === assemblyInfo?.onlyCode ||
          currentSelectView?.assemblyInfo?.onlyCode ===
            assemblyInfo?.onlyCode) &&
          !ASSEMBLY_INFO_ID.includes(currentMoveView.id) && (
            <div
              className="remove-draggable"
              onClick={(e) => {
                onRemove(
                  e,
                  assemblyInfo.id === 'DcodeHotZone'
                    ? currentSelectView.index
                    : currentMoveView.index,
                )
              }}
            >
              <DeleteOutlined />
            </div>
          )}
        {children}
      </div>

      {/* 指示器 */}
      <div
        style={{
          width: '100%',
          height: 2,
          backgroundColor: dragStyle.top ? dragStyle.color : 'transparent',
        }}
      />
    </div>
  )
}
