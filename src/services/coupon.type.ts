import { PaginationType } from './types'

export interface GetCouponParams extends PaginationType {
  receiveType: number
}

/*
export const couponMap = new Map([
  ['/api/promotion/v2/marketing/tai/coupon/template/page', 'coupon'],
  ['/api/promotion/v1/marketing/coupon/template/list', 'exchange'],
  ['/api/promotion/v1/marketing/ext/coupon/template/list', 'coupons']
])
*/

export type CouponReqType = 'coupon' | 'coupons' | 'exchange'

export interface GetCouponTemplateParams extends PaginationType {
  collectionMethod: number
  couponTemplateStatus: number
  couponCategory: number
  couponName?: string
}

export interface Coupon {
  activityCode: null
  activityId: string
  activityName: null
  activityType: null
  allShopCanUse: number
  amount: number
  beginTime: null
  brandIdList: null
  collectionMethod: number
  couponCategory: number
  couponCode: string
  couponGiftItems: null
  couponItems: null
  couponName: string
  couponRange: number
  couponRanges: null
  couponRemaining: null
  couponStoreIssueDtos: null
  couponTemplateStatus: string
  couponUseBeginTime: string
  couponUseEndTime: null
  couponUseTimeReqDto: null
  couponValue: number
  dailyLimitNum: null
  dirIdList: null
  dynamicDate: string
  eachAcquireMaximum: number
  endTime: null
  eventMarketingNum: null
  eventMarketingShow: number
  exchangeItems: null
  forPeople: null
  giftSendWay: null
  id: string
  isNew: null
  itemIdList: null
  itemRange: string
  limitNum: null
  maxDiscountValue: null
  openAddWechat: number
  openReceiveQuantity: number
  organizationId: null
  organizationIds: null
  organizationName: null
  pointsIncrementType: null
  population: null
  preheatStartTime: null
  promotionMethod: null
  receiveEndTime: string
  receiveStartTime: string
  receivedQuantity: number
  relationReqDtos: null
  remainingQuantity: number
  remark: string
  returnGoods: null
  sendPoint: null
  sendPoster: null
  sendSwitch: boolean
  sendValidTime: null
  sharedDiscountList: null
  shippingType: number
  shopDayLimitNum: null
  shopIdList: null
  shopLimitNum: null
  shopPopulationDto: null
  shopRangeType: null
  shopSendEndTime: null
  shopSendPosterImg: null
  shopSendQuantity: number
  shopSendStartTime: null
  stockId: string
  subscribeExpireBeforeDays: null
  subscribeExpirePage: null
  subscribeExpireSwitch: number
  subscribeExpireTime: null
  subscribeExpireTips: null
  subscribeGetPage: null
  subscribeGetSwitch: number
  subscribeGetTips: null
  subscribeGrantPage: null
  subscribeGrantSwitch: number
  subscribeGrantTips: null
  tag: string
  taiApplyShop: null
  totalIssueQuantity: number
  validEndTime: string
  validityType: number
  wechatImgPath: null
}
