import {
  ProductItem,
  ShowKeysItem,
  SkuItem,
  TimesType,
} from '@/types/editorType'
import { Assembly, AssemblyParam } from '@/types/pageAssemblyTypes'
import _ from 'lodash'

interface URLSearchParamsType {
  pageId: string
  shopId: string
  appkey: string
  env: string
  token: string
  lcdpEnv: string
  showContent: boolean
  tempId?: string
  isTemp?: boolean
}

export function random() {
  const str = new Date().getTime().toString()
  const min = 100000
  const max = 999999
  // 生成随机数
  const a = Math.floor(Math.random() * (max - min + 1)) + min
  return str + a
}

export function getIndexURLSearchParams(
  queryParams: URLSearchParams,
): URLSearchParamsType {
  const lcdpEnv = queryParams.get('lcdpEnv') as string
  const pageId = queryParams.get('pageId') as string
  const shopId = queryParams.get('shopId') as string
  const appkey = queryParams.get('appkey') as string
  const env = queryParams.get('env') as string
  const token = queryParams.get('token') as string
  const tempId = queryParams.get('tempId') as string
  const showContent =
    queryParams.get('showContent') === 'true' ? true : false || false
  const isTemp = queryParams.get('isTemp') === 'true' ? true : false || false
  return {
    pageId,
    shopId,
    appkey,
    env,
    token,
    lcdpEnv,
    showContent,
    tempId,
    isTemp,
  }
}

export function sortAssembly(pageAssembly: Assembly[]): Assembly[] {
  function customSort(item: Assembly) {
    if (item.assemblyInfo.id === 'DcodePages') {
      return 0
    } else if (item.assemblyInfo.id === 'DcodeLocation') {
      return 1
    } else {
      return 2
    }
  }

  return pageAssembly.sort((a, b) => customSort(a) - customSort(b))
}

export function px2rem(height?: number): string {
  const toRem = (Number(height) / 46.88).toFixed(4) + 'rem'
  return toRem
}

/**
 *
 * @param showKeys checkBox属性(标签)
 * @returns
 */
export function setShowKeys(showKeys: string[] | undefined) {
  const obj: ShowKeysItem = {}
  if (showKeys !== undefined) {
    showKeys.forEach((item) => {
      obj[item] = true
    })
  }
  return obj
}

/**
 * 配置默认参数
 * @param assemblyParam
 * @returns
 */
export function processData(
  assemblyParam: AssemblyParam,
  defaultAssemblyParam: AssemblyParam,
): AssemblyParam {
  const keys = Object.keys(assemblyParam)
  const filterKeys = keys.filter((item) => item !== 'onlyCode')
  if (filterKeys.length > 0) {
    let newAssemblyParam: AssemblyParam = {
      onlyCode: '',
    }
    /**设置选中时的默认值，如图片、商品信息、等 */
    for (const key in defaultAssemblyParam) {
      if (!filterKeys.includes(key)) {
        newAssemblyParam[key] = defaultAssemblyParam[key]
      }
    }
    newAssemblyParam = {
      ...assemblyParam,
      ...newAssemblyParam,
    }

    if (
      newAssemblyParam?.data &&
      (newAssemblyParam?.data?.constructor == Array) == false
    ) {
      newAssemblyParam = defaultAssemblyParam
    }

    return newAssemblyParam
  } else {
    return defaultAssemblyParam
  }
}

/**
 *
 * @param rowType 排列方式
 * @param defaultApiList 商品数据
 * @returns
 */
export function setDefaultApiList(
  rowType: string | undefined,
  defaultApiList: ProductItem[],
): ProductItem[] {
  const rowTypeList = [
    'horizontal',
    'vertical',
    'verticalThree',
    'verticalSlide',
  ]
  const newRowType = rowType === undefined ? 'horizontal' : rowType
  const list: ProductItem[] = []
  rowTypeList.map((item, index) => {
    if (item === newRowType) {
      for (let i = 0; i < index + 1; i++) {
        list.push(defaultApiList[0])
      }
    }
  })
  return list
}

export const matchingRealField = (name: string): string => {
  const regexResult = name.match(/(.+)-key-/)
  return regexResult?.length ? regexResult[1] : name
}

export const matchingStyle = (name: string): string => {
  const regexResult = name.match(/(.+)px/)
  return regexResult?.length ? regexResult[1] : ''
}

/**
 * 获取最小金额的价格信息
 * @param data
 * @returns
 */
export function fnMinPrice(
  data: SkuItem[] | undefined,
  pageType: string | undefined,
) {
  const isIntegral = pageType === 'points'
  let price = 0
  let linePrice = 0
  let integral = 0 // 需要的积分
  // 积分商品需要根据兑换积分进行排序; 其他商品按照价格进行排序
  // price 为商品价格
  const sortKey = isIntegral ? 'cashIntegral' : 'price'
  const skuList = _.sortBy(data, (o) => o[sortKey]) || []
  if (!_.isEmpty(skuList) && !_.isEmpty(skuList[0])) {
    price = skuList[0].price
    linePrice = skuList[0].itemPriceList[0].price
    if (isIntegral) {
      price = skuList[0].cashAmount
      integral = skuList[0].cashIntegral
    }
  }
  return {
    price,
    integral,
    linePrice,
  }
}

