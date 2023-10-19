import { PaginationType } from './types'

export interface ActivityInfo {
  id: string
  /**活动名称 */
  activityName?: string
  /**活动开始时间 */
  beginTime: string
  /**活动结束时间 */
  endTime: string
  /**预热开始时间 */
  preheatStartTime: string
}

export interface GetActivityOptions {
  pageEditActivityType?: string
  activityType?: string
}

export interface ActivityListOptions extends PaginationType {
  activityType: string
  activityName?: string
  status: number
  type: string
  activityStatus: string
}

export interface Activity {
  actionDtos: null
  activityCode: string
  activityItemRange: string
  activityName: string
  activityRange: null
  activityStatus: string
  activityStatusName: null
  activityTemplate: null
  activityTemplateId: string
  auditPerson: null
  auditStatus: string
  beginTime: string
  conditionDtos: null
  contentId: null
  contentTemplateId: null
  createPerson: string
  createTime: string
  customerAreaCodes: null
  customerTypeIds: null
  endTime: string
  eventMarketingShow: null
  execExpression: null
  extFields: object
  extension: string
  id: string
  instanceId: string
  mutexLevel: number
  noticeTime: null
  openMergeGroup: null
  organizationId: null
  organizationName: null
  pointDeductionRate: null
  policyIds: null
  population: null
  preheatEndTime: null
  preheatStartTime: string
  promotionMethod: number
  promotionMethodName: null
  remark: string
  returnGoods: null
  selectCustomer: null
  selectType: null
  sellerId: null
  shippingType: number
  shopId: null
  tag: string
  tenantId: number
  updatePerson: string
  updateTime: string
  userIds: null
}
