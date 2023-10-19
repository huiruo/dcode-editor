import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Upload, message } from 'antd'
import { useFormikContext } from 'formik'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile, UploadListType } from 'antd/es/upload/interface'
import {
  CustomFile,
  CustomUploadFile,
  ListStyleEnum,
  UploadData,
  UploadViewProps,
} from './type'
import {
  calculate_object_name,
  getBase64,
  listStyleEnum,
  regexFileName,
} from './util'
import { matchingRealField, random } from '@/common/utils'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'
import { isEmpty } from 'lodash'
import { isRenderChildField, isRenderField } from '@/common/generateFormSchema'

interface Props extends UploadViewProps {
  validMsg?: string
}

export const UploadView = (props: Props) => {
  const formik = useFormikContext<AssemblyParam>()
  const { dataAssemblyParam, controlItemParam, policy, validMsg = '' } = props
  const limit = controlItemParam?.limit || 1
  const type = (controlItemParam?.type || 'img') as ListStyleEnum
  const name = controlItemParam?.id as string
  // HACK:万一没有dataOnlyCode?
  const dataOnlyCode = dataAssemblyParam?.dataOnlyCode || name
  const [loading] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState('')
  const [validMsgByChild, setValidMsgByChild] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [uploadFormList, setUploadFormList] = useState<UploadFile[]>([])
  const [fullUrl, setFullUrl] = useState<string>('')

  const required = controlItemParam?.rules?.required

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    const { status } = file
    setUploadFormList([...fileList])
    if (status === 'done') {
      console.log(
        `上传组件完成上传，当前文件uid为${file.uid}，files为`,
        fullUrl,
      )
      message.success('上传资源成功')
      if (props.dataAssemblyParam) {
        // TODO: 嵌套组件只处理了数组的情况，暂时没处理value为字符串
        const formValuesName = controlItemParam?.field || 'data'
        const index = controlItemParam?.index
        // const realField = matchingRealField(name)
        if (index !== undefined && realField !== '') {
          const targetValues =
            (formik.values[formValuesName] as DataAssemblyParam[]) || []
          const newData = targetValues.map((element, i) => {
            if (index === i) {
              return {
                ...element,
                [realField]: [...element[realField], fullUrl],
              }
            } else {
              return element
            }
          })

          formik.setFieldValue(formValuesName, newData)
        } else {
          message.warning('修改组件失败')
        }
      } else {
        const formValuesName = controlItemParam.id
        const target = formik?.values[formValuesName]
        if (controlItemParam.submitType === 'array' || Array.isArray(target)) {
          formik.setFieldValue(formValuesName, [...(target || []), fullUrl])
        } else {
          formik.setFieldValue(formValuesName, fullUrl)
        }
      }
    } else {
      if (status === 'error') {
        console.error('error:', { fileList, file })
        /*
        this.fileNumber -= 1;
        */
        message.warning('上传资源失败')
      } else if (status === 'removed') {
        // console.warn('removed:', { file })
        // this.fileNumber -= 1;
      }
    }
  }

  const renderUploadFile = (imgUrl: string[]): UploadFile[] => {
    return imgUrl.map((url) => {
      return {
        uid: random(),
        name: regexFileName(url),
        status: 'done',
        url,
      }
    })
  }

  const processFiles = () => {
    let files = []
    if (dataAssemblyParam?.imgUrl) {
      files = renderUploadFile(dataAssemblyParam.imgUrl)
    } else {
      const value = controlItemParam?.value || []
      const images = Array.isArray(value) ? value : [value as string]
      files = renderUploadFile(images)
    }
    return files
  }

  const onRemove = (file: CustomUploadFile) => {
    const realFileName = file.key || file.name
    const targetUrl = `${policy.host}/${policy.dir}${realFileName}`
    if (props.dataAssemblyParam) {
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      // const realField = matchingRealField(name)
      if (index !== undefined && realField !== '') {
        // TODO: 嵌套组件只处理了数组的情况，暂时没处理value为字符串
        const updatedTarget =
          formik?.values[formValuesName] &&
          (formik?.values[formValuesName] as DataAssemblyParam[]).map(
            (element, i) => {
              if (index === i) {
                const target = (element[realField] as string[]).filter(
                  (url) => url !== targetUrl,
                )
                return {
                  ...element,
                  [realField]: [...target],
                }
              } else {
                return element
              }
            },
          )

        formik.setFieldValue(formValuesName, updatedTarget)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      const formValuesName = controlItemParam.id
      const target = formik?.values[formValuesName]
      if (Array.isArray(target)) {
        const targetItemIndex = target.findIndex((url) => url === targetUrl)
        if (targetItemIndex !== -1) {
          const updatedTarget = [
            ...target.slice(0, targetItemIndex),
            ...target.slice(targetItemIndex + 1),
          ]
          formik.setFieldValue(formValuesName, updatedTarget)
        }
      } else {
        formik.setFieldValue(formValuesName, '')
      }
    }
  }

  const uploadFormData = (file: UploadFile) => {
    const uid = file.uid
    const result = uploadFormList.find(
      (f) => f.uid === uid,
    ) as unknown as UploadData
    if (result) {
      return result?.form || {}
    }

    return {}
  }

  const formParams = (file: UploadFile) => {
    const key = policy.dir
    const isFileNameConfusion = false
    // 上传的路径
    let keyName
    const onlyRandom = calculate_object_name(file.name)
    //是否用文件原名上传，注意：用原名上传可能会带来文件被覆盖的隐患
    if (isFileNameConfusion) {
      // keyName = key + '/' + this.folder + file.name
    } else {
      keyName = key + onlyRandom
    }

    return {
      name: file.name,
      policy: policy.policy,
      signature: policy.signature,
      success_action_status: '200',
      OSSAccessKeyId: policy.accessid,
      key: keyName,
      onlyRandom,
    }
  }

  const beforeUpload = (file: CustomFile) => {
    const params = formParams(file)
    setFullUrl(`${policy.host}/${params.key}`)
    // TODO: uploadRules
    if (false) {
      return
    }
    const uploadForm = {
      form: params,
      uid: file.uid,
      name: params.key,
    } as unknown as UploadFile
    setUploadFormList([...uploadFormList, uploadForm])
    // setUploadFormList((prevList) => [...prevList, uploadForm])
    file.key = params.onlyRandom
    return file
  }

  const realField = useMemo(() => {
    return matchingRealField(name)
  }, [name])

  useEffect(() => {
    const files = processFiles()
    setUploadFormList([...uploadFormList, ...files])
    return () => {
      if (controlItemParam?.rules?.required) {
        store.dispatch(
          designerActions.removeOneValidation(dataOnlyCode + realField),
        )
      }
    }
  }, [])

  useEffect(() => {
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
        const { value, label } = controlItemParam || {}
        const isEmptyValue = isEmpty(value)
        setValidMsgByChild(isEmptyValue ? `${label}不能为空` : '')
        store.dispatch(
          designerActions.setFormikValidation({
            [dataOnlyCode + realField]: !isEmptyValue,
          }),
        )
      }
    }
  }, [formik.values])

  // console.log('UploadView render==>', { props,uploadFormList, policy, limit,values:formik?.values })

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>
      <div className="form-content">
        <Upload
          action={policy.host}
          listType={listStyleEnum[type] as UploadListType}
          fileList={uploadFormList}
          multiple={false}
          onRemove={onRemove}
          data={(file) => uploadFormData(file)}
          onPreview={handlePreview}
          beforeUpload={(file) => beforeUpload(file)}
          onChange={handleChange}
        >
          {uploadFormList.length < limit && (
            <div className="plus-outlined">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </div>
          )}
        </Upload>

        <div>{controlItemParam?.extra}</div>

        {validMsgByChild && (
          <div className="field-error">{validMsgByChild}</div>
        )}
        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>

      <Modal
        open={previewOpen}
        title="预览"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}
