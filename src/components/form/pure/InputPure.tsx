import React from 'react'
import { Input } from 'antd'
import { FormItem } from '@/common/componentJson'
import { Field, useField } from 'formik'

interface Props extends FormItem {
  validMsg: string
}

export const InputPure = (props: Props) => {
  const { controlItemParam, validMsg } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)
  const required = controlItemParam?.rules?.required

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.value)
  }

  // console.log('InputPure-render:', { props,validMsg,rules: controlItemParam?.rules, field, helpers })

  return (
    <div className="form-item">
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
          className={`normal-w1 ${validMsg ? 'status-error' : ''}`}
          placeholder={controlItemParam?.placeholder}
        />

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>
    </div>
  )
}
