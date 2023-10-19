import React, {
  ForwardedRef,
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import * as Yup from 'yup'
import store from '@/store/store'
import {
  currentSelectViewState,
  formJsonState,
  designerActions,
} from '@/store/designerSlice'
import {
  Formik,
  Form,
  useFormikContext,
  FormikErrors,
  FormikProps,
} from 'formik'
import { DynamicFormProvider } from './DynamicFormProvider'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { cloneDeep } from 'lodash'
import { isRenderField } from '@/common/generateFormSchema'
import { useAppSelector } from '@/store/hook'
import { RefProps } from '@/pages'
import '@/styles/rightPanel.less'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RightPanelProps {}

export function RightPanel(_: RightPanelProps, ref: ForwardedRef<RefProps>) {
  const currentSelectView = useAppSelector(currentSelectViewState)
  const { formSchema, defaultValues } = useAppSelector(formJsonState)
  const onlyCode = currentSelectView.assemblyInfo.onlyCode
  const formikRef = useRef<FormikProps<AssemblyParam>>(null)

  const AutoSubmit = () => {
    const formikContext = useFormikContext<AssemblyParam>()
    const { values, isValid, errors } = formikContext
    useEffect(() => {
      if (defaultValues.onlyCode === values.onlyCode) {
        console.log('AutoSubmit form val 选中B-1-改变属性:', {
          values,
          isValid,
          errors,
        })
        store.dispatch(
          designerActions.designComponent({
            values,
            onlyCode: values.onlyCode,
            isValid,
          }),
        )
      } else {
        console.log('AutoSubmit form val 选中B-2-不改变-', defaultValues)
        store.dispatch(
          designerActions.designComponent({
            values: defaultValues,
            onlyCode: defaultValues.onlyCode,
            isValid,
          }),
        )
      }
    }, [values, isValid])

    return null
  }

  const onSubmit = () => {
    // onSubmit(false);
  }

  const renderItem = useCallback(
    (
      formItem: FormItem,
      values: AssemblyParam,
      errors: FormikErrors<AssemblyParam>,
    ) => {
      // TODO:clone
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      /** 1.普通组件-2.特殊组件 */
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
      } else {
        fieldId = formItem.id as string
      }

      if (!isRenderField(newFormItem, values, fieldId)) {
        return null
      }

      // console.log('rightPanel-error:', formItem?.controlItemParam?.label, {
      //   errors,
      //   error: errors[fieldId],
      //   formItem
      // })

      return DynamicFormProvider.of(newFormItem, errors[fieldId] as string)
    },
    [formSchema],
  )

  const validationSchema = useMemo(() => {
    const schema = formSchema.reduce(
      (schemaObj: Record<string, Yup.StringSchema>, formItem) => {
        const { id, rules } = formItem.controlItemParam || {}

        /** 验证动态组件:needValid;当动态组件没渲染出来是不用触发验证的*/
        let needValid = true
        if (formItem?.mutex?.ids && formItem?.mutex?.ids?.length > 0) {
          needValid = isRenderField(formItem, defaultValues, id)
        }

        if (id && rules && needValid) {
          const { label, submitType = 'string' } = formItem.controlItemParam
          const requiredTip = `${label}不能为空`
          const longTip = `${label}长度不能大于${rules.max}个字符`
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let fieldSchema: Yup.StringSchema | Yup.ArraySchema<any, any> =
            Yup.string()

          if (rules.max) {
            fieldSchema = Yup.string().max(rules.max, longTip)
          } else if (rules.required && submitType === 'string') {
            fieldSchema = Yup.string().required(requiredTip)
          } else if (rules.required && submitType === 'array') {
            fieldSchema = Yup.array().min(1, requiredTip)
          }

          (
            schemaObj as
              | Record<string, Yup.ArraySchema<string[], string>>
              | Record<string, Yup.StringSchema>
          )[id] = fieldSchema
        }

        return schemaObj
      },
      {} as Record<string, Yup.StringSchema>,
    )

    return Yup.object().shape(schema)
  }, [formSchema])

  function setFieldValue<T>(field: string, value: T) {
    formikRef.current?.setFieldValue(field, value)
  }

  useImperativeHandle(ref, () => ({
    setFieldValue,
  }))

  useEffect(() => {
    if (formikRef.current) {
      const { isValid } = formikRef.current
      store.dispatch(designerActions.setFormikIsValid(isValid))
    }
  }, [formSchema])

  console.log('rightPanel-main', {
    formSchema,
    // defaultValues,
    // validationSchema,
  })

  return (
    <div className="right-panel">
      <div className="panel-head">{currentSelectView.assemblyInfo.title}</div>
      <div className="panel-main">
        {formSchema.length ? (
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
            key={onlyCode}
            innerRef={formikRef}
          >
            {({ values, errors }) => {
              // console.log('main-form-values:',values)
              return (
                <Form>
                  {formSchema.map((item) => {
                    // console.log('rightPanel-render', errors, isValid)
                    return (
                      <Fragment key={item.itemKey}>
                        {renderItem(item, values, errors)}
                      </Fragment>
                    )
                  })}
                  <AutoSubmit />
                </Form>
              )
            }}
          </Formik>
        ) : null}
      </div>
    </div>
  )
}

export default forwardRef(RightPanel)
