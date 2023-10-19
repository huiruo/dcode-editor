import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import classNames from 'classnames'
import { CloseOutline } from 'antd-mobile-icons'
import { Dialog } from 'antd-mobile'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'

export const ShareBtnView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const { btnSize = 200, isFixed = true } = assemblyParam

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

  const BtnSize = useMemo(() => {
    const size = Number(btnSize) / 2.95 + 'px'
    return size
  }, [btnSize])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div
        className={classNames('editable-outside-shareBtn', {
          'outside-shareBtn-absolute': !isFixed,
        })}
      >
        <div className="outside-container">
          <div className="mask"></div>
          <div className="outside-edit">
            <CloseOutline onClick={(e) => onRemove(e, index)} />
          </div>
          <div
            className={classNames('tp_tpShareBtn-wrapper', {
              'tp_tpShareBtn-wrapper-absolute': !isFixed,
            })}
          >
            <div
              className="item-info-share-btn"
              style={{ width: BtnSize, height: BtnSize }}
            >
              <div className="tp_tpShareBtn-any-img"></div>
              <span className="item-info-icon-text">分享</span>
            </div>
          </div>
        </div>
      </div>
    </DraggableView>
  )
}
