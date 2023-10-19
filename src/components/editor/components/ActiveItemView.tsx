import React from 'react'
import '@/styles/center.less'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { Image, ProgressBar } from 'antd-mobile'
import { setClassName, setShowKeys } from '@/common/utils'
import {
  PriceLabelType,
  ProductItem,
  ProgressType,
  TimesType,
} from '@/types/editorType'
import { AddCircleOutline } from 'antd-mobile-icons'
import { CountDownView } from './CountDownView'
import { PAGE_TYPE, WIDGET_TYPE } from '@/common/constants'

interface Props {
  /**组件类型 */
  widgetType?: string
  /**配置信息 */
  assemblyParam: AssemblyParam
  /**商品信息 */
  prodItem: ProductItem
  /**页面类型 */
  pageType: string
  /**活动是否开始 */
  isActivityStart?: boolean
  countdown?: TimesType
  /**活动是否还没有到预热期 */
  isBeforePreheatTime?: boolean
  /**倒计时触发 */
  activityEnd?: () => void
}

export const ActiveItemView = (props: Props) => {
  const {
    assemblyParam,
    widgetType,
    prodItem,
    pageType,
    isActivityStart,
    countdown,
    isBeforePreheatTime,
    activityEnd,
  } = props
  const { rowType, showKeys, buttonType } = assemblyParam
  const {
    name,
    activityPrice,
    price,
    src,
    orderPrice,
    linePrice,
    activityStatistics,
    distributionFee,
    group,
  } = prodItem
  const showKeyObj = setShowKeys(showKeys)

  /**
   * 设置进度条
   * @param data
   * @returns
   */
  const setAtProgress = (data?: ProgressType): number => {
    if (data == undefined) return 0
    const value =
      (Number(data?.originalStock) - Number(data.remainingStock)) /
      Number(data.originalStock)
    return value * 100
  }

  /**
   * 获取活动价格文案
   * @param param0
   * @returns
   */
  const genActivityPriceLabel = ({
    widgetType,
    isBeforePreheatTime,
    defaultLabel = '',
  }: PriceLabelType) => {
    // 没有到预热期直接返回默认label 拼团和秒杀需要展示标签
    if (isBeforePreheatTime && !WIDGET_TYPE.includes(pageType))
      return defaultLabel
    return widgetType === 'secondSkill'
      ? '秒杀价'
      : widgetType === 'prodRecom'
      ? '拼团价'
      : '限折价'
  }

  // 倒计时结束触发事件
  const onTimeUp = () => {
    activityEnd && activityEnd()
  }

  const text = genActivityPriceLabel({ widgetType, isBeforePreheatTime })
  const styleColor = isActivityStart ? '#FF8718' : 'rgb(230, 30, 30)' // 风格颜色

  return (
    <div
      className={`kill-card-size-${rowType}-default kill-card-default-${rowType}`}
    >
      {/* 商品图片 */}
      <div className="orderActive-card-size-le">
        <div className="orderActive-card-size-le-viewImg">
          <Image src={src} height={'100%'} width={'100%'} />
        </div>
        {/* 活动倒计时：大图、多列 */}
        {(showKeyObj.countDown || pageType === 'sellGroup') &&
          rowType !== 'verticalSlide' && (
            <div className="kill-card-countdown-view">
              <div className="kill-card-countdown-leftText">
                {text && rowType === 'horizontalBig' && (
                  <div
                    className="tp_tpText_tag_list"
                    style={{
                      background: '#FFF',
                      color: styleColor,
                      marginRight: '6px',
                    }}
                  >
                    <span>{text}</span>
                  </div>
                )}
                {/* 秒杀、限折、拼团活动 倒计时文案 */}
                {rowType !== 'horizontalBig' && (
                  <span>{isActivityStart ? '距结束' : '距开始'}</span>
                )}

                {rowType === 'horizontalBig' && (
                  <div>
                    {/* 商品价格：活动价/售价 */}
                    <span className="kill-price-act-symbol-big">￥</span>
                    <span className="kill-price-act-big">
                      {activityPrice || price}{' '}
                    </span>
                    {/* 划线价 */}
                    {showKeyObj.linePrice && (
                      <span className="kill-price-act-original-big">￥</span>
                    )}
                    {showKeyObj.linePrice && (
                      <span className="kill-price-act-original-big">
                        {' '}
                        {linePrice}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div>
                {rowType === 'horizontalBig' && (
                  <div className="kill-price-act-end">
                    {isActivityStart ? '距结束' : '距离开始'}
                  </div>
                )}
                <CountDownView
                  day={countdown?.day}
                  hours={countdown?.hours}
                  minutes={countdown?.minutes}
                  seconds={countdown?.seconds}
                  color={styleColor}
                  size={'lg'}
                  onTimeUp={onTimeUp}
                />
              </div>
            </div>
          )}
      </div>
      <div className="orderActive-card-size-ri">
        {/* 商品名称 */}
        {(showKeyObj.itemName || WIDGET_TYPE.includes(pageType)) && (
          <div className="card-default-title">{name}</div>
        )}

        {/* 活动标签 */}
        <div className="orderActive-dcodeText-tag-list">
          {showKeyObj.activityTag &&
            group?.map((itx, index) => {
              return (
                <span
                  className="tag-default-fillTomato size-tag-default"
                  key={`activityTag${index}`}
                >
                  {itx?.text}
                </span>
              )
            })}
        </div>

        {/* 限时折扣活动类型 */}
        {showKeyObj.activityPrice &&
          rowType !== 'verticalSlide' &&
          rowType !== 'horizontalBig' && (
            <span className="kill-card-default-actType">{text}</span>
          )}

        {/* 拼团、秒杀活动类型 */}
        {WIDGET_TYPE.includes(pageType) &&
          rowType !== 'verticalSlide' &&
          rowType !== 'horizontalBig' && (
            <span className="kill-card-default-actType">{text}</span>
          )}

        {/* 订单活动、商品价格：活动价/售价 */}
        {showKeyObj.activityPrice &&
          rowType !== 'horizontalBig1' &&
          pageType === 'orderActivity' && (
            <span className="kill-price-act-symbol"> ￥ </span>
          )}

        {showKeyObj.activityPrice &&
          rowType !== 'horizontalBig1' &&
          pageType === 'orderActivity' && (
            <span className="kill-price-act">
              {activityPrice
                ? activityPrice
                : activityPrice || price || orderPrice}
            </span>
          )}

        {/* 限时折扣活动、商品价格：活动价/售价 */}
        {showKeyObj.activityPrice &&
          rowType !== 'horizontalBig' &&
          pageType === 'discountTime' && (
            <span className="kill-price-act-symbol"> ￥ </span>
          )}

        {showKeyObj.activityPrice &&
          rowType !== 'horizontalBig' &&
          pageType === 'discountTime' && (
            <span className="kill-price-act">
              {activityPrice
                ? activityPrice
                : activityPrice || price || orderPrice}
            </span>
          )}

        {/* 秒杀活动和拼团活动的商品价格：活动价/售价 */}
        {rowType !== 'horizontalBig' && WIDGET_TYPE.includes(pageType) && (
          <span className="kill-price-act-symbol"> ￥ </span>
        )}

        {rowType !== 'horizontalBig' && WIDGET_TYPE.includes(pageType) && (
          <span className="kill-price-act">
            {activityPrice
              ? activityPrice
              : activityPrice || price || orderPrice}
          </span>
        )}

        {/* 划线价 */}
        {showKeyObj.linePrice &&
          rowType !== 'horizontalBig1' &&
          ((PAGE_TYPE.includes(pageType) && rowType !== 'horizontalBig') ||
            pageType === 'orderActivity') && (
            <span className="kill-price-original">￥</span>
          )}
        {showKeyObj.linePrice &&
          rowType !== 'horizontalBig1' &&
          ((PAGE_TYPE.includes(pageType) && rowType !== 'horizontalBig') ||
            pageType === 'orderActivity') && (
            <span className="kill-price-original">{linePrice}</span>
          )}
        {/* 秒杀 进度条 */}
        {rowType !== 'verticalSlide' && WIDGET_TYPE.includes(pageType) && (
          <div className="kill-card-default-kill-bottom">
            {/* 秒杀活动 */}
            {showKeyObj.progress && (
              <div className="kill-card-progress">
                <ProgressBar
                  percent={setAtProgress(activityStatistics)}
                  style={{
                    '--fill-color': 'pink',
                  }}
                />
              </div>
            )}
            {showKeyObj.robNumber && pageType === 'secondSkill' && (
              <span>{`已抢${
                activityStatistics
                  ? activityStatistics.originalStock -
                    activityStatistics.remainingStock
                  : 0
              }件`}</span>
            )}

            {/* 拼团活动 */}
            {showKeyObj.groupNum && (
              <span>{`${
                activityStatistics ? activityStatistics.groupNumber : 0
              }人团`}</span>
            )}
            {showKeyObj.groupNumOff && (
              <span>{`已团${
                activityStatistics ? activityStatistics.totalGroupNumber : 0
              }人`}</span>
            )}
          </div>
        )}

        {/* 购物按钮 */}
        {rowType !== 'verticalSlide' &&
          buttonType === 2 &&
          pageType !== 'sellGroup' && (
            <div
              style={{ backgroundColor: '#E61E1E' }}
              className={setClassName('tp-button-', rowType)}
            >
              立即抢购
            </div>
          )}

        {/* 加入购物车按钮 */}
        {rowType !== 'verticalSlide' &&
          buttonType === 1 &&
          pageType !== 'sellGroup' && (
            <div className={setClassName('tp-cart-', rowType)}>
              <AddCircleOutline color="#E61E1E" fontSize={24} />
            </div>
          )}

        {/* 开团按钮 */}
        {buttonType === 2 && pageType === 'sellGroup' && (
          <div className={setClassName('tp-kill-button-', rowType)}>
            {'我要开团' || ''}
          </div>
        )}

        {/* 分销佣金 */}
        {distributionFee && (
          <div className="distribution-font-small">
            <span className="distribution-font-label">预计佣金</span>
            <span className="distribution-font-val">{distributionFee}</span>
          </div>
        )}
      </div>
    </div>
  )
}
