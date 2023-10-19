import React, { useCallback, useMemo } from 'react'
import { Button, Modal } from 'antd'
import { ModalType, ModalTypes } from './types'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { DynamicFormProviderPure } from '@/designer/rightPanel/DynamicFormProviderPure'
import { Form, Formik } from 'formik'
import { cloneDeep } from 'lodash'
import { computeFormValues, isRenderField } from '@/common/generateFormSchema'

interface Props extends FormItem {
  visible: boolean
  productFieldForm: AssemblyParam
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends AssemblyParam>(selectRowData: T) => void
}

const modalType = ModalTypes.Product

export const ConfigSelectProductModal = (props: Props) => {
  const { visible, productFieldForm, onClose, onOkCallback } = props
  const { formItems: formSchema = [] } = props

  const defaultValues = useMemo(() => {
    return { ...computeFormValues(formSchema), ...productFieldForm }
  }, [productFieldForm])

  const onCancel = () => {
    onClose(modalType)
  }

  const onSubmit = (values: AssemblyParam) => {
    onClose(modalType)
    onOkCallback(values)
  }

  const renderItem = useCallback(
    (formItem: FormItem, values: AssemblyParam) => {
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
      } else {
        fieldId = formItem.id as string
      }

      if (!isRenderField(newFormItem, values, fieldId)) {
        return null
      }

      return DynamicFormProviderPure.of(newFormItem, '')
    },
    [],
  )

  // console.log('ConfigSelectProduct', {defaultValues,productFieldForm})

  return (
    <Modal
      title={props.label}
      open={visible}
      onCancel={onCancel}
      width="40%"
      destroyOnClose={true}
      footer={null}
    >
      <div className="modal-container direction-column">
        {formSchema.length ? (
          <Formik
            initialValues={{ ...defaultValues, onlyCode: 0 }}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
                {formSchema.map((formItem, index) => {
                  return <div key={index}>{renderItem(formItem, values)}</div>
                })}
                <div className="modal-submit-box">
                  <div className="submit-btn">
                    <Button key="back" onClick={onCancel}>
                      取消
                    </Button>
                    <Button
                      key="submit"
                      type="primary"
                      onClick={() => onSubmit(values)}
                      className="common-left-mg"
                    >
                      确认
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
      </div>
    </Modal>
  )
}
