import React from 'react'
import { Input, message } from 'antd'
import { Field, useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { matchingRealField } from '@/common/utils'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { generateTargetFormValues } from '@/common/generateFormSchema'

interface Props extends FormItem {
  validMsg: string
}

export const InputView = (props: Props) => {
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam, validMsg } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)

  const required = controlItemParam?.rules?.required

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (props.dataAssemblyParam) {
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      const realField = matchingRealField(name)
      if (index !== undefined && realField !== '') {
        const newData = generateTargetFormValues(
          formik?.values,
          formValuesName,
          index,
          realField,
          value,
        )

        formik.setFieldValue(formValuesName, newData)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      helpers.setValue(value)
    }
  }

  return (
    <div className="form-item common-top1-mg">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>

      <div className="form-content">
        <Field
          as={Input}
          {...field}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={controlItemParam?.value as string}
          maxLength={controlItemParam?.rules?.max}
          placeholder={controlItemParam?.placeholder}
          className={`normal-w1 ${validMsg ? 'status-error' : ''}`}
        />

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>
    </div>
  )
}
