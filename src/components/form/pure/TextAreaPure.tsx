import React, { ChangeEvent } from 'react'
import { Input } from 'antd'
import { FormItem } from '@/common/componentJson'
import { useField } from 'formik'

const { TextArea } = Input

export const TextAreaPure = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    helpers.setValue(event.target.value)
  }

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <TextArea
          {...field}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event)
          }
          style={{ width: '80%' }}
          value={controlItemParam?.value as string}
          rows={4}
          maxLength={controlItemParam?.rules?.max}
        />
      </div>
    </div>
  )
}
