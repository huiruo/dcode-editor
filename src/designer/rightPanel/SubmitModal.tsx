import React, { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { Button, Modal, message } from 'antd'
import { Form, Formik, FormikErrors } from 'formik'
import { FormSchema } from '@/types/formSchemaTypes'
import { FormItem } from '@/common/componentJson'
import { cloneDeep, throttle } from 'lodash'
import { DynamicFormProviderPure } from './DynamicFormProviderPure'
import { services } from '@/services/api'
import { SUCCESS } from '@/common/constants'
import { SubmitParamsType } from '@/services/types'
import { Assembly } from '@/types/pageAssemblyTypes'
import store from '@/store/store'
import { fetchPageInfo } from '@/store/reducer/thunkAction'

interface Props {
  submitModalVisible: boolean
  pageId: string
  shopId: string
  formValues: SubmitParamsType
  pageAssembly: Assembly[]
  onCallback: (visible: boolean) => void
}

const submitFormSchema: FormSchema[] = [
  {
    type: 'String',
    id: 'name',
    dataId: 'name',
    itemKey: '',
    schemaItemIndex: 0,
    controlItemParam: {
      id: 'name',
      label: '页面名称',
      placeholder: '请输入页面名称',
      defaultValue: '',
      rules: {
        max: 50,
        required: true,
      },
    },
  },
  {
    type: 'Upload',
    id: 'img',
    itemKey: '',
    dataId: 'img',
    schemaItemIndex: 1,
    controlItemParam: {
      id: 'img',
      label: '模版缩略图',
      type: 'img',
      extra: '建议尺寸32*32px',
      styleParam: {
        size: 'small',
      },
      rules: {
        required: false,
      },
      limit: 1,
    },
  },
  {
    type: 'textArea',
    id: 'descr',
    dataId: '',
    schemaItemIndex: 1,
    itemKey: '',
    controlItemParam: {
      id: 'descr',
      label: '页面描述',
      placeholder: '请输入页面描述',
      defaultValue: '',
      rules: {
        max: 50,
      },
    },
  },
]

export const SubmitModal = (props: Props) => {
  const {
    submitModalVisible,
    formValues,
    shopId,
    pageId,
    onCallback,
  } = props

  const onSavePage = async (values: SubmitParamsType) => {
    const res = await services.savePage(values)
    if (res.code === SUCCESS) {
      message.success({ content: '保存成功', duration: 1 })
      store.dispatch(fetchPageInfo({ pageId, shopId }))

      setTimeout(() => {
        onCallback(false)
      }, 800)
    } else {
      message.error(res.msg || '保存失败')
    }
  }

  const renderItem = useCallback(
    (
      formItem: FormItem,
      values: SubmitParamsType,
      errors: FormikErrors<SubmitParamsType>,
    ) => {
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
      } else {
        fieldId = formItem.id as string
      }

      return DynamicFormProviderPure.of(newFormItem, errors[fieldId] as string)
    },
    [],
  )

  const validationSchema = useMemo(() => {
    const schema = submitFormSchema.reduce((schemaObj, formItem) => {
      const { id, rules } = formItem.controlItemParam || {}
      if (id && rules) {
        let fieldSchema = Yup.string()
        const { label } = formItem.controlItemParam
        const requiredTip = `${label}不能为空`
        const longTip = `${label}长度不能大于${rules.max}个字符`

        if (rules.required) {
          fieldSchema = fieldSchema.required(requiredTip)
          if (rules.max) {
            fieldSchema = fieldSchema.max(rules.max, longTip)
          }
        } else if (rules.max) {
          fieldSchema = fieldSchema.max(rules.max, longTip)
        }

        schemaObj[id] = fieldSchema
      }
      return schemaObj
    }, {} as Record<string, Yup.StringSchema>)

    return Yup.object().shape(schema)
  }, [submitFormSchema])

  const handleSubmit = throttle(
    (type: 'page' | 'template', isValid: boolean, values: SubmitParamsType) => {
      if (isValid) {
        onSavePage(values)
      } else {
        message.warning('还有数据未录入完成,请添加完整再提交')
      }
    },
    5000,
    { trailing: false },
  )

  const renderSubmitButton = (values: SubmitParamsType, isValid: boolean) => {
    return (
      <div className="submit-btn">
        <Button
          type="primary"
          onClick={() => handleSubmit('page', isValid, values)}
          className="common-right-mg"
        >
          保存为页面
        </Button>
      </div>
    )
  }

  return (
    <Modal
      title="保存页面"
      open={submitModalVisible}
      onCancel={() => onCallback(false)}
      width="32%"
      destroyOnClose
      footer={null}
    >
      <div className="modal-container">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={onSavePage}
        >
          {({ values, errors, isValid }) => (
            <Form>
              <div className="modal-submit-box">
                {submitFormSchema.map((formItem, index) => {
                  return (
                    <div key={index}>
                      {renderItem(formItem, values, errors)}
                    </div>
                  )
                })}

                {renderSubmitButton(values, isValid)}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}
