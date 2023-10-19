import React, { useCallback, useMemo } from 'react'
import { Button } from 'antd'
import { Formik, Form } from 'formik'
import { FormItem } from '@/common/componentJson'
import { cloneDeep } from 'lodash'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { DynamicFormProviderPure } from '@/designer/rightPanel/DynamicFormProviderPure'
import {
  computeFormValues,
  removeEmptyStringProperties,
} from '@/common/generateFormSchema'

interface Props {
  shopId: string
  panelParam: FormItem[]
  filterCallback: (values: AssemblyParam) => void
}

export const FilterOperation = (props: Props) => {
  const { panelParam, filterCallback } = props

  const onSubmit = (values: AssemblyParam) => {
    filterCallback(removeEmptyStringProperties(values))
  }

  const defaultValues = useMemo(() => {
    return computeFormValues(panelParam) as AssemblyParam
  }, [])

  const renderItem = useCallback(
    (formItem: FormItem, values: AssemblyParam) => {
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
      } else {
        fieldId = formItem.id as string
      }

      return DynamicFormProviderPure.of(newFormItem, '')
    },
    [],
  )

  const onResetForm = (resetForm: () => void) => {
    resetForm()
    filterCallback({} as AssemblyParam)
  }

  return (
    <Formik initialValues={{ ...defaultValues }} onSubmit={onSubmit}>
      {({ values, resetForm }) => (
        <Form>
          {panelParam.length > 0 && (
            <div className="modal-submit-box">
              <div className="submit-btn">
                <Button onClick={() => onResetForm(resetForm)}>重置</Button>
                <Button
                  className="common-left-mg"
                  type="primary"
                  onClick={() => onSubmit(values)}
                >
                  查询
                </Button>
              </div>
            </div>
          )}

          {panelParam.map((item, index) => {
            return <div key={index}>{renderItem(item, values)}</div>
          })}
        </Form>
      )}
    </Formik>
  )
}
