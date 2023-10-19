import React, { useEffect, useMemo, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { Radio, RadioChangeEvent, message } from 'antd'
import { matchingRealField } from '@/common/utils'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import {
  generateTargetFormValues,
  isRenderChildField,
  isRenderField,
} from '@/common/generateFormSchema'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'
interface Props extends FormItem {
  validMsg: string
}

export const RadioView = (props: Props) => {
  const formik = useFormikContext<AssemblyParam>()
  const [childValidMsg, setChildValidMsg] = useState('')
  const { controlItemParam, validMsg } = props
  const name = controlItemParam?.id as string
  // HACK:万一没有dataOnlyCode?
  const dataOnlyCode = props?.dataAssemblyParam?.dataOnlyCode || name
  const [field, , form] = useField(name)

  const required = controlItemParam?.rules?.required

  const onChangeRadio = async (e: RadioChangeEvent) => {
    const val = e.target.value
    let realField = name
    if (props.dataAssemblyParam) {
      realField = matchingRealField(name)
    }

    if (props.dataAssemblyParam) {
      // 嵌套组件
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      if (index !== undefined && realField !== '') {
        const newData = generateTargetFormValues(
          formik?.values,
          formValuesName,
          index,
          realField,
          val,
        )
        formik.setFieldValue(formValuesName, newData)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      // 普通组件
      form.setValue(val)
    }
  }

  const realField = useMemo(() => {
    return matchingRealField(name)
  }, [name])

  useEffect(() => {
    // TODO: 暂时去掉
    // if (!props.mutex) {
    //   return
    // }
    if (controlItemParam?.rules?.required) {
      let needValid = false
      if (props.dataAssemblyParam) {
        needValid = isRenderChildField(
          props,
          formik.values,
          name,
          props?.controlItemParam?.index as number,
        )
      } else {
        needValid = isRenderField(props, formik.values, name)
      }

      if (needValid) {
        // HACK: 为了应对人群包的旧数据非空验证,这里判断value === undefined
        const { value, label } = controlItemParam || {}
        const isEmptyValue = value === undefined

        setChildValidMsg(isEmptyValue ? `${label}不能为空` : '')
        store.dispatch(
          designerActions.setFormikValidation({
            [dataOnlyCode + realField]: !isEmptyValue,
          }),
        )
      }
    }
  }, [formik.values])

  useEffect(() => {
    return () => {
      if (controlItemParam?.rules?.required) {
        store.dispatch(
          designerActions.removeOneValidation(dataOnlyCode + realField),
        )
      }
    }
  }, [])

  // console.log('RadioView-render:', props.controlItemParam.label, '--', { props, data: props.controlItemParam?.data,childValidMsg })

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>
      <div className="form-content">
        {controlItemParam?.type !== 'group' ? (
          <Radio.Group
            options={controlItemParam?.data}
            {...field}
            value={controlItemParam?.value}
            onChange={onChangeRadio}
          />
        ) : (
          <Radio.Group
            optionType="button"
            size="middle"
            options={controlItemParam?.data}
            {...field}
            value={controlItemParam?.value}
            onChange={onChangeRadio}
          />
        )}

        {(validMsg || childValidMsg) && (
          <div className="field-error">{validMsg || childValidMsg}</div>
        )}
      </div>
    </div>
  )
}
