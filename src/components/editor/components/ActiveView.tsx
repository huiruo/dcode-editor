import React, { useEffect, useState } from 'react'
import {
  dateFormat,
  getWidgetType,
  setActivityData,
} from '@/common/utils'
import { Button } from 'antd-mobile'
import { CountDownView } from './CountDownView'
import { ActiveItem, ActiveParam, ProductItem } from '@/types/editorType'
import { ActiveItemView } from '@/components/editor/components/ActiveItemView'
import { cloneDeep, isEmpty } from 'lodash'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { PAGE_TYPE, WIDGET_TYPE, squareImg } from '@/common/constants'

interface Props {
  /**页面类型*/
  pageType: string
  /**配置信息 */
  assemblyParam: AssemblyParam
}

const defaultApiList = [
  {
    src: squareImg,
    name: '天天特卖',
    group: [],
    activityType: '促销',
    activityPrice: 'X.X111', // 现价
    price: 'XX222',
    linePrice: 'XXX333', // 原价
  },
  {
    src: squareImg,
    name: '百亿补贴',
    group: [],
    activityType: '促销',
    activityPrice: 'X.X111', // 现价
    price: 'XX222',
    linePrice: 'XXX333', // 原价
  },
]

const defaultState = {
  isActivityEnd: true,
  isActivityStart: false,
  current: 0, // 标题活动ID
  // 活动信息
  activityInfo: {},
  // 商品数据
  apiList: defaultApiList,
  // 活动是否还没有到预热期
  isBeforePreheatTime: true,
  countdown: { day: '00', hours: '00', minutes: '00', seconds: '00' },
}

