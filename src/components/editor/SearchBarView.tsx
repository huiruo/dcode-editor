import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import IconFont from '@/common/iconFont'
import { Image } from 'antd-mobile'
import cx from 'classnames'
import { BtnItem } from '@/types/editorType'

interface Props extends DraggableViewProps {
  text?: string
}

export const SearchBarView = (props: Props) => {
  const { assemblyInfo, assemblyParam, index } = props
  const {
    bgColor,
    boxColor,
    textColor,
    isTop,
    placeholder,
    btnLeftData,
    btnRightData,
    bgImg,
    Radios,
  } = assemblyParam

  /**搜索栏样式 */
  const searchBarStyle = useMemo(() => {
    let tabStyle = {}
    if (Radios === '2') {
      tabStyle = {
        // 设置页签背景
        backgroundImage: `url(${bgImg?.[0]})`,
        backgroundSize: '100% 100%',
      }
    } else {
      tabStyle = {
        backgroundColor: bgColor,
      }
    }
    return tabStyle
  }, [assemblyParam])

  /**
   *
   * @param btnData 按钮数据
   * @param btnType 按钮类型
   * @returns
   */
  const setBtn = (btnData: BtnItem[], btnType: string) => {
    const arr = btnData ? btnData : []
    const dom = arr.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            position: 'relative',
            width: item.btnWidth ? item.btnWidth + 'px' : '40px',
            paddingBottom: item.btnTitle ? '6px' : 0,
          }}
        >
          <div className="baseAction">
            <Image
              className={btnType === 'left' ? 'action-img' : 'action-img-right'}
              src={item.imgUrl?.[0]}
            />
          </div>
          <div
            className="icon-under-font1"
            style={{ width: item.btnWidth ? item.btnWidth / 2 + 'px' : '24px' }}
          >
            {item.btnTitle ? item.btnTitle : ''}
          </div>
        </div>
      )
    })
    return dom
  }
  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable">
        <div
          className={cx('editable-searchBar', { searchBarPosition: isTop })}
          style={{ ...searchBarStyle }}
        >
          {btnLeftData?.length > 0 && setBtn(btnLeftData, 'left')}
          <div
            className="searchBar-content content-row"
            style={{ backgroundColor: boxColor, color: textColor }}
          >
            <div className="content-col">
              <span>{placeholder || '请输入'}</span>
            </div>
            <div className="content-img">
              <IconFont
                type="icon-sousuolan"
                style={{ fontSize: '12px', color: '#dededde' }}
              />
            </div>
          </div>
          {btnRightData?.length > 0 && setBtn(btnRightData, 'right')}
        </div>
      </div>
    </DraggableView>
  )
}
