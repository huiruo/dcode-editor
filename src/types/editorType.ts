export interface ModuleItem {
  /**自定义 */
  coordinate: string
  /**操作类型 */
  type: string
  param: ModuleParam
  span?: number
  children?: ModuleParam[]
}

export interface ModuleParam {
  /**操作类型 */
  actionType: string
  /**路径 */
  path: string
  /**样式类型 */
  styleType: string
  /**样式参数 */
  styleTypeParam: styleParam
  span?: number
}

export interface styleParam {
  /**图片所占宽度 */
  width: string
  /**图片所占高度 */
  height: number
  /**边框圆角 */
  borderRadius: number
  /**图片路径 */
  src: string
}

export interface DataListParam {
  imgUrl: string[]
  text?: string
  coordinate?: string
  linkType: string
  page: string
}

export interface FormTabsParm {
  templateId: string
  label: string
  mode: string
  id: string
  key: string
}

export interface ShowKeysItem {
  [key: string]: boolean // 字段扩展声明
}

export interface ProductItem {
  displayName?: string
  /**商品图片 */
  src?: string
  /**商品名称 */
  name?: string
  /**
   * 活动类型
   * SECKILL_ACTIVITY 秒杀
   * GROUP_ACTIVITY 拼团
   * FULL_REDUCTION_ACTIVITY 限折| 促销
   * TIME_DISCOUNT_ACTIVITY 限折| 促销
   * */
  activityType?: string | number
  /**活动价 */
  activityPrice?: string | number
  /**商品价 */
  price?: string | number
  /**划线价 */
  linePrice?: string | number
  /**订单价格 */
  orderPrice?: string | number
  children?: string
  id?: string
  /**商品ID */
  itemId?: string
  /**跳转链接 */
  jumpUrl?: string
  cashAmount?: string | number
  /**积分展示方式 1为纯积分  2为积分+金额 */
  cashType?: number
  /**积分 */
  cashIntegral?: string | number
  /**店铺Id */
  shopId?: string
  /**店铺标签 */
  shopTags?: string[]
  /**活动标签 */
  group?: { text?: string }[]
  busType?: number
  /**状态 */
  status?: number
  mainPic?: string
  tags?: TagItem[]
  shelfType?: number
  /**预计佣金 */
  distributionFee?: number
  activityStatistics?: ProgressType
  itemSkuList?: SkuItem[]
}

export interface BtnItem {
  /**按钮标题 */
  btnTitle: string
  /**按钮宽度 */
  btnWidth: number
  /**按钮背景图片 */
  imgUrl?: string[]
  /**链接类型 */
  linkType?: string
  /**链接路径 */
  page?: string
}

export interface CouponsItem {
  /**券值 */
  couponValue: string
  /**券标签 */
  tag: string
  /**活动Id**/
  activityId?: string
  /**券名称**/
  couponName: string
  /**链接路径 */
  eventMarketingShow?: number
  /**
   * 券类型 
   *  10: '满减券',
      50: '折扣券',
      20: '满赠券',
      70: '赠品券',
      40: '兑换券', 
   * */
  couponCategory: number
  /**券Id */
  id: string
  /** */
  text?: string
  isReceive?: boolean
}

export interface GoodsInfo {
  endRow: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: ProductItem[]
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums?: string[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  size: number
  startRow: number
  total: number
}

export interface TagItem {
  activityId: string
  activityTag: string
  activityTemplateId: string
  createTime: string
  customerId?: string
  dimension?: number
  endTime: string
  eventMarketingShow?: boolean
  extFields: Record<string, unknown>
  id: string
  itemId?: string
  populationType?: number
  preheatStartTime?: string
  shippingType?: number
  shopId: string
  tenantId?: string
  type?: number
}

export interface SkuItem {
  price: number
  cashAmount: number
  cashIntegral: number
  itemPriceList: {
    price: number
  }[]
}

export interface ActiveParam {
  /**活动结束 */
  isActivityEnd?: boolean
  /**活动开始 */
  isActivityStart?: boolean
  /**活动信息 */
  activityInfo: ActiveItem
  /**商品信息 */
  apiList?: ProductItem[]
  /**活动是否还没有到预热期*/
  isBeforePreheatTime?: boolean
  /**倒计时 */
  countdown?: {
    day?: number | string
    hours?: number | string
    minutes?: number | string
    seconds?: number | string
  }
}

export interface ActiveItem {
  /**活动Id */
  id?: string
  /**活动编号 */
  activityCode?: string
  /**活动名称 */
  activityName?: string
  /**活动标签 */
  tag?: string
  /**商品信息 */
  apiList?: ProductItem[]
  /**活动开始时间 */
  beginTime?: string | number
  /**活动结束时间 */
  endTime?: string | number
  /**活动状态名 */
  activityStatusName?: string
  preheatEndTime?: string | number
  /**预热活动开始时间 */
  preheatStartTime?: string | number
  dataIndex?: string | number
}

export interface TimesType {
  day?: string | number
  hours?: string | number
  minutes?: string | number
  seconds?: string | number
}

export interface ProgressType {
  originalStock: number
  remainingStock: number
  groupNumber?: number
  totalGroupNumber?: number
}

export interface PriceLabelType {
  /**组件类型 */
  widgetType?: string
  /**活动是否还没有到预热期 */
  isBeforePreheatTime?: boolean
  /**活动类型 */
  defaultLabel?: string
}

export interface PageTitleType {
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
}

export interface DomBaseStyle {
  width: string | number
  height: string | number
}

export interface DragZoomType extends DomBaseStyle {
  top: string | number
  left: string | number
  linkType?: string | number
  page?: string
}

export interface customModuleType {
  children: string
  code: string
  id: string
  newUrl: string
  text: string
  value: string
}