export const ActiveView = (props: Props) => {
  const { assemblyParam, pageType } = props
  const [intState, setIntState] = useState<ActiveParam>(defaultState)
  const [currentIndex, setCurrenIndex] = useState<number>(0)

  const {
    rowType,
    RadioNotice,
    ActivityTitle1,
    ActivityTitle2,
    isShare,
    showExtra,
    widgetType,
    rule1,
    rule2,
    radioActiveType,
    number1,
    RadioGet,
    activity,
  } = assemblyParam

  useEffect(() => {
    handleClick(currentIndex)
  }, [assemblyParam, pageType])

  /**
   * 设置默认数据
   */
  const setDefaultData = () => {
    setIntState({
      ...defaultState,
      apiList: cloneDeep(defaultApiList),
    })
  }

  /**
   * 处理订单活动列表数据
   * @param radioActiveType 活动类型
   * @returns
   */
  const setActivity = (radioActiveType: string) => {
    return setActivityData(radioActiveType)
  }

  /**
   * 标题触发
   */
  const handleClick = (value: number) => {
    /**限时折扣、拼团活动、秒杀活动 没有radioActiveType字段 */
    const activityType = !isEmpty(radioActiveType) ? radioActiveType : ''
    if (value === 1) {
      /**订单活动 预告请求**/
      const noticeRadioActiveType = activityType + '_2'
      RadioGet === 1 && getDataSelect(noticeRadioActiveType) // 预告手动
      RadioGet === 2 && getApiAuto(rule2, activityType) // 预告自动
    }

    if (value === 0) {
      /** 限时折扣、订单活动 今日请求 */
      RadioGet === 1 && getDataSelect(activityType) // 今日手动
      RadioGet === 2 && getApiAuto(rule1, activityType) // 今日自动

      /**拼团、秒杀活动、限时折扣、请求 */
      WIDGET_TYPE.includes(pageType) && getDataSelect(activityType)
    }
  }

  /**
   * 自动获取
   * @param data 活动获取 TODAY_ACTIVITY今日活动
   * @param radioActiveType 活动类型
   * @returns
   */
  const getApiAuto = async (rule: string, radioActiveType: string) => {

    /**如无活动,则设置默认 */
    if (!rule1) return setDefaultData()
  }

  /**
   * 手动获取
   * @param radioActiveType 活动类型
   * @returns
   */
  const getDataSelect = async (radioActiveType: string) => {
    let activityType = ''
    if (PAGE_TYPE.includes(pageType) && !radioActiveType) {
      // 拼团、限时折扣、秒杀活动
      activityType = activity?.length > 0 ? 'activity' : ''
    } else if (radioActiveType) {
      // 订单活动
      activityType = setActivity(radioActiveType)
    }

    // 没有设置活动则设置为默认数据
    if (!activityType) return setDefaultData()

    try {
      const result = await getApiList(
        assemblyParam[activityType][0].id,
        number1,
      )
      let apiList: ProductItem[] = []
      if (result) {
        apiList = result.slice(0, number1)
      }
      setTimeStart(assemblyParam[activityType][0], apiList)
    } catch (error) {
      console.error('请求出错')
    }
  }

  /**
   *
   * @param item 活动id
   * @param RadioGet 获取方式 1 手动 2自动
   * @returns
   */
  const getApiList = (
    activityId: string | undefined,
    number1: number | undefined,
  ) => {
    // 拿不到活动id直接跳出
    if (!activityId) return Promise.resolve(null)

    return setItemData()
  }

  /**
   * 请求商品数据
   * @param reqParam 请求信息
   * @returns
   */
  const setItemData = async () => {
    try {
      // todo: 请求商品数据
    } catch (error) {}
  }

  /**
   * 倒计时结束触发事件
   */
  const onTimeUp = () => {
    setTimeStart({}, intState?.apiList)
  }

  /**
   * 处理时间逻辑
   * @param activity 活动信息
   * @returns
   */
  const setTimeStart = (
    activity: ActiveItem,
    apiList: ProductItem[] | undefined,
  ) => {
    if (!activity) return
    const { preheatStartTime, beginTime, endTime } = activity
    const activityEndTime = endTime || activity.dataIndex
    const newTime = new Date()
    const beginTimes = new Date(`${beginTime}`.replace(/-/g, '/'))
    const endTimes = new Date(`${activityEndTime}`.replace(/-/g, '/'))
    const preheatStartDate = new Date(
      `${preheatStartTime || beginTime}`.replace(/-/g, '/'),
    )
    const isActivityStart = newTime.getTime() > beginTimes.getTime()
    const isActivityEnd = endTimes.getTime() > newTime.getTime()
    // 是否还未到预热期
    const isBeforePreheatTime = preheatStartDate.getTime() > newTime.getTime()
    setIntState({
      ...intState,
      activityInfo: activity,
      isBeforePreheatTime,
      isActivityStart: isActivityStart,
      isActivityEnd: isActivityEnd,
      apiList,
      countdown: isActivityStart
        ? dateFormat(endTimes)
        : dateFormat(beginTimes),
    })
  }

  /**
   * 标题切换
   * @param inx
   */
  const clickHandle = (inx: number) => {
    setCurrenIndex(inx)
  }

  const { countdown, isActivityStart, apiList } = intState
  const tabTitle =
    rowType !== 'verticalSlide'
      ? RadioNotice
        ? [{ title: ActivityTitle1 }, { title: ActivityTitle2 }]
        : [{ title: ActivityTitle1 }]
      : [{ title: ActivityTitle1 }]

  const width = rowType === 'verticalSlide' ? '93%' : '95%'

  return (
    <div className="orderActive-time">
      <div className="order-card">
        {/* 活动标题 */}
        <div className="card-time-title">
          {tabTitle?.map((item, index) => {
            return (
              <div
                key={`${item.title}${index}`}
                className="discount-time-title-item"
                onClick={() => clickHandle(index)}
                style={{ color: index === currentIndex ? 'red' : '#333' }}
              >
                <span className="discount-time-title-text">{item.title}</span>
              </div>
            )
          })}
        </div>
        {/* 订单活动 */}
        {(pageType === 'orderActivity' || rowType === 'verticalSlide') && (
          <div
            className="flex-row-center flex-row-between"
            style={{ width: '93%' }}
          >
            <div className="flex-row-center">
              <div className="card-verticalSlide-title">
                {getWidgetType(widgetType)}
              </div>
              <CountDownView
                day={countdown?.day}
                hours={countdown?.hours}
                minutes={countdown?.minutes}
                seconds={countdown?.seconds}
                color="#FFF"
                background={isActivityStart ? '#E61E1E' : '#FFBF00'}
                size="lg"
                onTimeUp={onTimeUp}
              />
            </div>
            {rowType === 'verticalSlide' && showExtra && (
              <div className="extra-text">{'更多>'}</div>
            )}
          </div>
        )}
        {/* 分享按钮 */}
        {isShare && (
          <div className="dcode_discount_time_share_off">
            <Button open-type="share" className="dcode_discount_time_share_button">
              分享活动
            </Button>
          </div>
        )}
        {/* 活动 */}
        <div className={`card-kill-${rowType}`} style={{ width: width }}>
          {apiList && apiList?.length > 0 ? (
            apiList?.map((prodItem, idx) => {
              //这里处理接口数据，后台配置商品1、只返回商品id再获取 2、直接把商品需要的key都返回
              return (
                <div key={idx} style={{ marginTop: '15px' }}>
                  <ActiveItemView
                    assemblyParam={assemblyParam}
                    widgetType={widgetType}
                    prodItem={prodItem}
                    pageType={pageType}
                    isActivityStart={isActivityStart}
                    activityEnd={onTimeUp}
                    countdown={countdown}
                    isBeforePreheatTime={intState.isBeforePreheatTime}
                  />
                </div>
              )
            })
          ) : (
            <div className="empty-view">暂无活动</div>
          )}
        </div>
      </div>
    </div>
  )
}
