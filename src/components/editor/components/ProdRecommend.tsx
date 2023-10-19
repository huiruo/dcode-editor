import React, { useEffect, useState } from 'react'
import { AssemblyParam, TabListType } from '@/types/pageAssemblyTypes'
import { ProdRecommendItemView } from './ProdRecommendItemView'
import { GetGoodsOptions } from '@/services/types'
import _ from 'lodash'

/**初始数据先 */
const defaultTabList = [
  { title: '页签1' },
  { title: '页签2' },
  { title: '页签3' },
  { title: '页签4' },
]

interface Props {
  /**配置信息 */
  assemblyParam: AssemblyParam
  /**页面类型，积分商品会用到 */
  pageType?: string
}

export const ProductListView = (props: Props) => {
  const { assemblyParam, pageType } = props
  const [current] = useState<number>(0)
  const {
    colorBg,
    activeColor,
    rowType,
    unActiveColor,
    isShowTab,
    bgType,
    imgBg,
    noTab,
    tabList,
  } = assemblyParam

  const [noTabItem, setNoTabItem] = useState<TabListType | undefined>(noTab)
  const [tabItem, setTabItem] = useState<TabListType[] | undefined>(tabList)

  useEffect(() => {
    getProdData(assemblyParam)
  }, [assemblyParam])

  /**
   * 获取商品列表数据
   * @param newAssemblyParam
   */
  const getProdData = async (newAssemblyParam: AssemblyParam) => {
    const { isShowTab, tabList = [], noTab } = newAssemblyParam
    if (isShowTab) {
      //有tab == 多组数据
      const res = tabList?.map(async (item) => {
        const results = await getApiList({ ...item })
        item = { ...item, apiList: results }
        return item
      })
      Promise.all(res).then((values) => {
        setTabItem(values)
      })
    } else {
      const res = await getApiList({ ...noTab })
      const data = {
        apiList: !_.isEmpty(res) ? res : noTab?.apiList,
        list: noTab && noTab.list,
        way: 'notRequest',
      }
      setNoTabItem(data)
    }
  }

  /**
   * 获取商品列表数据
   * @param item
   */
  const getApiList = (item: TabListType) => {
    // notRequest 不需要请求数据，但是此时请确保list里的商品数据是完整的
    const { list, categoryId, number } = item
    if (item.way === 'notRequest') {
      return setItemData({}, true, item)
    }

    if (item.way === 'custom') {
      // 先过滤到itemId为空的情况防止请求接口，因为初始默认值itemId为空
      const itemIds =
        list
          ?.filter((listItem) => listItem.itemId)
          .map((item) => item.itemId) || []
      if (itemIds?.length === 0) return
      const reqParam = {
        isFilterLocal: 2,
        pageSize: list?.length,
        pageNum: 1,
        itemIds: itemIds.join(','),
        status: 1,
      }
      return setItemData(reqParam, false, {})
    }

    if (item.way === 'category') {
      if (categoryId === '') return
      const reqParam = {
        isFilterLocal: 2,
        pageSize: number,
        pageNum: 1,
        dirIds: categoryId,
        status: 1,
      }
      return setItemData(reqParam, false, {})
    }
  }

  //接口数据拼装
  const setItemData = async (
    reqParam: GetGoodsOptions,
    notRequest: boolean,
    item: TabListType | undefined,
  ) => {
    try {
    } catch (error) {
      console.error('setItemData报错：', error)
    }
  }

  /**页签的样式 */
  const tabsStyle =
    bgType === 2
      ? {
          // 设置页签背景
          backgroundImage: `url(${imgBg})`,
          backgroundPosition: 'top center',
          backgroundSize: '100%',
        }
      : {
          backgroundColor: colorBg,
        }

  /**判断是否有页签 */
  const _isShowDefault = !tabItem?.length
  /**页签数组 */
  const tabsList = _isShowDefault ? defaultTabList : tabItem
  //不带标签的数据
  const noTabArr = noTabItem?.apiList
  //带标签的数据
  const tabArr = (tabItem && tabItem[current]?.apiList) || noTabArr
  /**渲染的商品数据 */
  const renderItem = isShowTab ? tabArr : noTabArr
  /** 排列方式的宽度*/
  const width =
    rowType === 'vertical' ? '92%' : rowType === 'verticalSlide' ? '93%' : '75%'

  return (
    <div className="prod-card">
      <div className="card-tab-view">
        {isShowTab && (
          <div className="prod-tab">
            <div className="tabs-main">
              <div className="tabs-header" style={{ ...tabsStyle }}>
                {tabsList?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`at-tabs-item ${
                      current === idx ? 'at-tabs-item--active' : ''
                    }`}
                    style={{
                      color:
                        current === idx
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
                        transform: current === idx ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={`card-${rowType}`} style={{ width: width }}>
          {renderItem && renderItem?.length > 0 ? (
            renderItem?.map((prodItem, idx) => {
              //这里处理接口数据，后台配置商品1、只返回商品id再获取 2、直接把商品需要的key都返回
              return (
                <ProdRecommendItemView
                  assemblyParam={assemblyParam}
                  key={idx}
                  pageType={pageType}
                  prodItem={prodItem}
                />
              )
            })
          ) : (
            <div className="nodata">暂无数据</div>
          )}
        </div>
      </div>
    </div>
  )
}
