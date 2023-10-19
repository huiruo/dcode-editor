import React, { useState } from 'react'
import { Button, Divider, message } from 'antd'
import { SubmitModal } from '@/designer/rightPanel/SubmitModal'
import {
  formikValidationState,
  formikIsValidState,
  pageAssemblyState,
  pageInfoState,
} from '@/store/designerSlice'
import { UserView } from './User'
import { useAppSelector } from '@/store/hook'
import { checkObjectValuesIsTrue } from '@/common/generateFormSchema'
import { Map } from 'immutable'

export function HeaderNav() {
  const {
    status,
    name,
    descr,
    id,
    img,
    pageEngineId,
    updatePerson,
    pageId,
    shopId,
  } = useAppSelector(pageInfoState)
  const pageAssembly = useAppSelector(pageAssemblyState)
  const formikIsValid = useAppSelector(formikIsValidState)
  const formikValidation = useAppSelector(formikValidationState)
  const [submitModalVisible, setSubmitModalVisible] = useState<boolean>(false)

  const onPreview = () => {
    // TODO: log
    console.log('onPreview')
  }

  const onCallback = (visible: boolean) => {
    setSubmitModalVisible(visible)
  }

  const onSave = () => {
    console.log(
      'onSave:',
      { formikIsValid, formikValidation },
      '-',
      checkObjectValuesIsTrue(formikValidation),
    )
    if (formikIsValid && checkObjectValuesIsTrue(formikValidation)) {
      setSubmitModalVisible(true)
    } else {
      message.warning('还有数据未录入完成,请添加完整再提交')
    }
  }

  // TODO: 去掉旧数据多余的数据结构，上线后去掉
  const generatePageText = () => {
    const pageAssemblyRemoveDefaultTemp = pageAssembly.map((item) => {
      let itemImmutable = Map(item.assemblyParam)
      if (itemImmutable.has('childrenDefaultVal')) {
        itemImmutable = itemImmutable.delete('childrenDefaultVal')
      }

      return { ...item, assemblyParam: itemImmutable.toJS() }
    })

    return JSON.stringify(pageAssemblyRemoveDefaultTemp)
  }

  return (
    <div className="header-nav">
      <div />
      <div className="user-container xy-center">
        <Button type="default" onClick={onPreview} className="submit-btn">
          预览
        </Button>
        <Button type="primary" onClick={onSave} className="save-btn submit-btn">
          保存
        </Button>
        <Divider type="vertical" />
        <UserView updatePerson={updatePerson} />
      </div>

      {submitModalVisible && (
        <SubmitModal
          submitModalVisible={submitModalVisible}
          onCallback={onCallback}
          formValues={{
            status,
            name,
            descr,
            id,
            img,
            pageEngineId,
            // pageText: JSON.stringify(pageAssembly),
            pageText: generatePageText(),
          }}
          pageAssembly={pageAssembly}
          pageId={pageId}
          shopId={shopId}
        />
      )}
    </div>
  )
}
