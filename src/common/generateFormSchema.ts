import { FormValues, FormJson, FormSchema } from '@/types/formSchemaTypes'
import { FormItem, Resource } from './componentJson'
import {
  Assembly,
  AssemblyParam,
  ChildrenDefaultVal,
  DataAssemblyParam,
} from '@/types/pageAssemblyTypes'
import { random } from './utils'

/**
 * 生成FormSchema
 */
export function generateFormSchema(
  resources: Resource[],
  assemblyParam: AssemblyParam,
  onlyCode: string | number,
): FormJson {
  if (!resources.length)
    return {
      formSchema: [],
      defaultValues: { onlyCode, data: [] },
    }

  const formSchema: FormSchema[] = handleChildren(resources[0])

  // 从下标1开始
  for (let index = 1; index < resources.length; index++) {
    const element = resources[index]
    handleChildren(element, true)
    element.type = element.templateId
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { children, ...rest } = element
    formSchema.push(rest as unknown as FormSchema)
  }

  const defaultValues = computeFormValues(formSchema)
  // HACK: childrenDefaultVal 用于ProliferationView.tsx 模版生成，不能扁平化,为了不影响总体组件，这里只是粗略找一个变量避免扁平化
  const finalDefaultValues = defaultValues?.tabSelectedVal
    ? flattenObject(defaultValues)
    : defaultValues

  // console.log('generateFormSchema-main:', {
  //   formSchema,
  //   defaultValues,
  //   defaultValuesFinal: { ...defaultValues, ...assemblyParam, onlyCode },
  //   defaultValuesFinal2: { ...flattenObject(defaultValues),...assemblyParam, onlyCode }
  // })

  return {
    formSchema,
    defaultValues: {
      ...finalDefaultValues,
      ...assemblyParam,
      onlyCode,
    },
  }
}

function flattenObject(childDefaults: FormValues) {
  const result: FormValues = {}

  for (const key in childDefaults) {
    if (childDefaults.hasOwnProperty(key)) {
      if (
        typeof childDefaults[key] === 'object' &&
        !Array.isArray(childDefaults[key])
      ) {
        Object.assign(result, flattenObject(childDefaults[key] as FormValues))
      } else {
        result[key] = childDefaults[key]
      }
    }
  }

  return result
}

function handleChildren(resource: Resource, isChildren = false): FormSchema[] {
  const { formItems, children = [] } = resource
  children.forEach((item) => {
    item.isChildren = true
  })

  // item.isChildren = true 为了默认值不计算,因为嵌套组件的赋值方式不同,如果后面改动，下面逻辑后面可能去掉
  if (isChildren) {
    formItems.forEach((item) => {
      item.isChildren = true
    })
  }

  formItems.push(...children)
  return formItems
}

/**
 * 计算form 的默认值&&设置dataId
 * */
export function computeFormValues(formSchema: FormSchema[]): FormValues {
  const childrenDefaultVal: ChildrenDefaultVal = {}

  return formSchema.reduce((acc: FormValues, curr) => {
    console.log('formSchema:', { acc, curr })
    if (
      curr.controlItemParam &&
      curr.controlItemParam.defaultValue !== undefined
    ) {
      acc[curr.controlItemParam.id] = curr.controlItemParam.defaultValue
    }

    curr.itemKey = random()

    if (curr.formItems) {
      curr.id = curr.templateId
      curr.formItems.forEach((item) => {
        /**
         * 1.templateId 用于请求后知道把数据装进到哪个容器
         * 2.dataId 用于嵌套组件取后端存的values值,后端的值不一定是对应templateId，
         * 例如:DcodeBanner.json --> "templateId": "dataList" --> data
         * 但是：DcodeAdvertising.json --> "templateId": "tabList" --> tabList
         * 没有这个值的话默认：取"data"
         */
        item.itemKey = random()
        item.templateId = item.templateId || curr.templateId
        item.dataId = curr.dataId
        if (
          item.controlItemParam &&
          item.controlItemParam.defaultValue !== undefined &&
          !item.isChildren
        ) {
          /**
           * 正常组件的默认值赋值
           * !item.isChildren 嵌套组件的赋值方式不一样，嵌套组件这里计算默认值无意义
           * */
          acc[item.controlItemParam.id] = item.controlItemParam.defaultValue
        } else if (item.isChildren) {
          /** 嵌套组件有默认值 */
          if (
            item?.controlItemParam?.id &&
            item.controlItemParam?.defaultValue !== undefined
          ) {
            childrenDefaultVal[
              item.controlItemParam.id as keyof ChildrenDefaultVal
            ] = item.controlItemParam.defaultValue
          }
        } else if (item.formItems) {
          /** 用在三层嵌套DcodeGrid.json,但是这里没赋值dataId,因为是模版数据,可能绑定多个data,dataId的逻辑在ChildrenForm */
          item.formItems.forEach((nestedItem) => {
            if (
              nestedItem.controlItemParam &&
              nestedItem.controlItemParam.defaultValue !== undefined
            ) {
              childrenDefaultVal[
                nestedItem.controlItemParam.id as keyof ChildrenDefaultVal
              ] = nestedItem.controlItemParam.defaultValue
            } else if (nestedItem.formItems) {
              /** DcodeMember.json: 的4层嵌套 */
              nestedItem.formItems.forEach((forthItem) => {
                if (
                  forthItem.controlItemParam &&
                  forthItem.controlItemParam.defaultValue !== undefined
                ) {
                  childrenDefaultVal[
                    forthItem.controlItemParam.id as keyof ChildrenDefaultVal
                  ] = forthItem.controlItemParam.defaultValue
                }
              })
            }
          })
        }
      })

      acc.childrenDefaultVal = childrenDefaultVal

      return acc
    }

    return acc
  }, {})
}

