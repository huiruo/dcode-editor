import React from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { CloseOutline } from 'antd-mobile-icons'
import { designerActions } from '@/store/designerSlice'
import { Dialog } from 'antd-mobile'
import store from '@/store/store'
import defaultIcon from '@/assets/default-img.png'

export const LevitationToolView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const {
    isOpenTheTool = true,
    toolIcon,
    isOpenScrollTop = false,
    scrollTopIcon,
  } = assemblyParam

  /**
   * 删除组件
   * @param event
   * @param index 当前下标
   */
  const onRemove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
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

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable-outside">
        <div className="mask"></div>
        <div className="outside-edit">
          <CloseOutline onClick={(e) => onRemove(e, index)} />
        </div>
        <div className="levitationTool-wrapper">
          <div className="levitationTool-container">
            {isOpenTheTool && (
              <div className="levitationTool-any levitationTool">
                <div
                  className="levitationTool-any-img"
                  style={{
                    backgroundImage: `url(${
                      (toolIcon?.length && toolIcon[0]) || defaultIcon
                    })`,
                  }}
                ></div>
              </div>
            )}
            {isOpenScrollTop && (
              <div
                className="levitationTool-toTop levitationTool"
                style={{
                  backgroundImage: `url(${
                    scrollTopIcon?.length && scrollTopIcon[0]
                  })`,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </DraggableView>
  )
}
