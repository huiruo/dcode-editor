import React, { Fragment, useCallback } from 'react'
import { FormItem } from '@/common/componentJson'
import { DynamicFormProvider } from './DynamicFormProvider'
import { AssemblyParam } from '@/types/pageAssemblyTypes'

interface Props {
  formSchema: FormItem[]
  values: AssemblyParam
}

export const ChildrenFormPure = (props: Props) => {
  const { formSchema, values } = props

  const renderItem = useCallback(
    (formItem: FormItem) => {
      return DynamicFormProvider.of(formItem || {})
    },
    [values],
  )

  return (
    <>
      {formSchema ? (
        <Fragment>
          {formSchema.map((formItem, i) => {
            // TODO: key
            return <div key={i}>{renderItem(formItem)}</div>
          })}
        </Fragment>
      ) : null}
    </>
  )
}
