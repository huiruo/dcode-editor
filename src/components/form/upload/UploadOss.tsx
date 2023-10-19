import { FormItem } from '@/common/componentJson'
import React, { useEffect, useState } from 'react'
import { UploadView } from './UploadView'
import { Policy } from '@/services/types'

interface Props {
  validMsg?: string
  formItem: FormItem
}

/*
const uploadConfig = {
  showType: 'imgs',
  type: 'img',
  limit: 20,
  isMultiple: true
}
*/

export const UploadOss = (props: Props) => {
  const { formItem, validMsg = '' } = props
  const [policy, setPolicy] = useState<Policy>({
    accessid: '',
    policy: '',
    signature: '',
    dir: '',
    host: '',
    expire: '',
    cdnHost: '',
    extProperty: '',
  })

  useEffect(() => {
    // getPolicy()
  }, [])

  return <UploadView {...formItem} policy={policy} validMsg={validMsg} />
}
