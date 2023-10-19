import React, { Fragment, useCallback } from 'react'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { cloneDeep } from 'lodash'
import { DynamicFormProvider } from '@/designer/rightPanel/DynamicFormProvider'
import { useFormikContext } from 'formik'

interface Props extends FormItem {
  validMsg?: string
}

export const ColumnsView = (props: Props) => {
  const formik = useFormikContext<AssemblyParam>()
  const { formItems } = props
  // const name = props?.dataId as string
  // const [field, , helpers] = useField(name)
  const { values } = formik

  const renderItem = useCallback(
    (formItem: FormItem, values: AssemblyParam, dataId: string) => {
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
        newFormItem.dataId = dataId
      } else {
        fieldId = formItem.id as string
        newFormItem.dataId = dataId
      }

      return DynamicFormProvider.of(newFormItem)
    },
    [],
  )

  return (
    <div className="columns-item">
      <div className="column-title">{props?.label}</div>

      <div>
        {formItems?.map((formItem, index) => {
          return (
            // TODO: index
            <Fragment key={index}>
              {renderItem(formItem, values, props.dataId)}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
