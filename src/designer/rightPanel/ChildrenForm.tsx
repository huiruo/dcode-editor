import React, { Fragment, useCallback } from 'react'
import { FormItem } from '@/common/componentJson'
import { Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { DynamicFormProvider } from './DynamicFormProvider'
import { cloneDeep } from 'lodash'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'
import { isRenderChildField } from '@/common/generateFormSchema'

interface Props {
  index: number
  assemblyDataKey: string
  childrenFormItem: FormItem
  dataAssemblyParam: DataAssemblyParam
  values: AssemblyParam
  formActionCallback: (index: number) => void
}

export const ChildrenForm = (props: Props) => {
  const {
    index,
    childrenFormItem,
    dataAssemblyParam,
    assemblyDataKey,
    values,
    formActionCallback,
  } = props
  const { formItems: formSchema } = childrenFormItem

  const deleteChildrenFormCard = (index: number) => {
    // don need
    // store.dispatch(designerActions.deleteChildrenFormCard({ values, index, }))
    formActionCallback(index)
  }

  const renderItem = useCallback(
    (
      formItem: FormItem,
      dataAssemblyParam: DataAssemblyParam,
      assemblyDataKey: string,
      index: number,
    ) => {
      // TODO: clone
      const newFormItem = cloneDeep(formItem) || ({} as FormItem)
      let fieldId = formItem.controlItemParam?.id as string
      /** 1.普通组件-2.特殊组件 */
      if (fieldId) {
        newFormItem.controlItemParam.id = `${fieldId}-key-${index}`
        newFormItem.controlItemParam.value = dataAssemblyParam[fieldId]
        // index,field修改data用,例如：src/components/form/SelectView.tsx
        newFormItem.controlItemParam['index'] = index
        newFormItem.controlItemParam['field'] = assemblyDataKey
      } else {
        fieldId = newFormItem.id as string
        newFormItem.controlItemParam = {
          index,
          label: newFormItem.label as string,
          id: fieldId,
        }
      }

      // 有些是模版，并没有在generateFormSchema 生成dataId,取assemblyDataKey
      if (!newFormItem.dataId) {
        newFormItem.dataId = assemblyDataKey
      }

      newFormItem.dataAssemblyParam = dataAssemblyParam
      if (!isRenderChildField(newFormItem, values, fieldId, index)) {
        return null
      }

      return DynamicFormProvider.of(newFormItem)
    },
    [values],
  )

  // console.log('DynamicFormItemType.DataList-0-render:',{ dataAssemblyParam })

  return (
    <Card
      title={`${childrenFormItem.label}-${index + 1}`}
      extra={<CloseOutlined onClick={() => deleteChildrenFormCard(index)} />}
      bodyStyle={{ position: 'relative' }}
    >
      {formSchema ? (
        <Fragment>
          {formSchema.map((formItem) => {
            return (
              <Fragment key={formItem.itemKey}>
                {renderItem(
                  formItem,
                  dataAssemblyParam,
                  assemblyDataKey,
                  index,
                )}
              </Fragment>
            )
          })}
        </Fragment>
      ) : null}
    </Card>
  )
}
