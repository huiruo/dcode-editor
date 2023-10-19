export interface ModalType {
  /**自定义 */
  customValue: string
  /**弹窗的宽 */
  width: number
  /**是否显示弹窗 */
  showPopup: boolean
  /**弹窗标题 */
  title: string
  /**选中的链接方式 */
  selectType: string
  /**第一个搜索条件 */
  firstName: string
  /**第二个搜索条件 */
  secondName: string
  columns: object[]
}
export interface LinkItem {
  /**跳转方式名称 */
  label: string
  /**选中的值 */
  value: string
}
