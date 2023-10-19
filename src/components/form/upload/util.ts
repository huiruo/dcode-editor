import { RcFile } from 'antd/es/upload'
import { ListStyleEnum } from './type'

/**
 * 文件类型控制
 */
export const generateAccept = function (type: null | string) {
  if (type == null || type === 'img') {
    return 'image/*'
  } else if (type === 'file') {
    return '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt'
  } else if (type === 'video') {
    return 'video/*'
  } else {
    return type
  }
}

export const listStyleEnum: Record<ListStyleEnum, string> = {
  text: 'text',
  thumb: 'picture',
  img: 'picture-card',
  video: 'picture-card',
}

export function calculate_object_name(filename: string): string {
  if (!filename) {
    return ''
  }

  const suffix = fileSuffix(filename)
  // let g_object_name = g_dirname + onlyRandom(15) + suffix
  // if (!!group) {
  //   if (g_dirname.indexOf('/') == -1) {
  //     g_dirname += '/'
  //   }
  //   g_object_name = decodeURIComponent(
  //     g_dirname + group + '/' + onlyRandom(14) + suffix
  //   )
  // }
  return onlyRandom(15) + suffix
}

/**
 * 生成唯一随机数
 */
export const onlyRandom = (randomLength = 32): string => {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now(),
  ).toString(36)
}

/**
 * 文件后缀获得，包含“**.**”
 *
 * @param {string} filename
 * @returns
 */
function fileSuffix(filename: string) {
  const splitFile = filename.split('.')
  const len = splitFile.length
  return '.' + splitFile[len - 1]
}

export const regexFileName = (url: string): string => {
  const match = url.match(/\/([^/]+)$/)
  if (match) {
    const filename = match[1]
    return filename
  }

  return 'no_match_name'
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
