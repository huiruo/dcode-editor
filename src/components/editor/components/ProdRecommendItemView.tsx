import React from 'react'
import '@/styles/center.less'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { Image } from 'antd-mobile'
import { setShowKeys } from '@/common/utils'
import { ProductItem } from '@/types/editorType'

interface Props {
  /**页面类型，积分商品会用到 */
  pageType?: string
  /**配置信息 */
  assemblyParam: AssemblyParam
  /**商品信息 */
  prodItem: ProductItem
}

export const ProdRecommendItemView = (props: Props) => {
  const { assemblyParam, pageType, prodItem } = props
  const { rowType, buyType, showKeys } = assemblyParam
  const {
    name,
    activityPrice,
    price,
    src,
    orderPrice,
    linePrice,
    activityType,
    cashType,
    cashIntegral,
    cashAmount,
    distributionFee,
    shopTags,
    group,
  } = prodItem
  const showKeyObj = setShowKeys(showKeys)

  return (
    <div className={`card-size-${rowType}-default card-default-${rowType}`}>
      <div className="card-size-le">
        <Image src={src} height={'100%'} width={'100%'} />
      </div>
      <div className="card-size-ri">
        {/* 商品名称 */}
        {showKeyObj.prodName && (
          <div className="card-default-title">
            {/* 推荐商品 */}
            {name}
          </div>
        )}
        {/* 积分商品 */}
        {pageType === 'points' && (
          <div className="card-points">
            <div className="points-mrg-ri">
              <span>{cashIntegral}积分</span>
            </div>
            {cashType === 2 && (
              <div className="points-price">
                <div className="points-price-bg"></div>
                <div>
                  +<span className="points-price-cont">{cashAmount}元</span>
                </div>
              </div>
            )}
          </div>
        )}
        {/* 推荐商品 */}
        {!pageType && (
          <div className="prodRecomItem-tag-list">
            {/* 店铺标签 */}
            {shopTags?.map((item, index) => (
              <span
                className="tag-default-fillTomato size-tag-default"
                key={`tag${index}`}
              >
                {item}
              </span>
            ))}
            {/* 活动标签 */}
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
        )}
        <div className="card-bottom-flex">
          <div className="card-bottom-show">
            {/* 活动类型 后面对数据再放开*/}
            {showKeyObj.prodPrice && activityType && (
              <span className="card-default-actType">{activityType}</span>
            )}
            {/* 商品价格：活动价/售价 */}
            {showKeyObj.prodPrice && !pageType && (
              <span className="price-act-symbol">￥</span>
            )}
            {showKeyObj.prodPrice && !pageType && (
              <span className="price-act">
                {activityPrice
                  ? activityPrice
                  : activityPrice || price || orderPrice}
              </span>
            )}
            {/* 划线价 */}
            {showKeyObj.linePrice && <span className="price-original">￥</span>}
            {showKeyObj.linePrice && (
              <span className="price-original">{linePrice}</span>
            )}

            {/* 分销佣金 */}
            {distributionFee && (
              <div>
                <span>预计佣金</span>
                <span>{distributionFee}</span>
              </div>
            )}
          </div>
          <div className="card-bottom-action">
            {buyType === 'addCart' &&
              (rowType === 'horizontal' ||
                rowType === 'vertical' ||
                rowType === 'horizontalCategory') && (
                <div className="card-action-cart"></div>
              )}
            {buyType === 'immedBuy' && rowType === 'horizontal' && (
              <div className="card-action-buy">立即抢购</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
