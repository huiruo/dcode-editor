import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import classNames from 'classnames'
import { services } from '@/services/api'
import {
  Assembly,
  AssemblyInfo,
  AssemblyParam,
} from '@/types/pageAssemblyTypes'
import { DraggableViewProvider } from '@/designer/centerPanel/DraggableViewProvider'

export const DesignCustormView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props
  const [pageAssembly, setPageAssembly] = useState<Assembly[]>()
  const [currentIndex] = useState<number>(0)
  const {
    activeColor,
    bgType,
    colorBg,
    imgBg,
    tabList = [],
    unActiveColor,
  } = assemblyParam

  useEffect(() => {
    if (
      tabList?.length > 0 &&
      (tabList[currentIndex]?.miniPage?.length ||
        tabList[currentIndex]?.custormModule?.length)
    ) {
      getCustomModule(currentIndex)
    }
  }, [tabList, currentIndex])

  /**
   * 获取页面数据
   * @param cur 选中的页签
   * @returns
   */
  const getCustomModule = async (cur: number) => {
    const tabItem = tabList[cur]
    if (
      tabItem?.miniPage?.length === 0 ||
      tabItem?.custormModule?.length === 0
    ) {
      return setPageAssembly([])
    }

    let pageId = ''
    if (tabItem.custormModule) {
      pageId = tabItem.custormModule[0].id as string
    } else {
      pageId = tabItem.miniPage?.[0].id as string
    }

    const res = await services.getPage({ pageId })
    const pageInfo = JSON.parse(res?.data?.pageText)
    setPageAssembly(pageInfo)
  }

  const renderItem = useCallback(
    (
      assemblyInfo: AssemblyInfo,
      assemblyParam: AssemblyParam,
      index: number,
    ) => {
      return DraggableViewProvider.of(assemblyInfo, assemblyParam, index)
    },
    [],
  )

  /**页签样式 */
  const designCustomStyle = useMemo(() => {
    let tabStyle = {}
    if (bgType === 2) {
      tabStyle = {
        // 设置页签背景
        backgroundImage: `url(${imgBg?.[0]})`,
        backgroundPosition: 'top center',
        backgroundSize: '100%',
      }
    } else {
      tabStyle = {
        backgroundColor: colorBg,
      }
    }

    return tabStyle
  }, [assemblyParam])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="DesignCustomItem">
        <div className="mask"></div>
        <div className="tabList-title">
          <div className="tabs-main">
            <div className="tabs-header" style={{ ...designCustomStyle }}>
              {tabList?.map((item, idx) => (
                <div
                  key={idx}
                  className={classNames('at-tabs-item', {
                    'at-tabs-item--active': currentIndex === idx,
                  })}
                  style={{
                    color:
                      currentIndex === idx
                        ? activeColor || '#ff0000'
                        : unActiveColor || '#333333',
                  }}
                  id={`tab${idx}`}
                >
                  {item.title}
                  <div
                    className="at-tabs-item-underline"
                    style={{
                      backgroundColor: activeColor || '#ff0000',
                      width: '50%',
                      right: '0',
                      margin: 'auto',
                      transform:
                        currentIndex === idx ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tabs-body">
          {pageAssembly?.map((item, index) => {
            const { assemblyInfo, assemblyParam } = item
            return (
              <div key={assemblyInfo.onlyCode}>
                {renderItem(assemblyInfo, assemblyParam, index)}
              </div>
            )
          })}
        </div>
      </div>
    </DraggableView>
  )
}
