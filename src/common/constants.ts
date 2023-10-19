import { random } from '@/common/utils'
import { ossImgEditorUrl, ossImgUrl } from '@/services/api'

export const success = '0'
export const SUCCESS = 1

export const DETAIL_VIEW_PAGE = '/pages/pageNgine/item/detail/DetailView'

export const MIMI_PAGE = '/pages/pageNgine/wPage'

export const COUPON_DETAIL = '/pages/pageNgine/coupon/detail/index'

export const squareImg = `${ossImgUrl}square.png`

export const rectangular = `${ossImgUrl}rectangular.png`

/* eslint-disable no-unused-vars */
export enum ValidationWarnKey {
  TooLong = 'tooLong',
  Required = 'required',
}

export const couponColumns = [
  {
    dataIndex: 'couponName',
    title: '优惠券模板',
  },
  {
    dataIndex: 'couponCode',
    title: '模板编号',
  },
  {
    dataIndex: 'couponCategory',
    title: '类型',
    emum: {
      '10': '满减券',
      '40': '兑换券',
      '50': '折扣券',
      '70': '赠品券',
    },
  },
  {
    dataIndex: 'receiveStartTime',
    title: '开放领取时间',
  },
  {
    dataIndex: 'couponTemplateStatus',
    title: '状态',
    emum: {
      '10': '未启用',
      '20': '已启用',
      '30': '已禁用',
      '40': '已结束',
    },
  },
]

export const goodsColumns = [
  {
    title: '商品编码',
    dataIndex: 'itemCode',
  },
  {
    title: '商品名称',
    dataIndex: 'itemCode',
  },
  {
    title: '售价',
    dataIndex: 'maxSellPrice',
  },
  {
    title: '库存',
    dataIndex: 'itemTotalStorage',
  },
]

export const miniPageColumns = [
  {
    title: '标题',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
]

/**链接类型 */
export const options = [
  { value: 'page', label: '页面' },
  { value: 'product', label: '商品' },
  { value: 'category', label: '类目' },
  { value: 'miniPage', label: '微页面' },
  { value: 'coupon', label: '优惠券' },
  { value: 'customPage', label: '自定义' },
]

/**跳转页面 */
export const jumpPageList = [
  { label: '首页', value: '/pages/pageNgine/index' },
  { label: '购物车', value: '/pages/pageNgine/item/cart/index' },
  { label: '分类', value: '/pages/pageNgine/item/category/index' },
  { label: '我的', value: '/pages/memberCenter/index' },
  { label: '领券中心', value: '/pages/pageNgine/coupon/couponReceive/index' },
  { label: '我的卡券', value: '/pages/pageNgine/coupon/myCoupon/index' },
  { label: '我的收藏', value: '/pages/pageNgine/myFavorite/index' },
  { label: '浏览足迹', value: '/pages/pageNgine/myFootprint/index' },
  { label: '平台客服', value: 'CUSTOMER_SERVICE_PLATFORM' },
  { label: '店铺客服', value: 'CUSTOMER_SERVICE_SHOP' },
  { label: '注册登录页', value: '/pages/login/index' },
]

/**跳转页面 */
export const modeItem = [
  {
    label: '一行一个',
    value: 'lineOne',
    src: `${ossImgEditorUrl}/pageEdit1.png`,
    srcSelected: `${ossImgEditorUrl}/pageEdit1_1.png`,
  },
  {
    label: '一行两个',
    value: 'lineTwo',
    src: `${ossImgEditorUrl}/pageEdit2.png`,
    srcSelected: `${ossImgEditorUrl}/pageEdit2_2.png`,
  },
  {
    label: '一行三个',
    value: 'lineThree',
    src: `${ossImgEditorUrl}/pageEditLine3.png`,
    srcSelected: `${ossImgEditorUrl}/pageEditLine3_3.png`,
  },
  {
    label: '一行四个',
    value: 'lineFour',
    src: `${ossImgEditorUrl}/pageEditLine4.png`,
    srcSelected: `${ossImgEditorUrl}/pageEditLine4_4.png`,
  },
  {
    label: '一行五个',
    value: 'lineFive',
    src: `${ossImgEditorUrl}/pageEditLine5.png`,
    srcSelected: `${ossImgEditorUrl}/pageEditLine5_5.png`,
  },
  {
    label: '一左二右',
    value: 'rightTwo',
    src: `${ossImgEditorUrl}/pageEdit4.png`,
    srcSelected: `${ossImgEditorUrl}/pageEdit4_4.png`,
  },
  {
    label: '一上二下',
    value: 'bottomTwo',
    src: `${ossImgEditorUrl}/pageEdit3.png`,
    srcSelected: `${ossImgEditorUrl}/pageEdit3_3.png`,
  },
]

export const PAGE_TYPE = ['discountTime', 'secondSkill', 'sellGroup']
export const WIDGET_TYPE = ['secondSkill', 'sellGroup']
export const ASSEMBLY_INFO_ID = ['DcodeLevitationTool', 'DcodeShareBtn']

export const PAGE_TITLE_INFO = {
  Radios: '1',
  bgColor: '#FFF',
  containTop: false,
  showTabBar: true,
  pageTitle: '',
  shareTitle: '',
  shareImg: [],
  onlyCode: random() as string | number,
  bgImg: [],
}
