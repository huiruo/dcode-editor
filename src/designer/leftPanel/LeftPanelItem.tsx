import React from 'react'
import { useDrag } from 'react-dnd'
import { DragType } from '@/types/dragItemViewType'
import { designerActions } from '@/store/designerSlice'
import store from '@/store/store'
import { BaseComponentType } from '@/types/pageAssemblyTypes'
import IconFont from '@/common/iconFont/index'

export const LeftPanelItem = (props: BaseComponentType) => {
  const { id, iconType, title } = props
  const handleDrag = () => {
    store.dispatch(
      designerActions.dragItemView({
        dragItemView: { id, iconType, title },
        dragType: DragType.Add,
      }),
    )
  }

  const [, dragRef] = useDrag(() => ({
    type: id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging() ? 0.5 : 1,
    }),
  }))

  return (
    <div ref={dragRef} onDrag={handleDrag} className="left-panel-item">
      <IconFont
        type={iconType}
        style={{ fontSize: '30px', color: '#dededde' }}
      />
      <div>{title}</div>
    </div>
  )
}
