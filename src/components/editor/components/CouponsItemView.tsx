import React from 'react'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { getCouponCategory } from '@/common/utils'

const received = { background: '#E8E8E8', color: '#999' }
const unReceive = { background: '#FEE5DF', color: '#E61E1E' }

interface Props {
  /**组件类型 coupons优惠券 exchange兑换券 */
  pageType?: string
  /**数据源 */
  assemblyParam: AssemblyParam
}

export const CouponsItemView = (props: Props) => {
  const { assemblyParam, pageType } = props
  const { coupons } = assemblyParam

  return (
    <div className="coupons-scroll">
      <div className="coupons-view">
        {coupons?.map((prodItem) => {
          return (
            <div
              key={prodItem.id}
              className="coupons-item"
              style={prodItem.isReceive ? received : unReceive}
            >
              {/* 长条左边布局样式 */}
              <div className="coupons-left">
                <div className="flex-row-center">
                  <span className="coupons-top coupons-top-exchange">
                    {/* 券类型 */}
                    {getCouponCategory(prodItem.couponCategory)}
                  </span>
                  <span className="coupons-top-price">
                    {[10, 20].includes(prodItem.couponCategory) ? '￥' : ''}
                  </span>
                  <span className="coupons-top">
                    {[10, 50, 20].includes(prodItem.couponCategory)
                      ? prodItem.couponValue
                      : ''}
                  </span>
                  {prodItem.couponCategory === 50 && (
                    <span className="coupons-top">折</span>
                  )}
                </div>
                <span className="coupons-bottom">{prodItem.tag}</span>
              </div>
              {/* 中间的分界线 */}
              <div className="coupons-line">
                <div
                  className="coupons-radius-top coupons-icon-bg"
                  style={{ background: '#F5F7FA' }}
                ></div>
                <div
                  className="line"
                  style={{ border: `1px dashed ${unReceive.color}` }}
                ></div>
                <div
                  className="coupons-radius-bottom coupons-icon-bg"
                  style={{ background: '#F5F7FA' }}
                ></div>
              </div>
              {/* 右边布局样式 */}
              <div className="coupons-right">
                <div
                  style={{
                    color: prodItem.isReceive
                      ? received.color
                      : unReceive.color,
                  }}
                >
                  <div>{pageType === 'exchange' ? '立即兑换' : '立即领取'}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
