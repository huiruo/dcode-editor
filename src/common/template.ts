import { ModuleItem, ModuleParam } from '@/types/editorType'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { rectangular } from './constants'

/**
 *
 * @param props 原始数据默认认值
 * @param columns 列数
 * @returns
 */
export function getTemplate(
  props: AssemblyParam,
  columns: number,
): ModuleItem[] {
  const { data, mode, height, isRound } = props
  let moduleArr = []
  const itemHeight = Number(height)
  for (let i = 1; i <= columns; i++) {
    moduleArr.push({
      coordinate: `0-${i - 1}`,
      type: 'action',
      param: {
        actionType: 'jump',
        path: '',
        styleType: 'img',
        span: 1,
        styleTypeParam: {
          width: '100%',
          height: itemHeight,
          borderRadius: isRound ? 24 : 0,
          src: rectangular,
        },
      },
    })
  }

  /**左一右二布局 */
  if (mode === 'rightTwo') {
    const maxHeight = Number(height)
    const heightArr = [maxHeight, maxHeight / 2, maxHeight / 2]
    moduleArr.map((item, index) => {
      const dataItem = data && data[index]
      item.param.styleTypeParam.height = heightArr[index]
      item.param.span = 2
      if (dataItem) {
        item.param.styleTypeParam.src = dataItem.imgUrl[0]
        item.param.path = dataItem.linkType as string
      }
    })

    // 先过滤掉高度为undefined情况
    moduleArr = moduleArr.filter(
      (item) => item.param.styleTypeParam.height !== undefined,
    )

    /**把能除尽2和3的塞进一个数组里方便做排列 */
    const arr = [] as ModuleParam[]
    moduleArr.forEach((itx, inx) => {
      if ((inx + 1) % 2 === 0 || (inx + 1) % 3 === 0) {
        arr.push(itx.param)
      }
    })

    // 拼接数据只针对rightTwo排列
    moduleArr.map((item, index) => {
      if ((index + 1) % 2 === 0) {
        Object.assign(item, { children: arr, param: {} })
      }
    })
  } else if (mode === 'bottomTwo') {
    /**上一下二布局 */
    const itemHeight = Number(height) / 2
    const heightArr = [itemHeight, itemHeight, itemHeight]
    const spanArr = [4, 2, 2]
    moduleArr.map((item, index) => {
      const dataItem = data && data[index]
      item.param.styleTypeParam.height = heightArr[index]
      item.param.span = spanArr[index]
      if (dataItem) {
        item.param.styleTypeParam.src = dataItem.imgUrl[0]
        item.param.path = dataItem.linkType as string
      }
    })
    moduleArr = moduleArr.filter(
      (item) => item.param.styleTypeParam.height !== undefined,
    )
  } else {
    /**一行一个、一行两个、一行三个、一行四个、一行五个布局 */
    moduleArr.map((item, index) => {
      const dataItem = data && data[index]
      item.param.styleTypeParam.height = itemHeight
      if (dataItem) {
        item.param.styleTypeParam.src = dataItem.imgUrl[0]
        item.param.path = dataItem.linkType as string
      }
    })
  }
  return moduleArr
}