export const isRenderField = (
  newFormItem: FormItem,
  values: AssemblyParam,
  fieldId: string,
): boolean => {
  const { mutex } = newFormItem
  if (!mutex) {
    return true
  }

  const rules = mutex?.rules !== undefined ? false : true
  const mapValue = newFormItem.mapValue
  const calculationResults: boolean[] = []
  const mutexIds = mutex.ids

  for (let i = 0; i < mutexIds.length; i++) {
    const mapId = mutexIds[i]
    const target = values[mapId]
    const value = mapValue[mapId]
    // HACK: DcodeMember.json 的normalGrowth mapVal是个数组，这里新增的一种判断方式
    // 如果value是多种匹配规则(数组),也是根据rules 是否要取反操作(取反只是为了简化规则)
    if (Array.isArray(value)) {
      const isIncludes = value.includes(target)
      calculationResults.push(rules ? isIncludes : !isIncludes)
    } else {
      if (target === fieldId || target === value) {
        calculationResults.push(rules)
      } else {
        calculationResults.push(!rules)
      }
    }
  }

  // 包含false 就展示(取反)
  return !calculationResults.includes(false)
}

export const isRenderChildField = (
  newFormItem: FormItem,
  values: AssemblyParam,
  fieldId: string,
  index: number,
): boolean => {
  const { mutex } = newFormItem
  if (!mutex) {
    return true
  }

  const rules = mutex?.rules !== undefined ? false : true
  const mapValue = newFormItem.mapValue
  const calculationResults: boolean[] = []
  const dataId = (newFormItem.dataId as string) || 'data'
  // 两种方案，1.直接取 dataAssemblyParam;2.取values,需要对应index
  const mutexIds = mutex.ids
  const dataAssemblyParam = values[dataId][index]

  for (let i = 0; i < mutexIds.length; i++) {
    const mapId = mutexIds[i]
    const target = dataAssemblyParam[mapId]
    const value = mapValue[mapId]

    if (target === fieldId || target === value) {
      calculationResults.push(rules)
    } else {
      calculationResults.push(!rules)
    }
  }

  return !calculationResults.includes(false)
}

export function checkObjectValuesIsTrue(
  obj: Record<string, string | boolean>,
): boolean {
  return Object.values(obj).every((value) => value === true)
}

export const findTargetAssemblyParam = (
  pageAssembly: Assembly[],
  onlyCode: string | number,
): { assemblyParam: AssemblyParam; index: number } => {
  const index = pageAssembly.findIndex((item) => {
    return item.assemblyInfo.onlyCode === onlyCode
  })

  return { assemblyParam: pageAssembly[index].assemblyParam, index }
}

/**
 * 生成嵌套组件的form对象值
 */
export const generateTargetFormValues = (
  values: AssemblyParam,
  formValuesName: string,
  index: number,
  realField: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | any[],
): DataAssemblyParam[] => {
  const targetValues = (values[formValuesName] as DataAssemblyParam[]) || []
  const newData = targetValues.map((element, i) => {
    if (index === i) {
      return {
        ...element,
        [realField]: value,
      }
    } else {
      return element
    }
  })

  return newData
}

export const removeEmptyStringProperties = (
  values: AssemblyParam,
): AssemblyParam => {
  Object.keys(values).forEach((key) => {
    if (values[key] === '') {
      delete values[key]
    }
  })

  return values
}