/**
 * 转成时间戳
 * @param day 天
 * @param hours 时
 * @param minutes 分
 * @param seconds 秒
 * @returns
 */
export function toSeconds(
  day?: string | number,
  hours?: string | number,
  minutes?: string | number,
  seconds?: string | number,
): number {
  const second =
    Number(day) * 60 * 60 * 24 +
    Number(hours) * 60 * 60 +
    Number(minutes) * 60 +
    Number(seconds)
  return second
}

/**
 * 计算时间
 * @param newSeconds 时间戳
 * @param isShowDay 是否显示天
 * @returns
 */
export function calculateTime(
  newSeconds: number,
  isShowDay: boolean | undefined,
): TimesType {
  let [day, hours, minutes, seconds] = [0, 0, 0, 0]
  if (newSeconds > 0) {
    day = isShowDay ? Math.floor(seconds / 86400) : 0
    hours = Math.floor(newSeconds / 3600) - day * 24
    minutes = Math.floor(newSeconds / 60) - day * 24 * 60 - hours * 60
    seconds =
      Math.floor(newSeconds) -
      day * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60
  }

  return {
    day,
    hours,
    minutes,
    seconds,
  }
}

/**
 * endTime 结束时间
 */
export function dateFormat(endTime: Date): TimesType {
  const date1 = new Date() // 当前时间
  const date2 = new Date(`${endTime}`.replace(/-/g, '/')) // 结束时间
  const date3 = date2.getTime() - date1.getTime() //时间差秒

  //计算出相差天数
  const day = Math.floor(date3 / (24 * 3600 * 1000))

  //计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))

  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))

  //计算相差秒数
  const leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)

  return { day, hours, minutes, seconds }
}

/**
 * 生成按钮样式名称
 * @param buttonType 按钮类型
 * @param rowType 排列方式
 * @returns
 */
export function styleParamClassName(
  buttonType: string,
  rowType: string | undefined,
): string {
  return `${buttonType}-${rowType}`
}

/**
 *
 * @param couponCategoryType 券类型
 * @returns
 */
export function getCouponCategory(couponCategoryType: number): string {
  let type = ''
  switch (couponCategoryType) {
    case 10:
      type = '满减券'
      break
    case 50:
      type = '折扣券'
      break
    case 20:
      type = '满赠券'
      break
    case 70:
      type = '赠品券'
      break
    case 40:
      type = '兑换券'
      break
    default:
      type = ''
  }
  return type
}

/**
 * 获取活动类型
 * @param activityType 活动类型
 * @returns
 */
export function getActivityType(activityType: string): string {
  let type = ''
  switch (activityType) {
    case 'SECKILL_ACTIVITY':
      type = '秒杀'
      break
    case 'GROUP_ACTIVITY':
      type = '拼团'
      break
    case 'FULL_REDUCTION_ACTIVITY':
      type = '限折'
      break
    case 'TIME_DISCOUNT_ACTIVITY':
      type = '促销'
      break
    default:
      type = ''
  }
  return type
}

/**
 * 活动类型映射活动数据
 * @param activityType 活动类型
 * @returns
 */
export function setActivityData(activityType: string): string {
  let type = ''
  switch (activityType) {
    case 'FULL_PRESENT_ACTIVITY':
      type = 'fullPresentActivity'
      break
    case 'FULL_REDUCTION_ACTIVITY':
      type = 'fullReductionActivity'
      break
    case 'EXCHANGE_ACTIVITY':
      type = 'exchangeActivity'
      break
    case 'FULL_PRESENT_ACTIVITY_2':
      type = 'fullPresentActivity2'
      break
    case 'FULL_REDUCTION_ACTIVITY_2':
      type = 'fullReductionActivity2'
      break
    case 'EXCHANGE_ACTIVITY_2':
      type = 'exchangeActivity2'
      break
    default:
      type = ''
  }
  return type
}

/**
 *
 * @param widgetType 组件类型
 * @returns
 */
export function getWidgetType(widgetType: string): string {
  let type = ''
  switch (widgetType) {
    case 'discountTime':
      type = '限时折扣'
      break
    case 'timeLimit':
      type = '订单活动'
      break
    case 'secondSkill':
      type = '秒杀活动'
      break
    case 'prodRecom':
      type = '拼团活动'
      break
    default:
      type = '限时折扣'
  }
  return type
}

export function setClassName(className: string, rowType?: string): string {
  return `${className}${rowType}`
}

/* 只能输入整数 */
export function numberRep(value?: number) {
  return Math.floor(Number(value)).toString()
}
