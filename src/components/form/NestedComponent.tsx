import React from 'react'
import { FormItem } from '@/common/componentJson'
import { useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { ChildrenFormPure } from '@/designer/rightPanel/ChildrenFormPure'

/**
 * 应对DcodeSearchBar.json 这样的一体组件
 */
export const NestedComponent = (props: FormItem) => {
  const { formItems: formSchema } = props
  const formik = useFormikContext<AssemblyParam>()
  const { values } = formik

  // console.log('src/components/form/NestedComponent.tsx',{props,formSchema})

  return (
    <div className="form-item direction-column">
      <ChildrenFormPure values={values} formSchema={formSchema as FormItem[]} />
    </div>
  )
}
