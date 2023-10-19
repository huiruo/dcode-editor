import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'
import { UserFormValues } from '@/pages/login'
import {
  Api,
  ApiConfig,
  GetPageOptions,
  Result,
  ResultNew,
  SubmitParamsType,
} from './types'
import { PageInfo } from '@/types/pageAssemblyTypes'

type Urls = {
  uat: string
  test: string
  prod: string
}

export const ossImgUrl = ''

export const ossImgEditorUrl = ''

const urls: Urls = {
  uat: '/api',
  test: 'http://test.com',
  prod: 'http://prod.com',
}

const instance = axios.create({
  baseURL: urls[process.env.UMI_ENV as keyof Urls],
})

const apiConfig: ApiConfig = {
  register: '/user/register',
  login: '/user/login',
  savePage: '/user/savePage',
  getPage: '/user/queryPage',
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = Cookies.get('Access-Token')
    if (token) {
      config.headers['Access-Token'] = `${token}`
    }

    return config
  },
  (error: AxiosError) => {
    console.error('interceptors.request error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {

    return Promise.reject(error)
  },
)

const fetchWithAuth = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
  method = 'POST',
): Promise<T> => {
  try {
    let config: AxiosRequestConfig
    if (method === 'GET') {
      config = {
        method,
        ...options,
        headers: { },
      }
    } else {
      config = {
        method,
        data: options.params,
        headers: { },
      }
    }

    const response = await instance(url, config)

    return response as T
  } catch (error) {
    throw error
  }
}

export const services: Api = {
  registerApi: async (options: UserFormValues): Promise<ResultNew<null>> => {
    const url = `${apiConfig.register}`
    return await fetchWithAuth(url, { params: options }, 'POST')
  },
  loginApi: async (options: UserFormValues): Promise<ResultNew<null>> => {
    const url = `${apiConfig.login}`
    return await fetchWithAuth(url, { params: options }, 'POST')
  },
  savePage: async (options: SubmitParamsType): Promise<ResultNew<null>> => {
    const url = `${apiConfig.savePage}`
    return await fetchWithAuth(url, { params: options }, 'POST')
  },
  getPage: async (
    options: GetPageOptions = {
      pageId: '',
    },
  ): Promise<ResultNew<PageInfo>> => {
    const url = `${apiConfig.getPage}?pageId=${options.pageId}`
    // return await fetchWithAuth(url, { params: {} }, 'GET')
    return {
      'code': 1,
      'msg': 'ok',
      'data': {
          'id': 1,
          'name': 'decode测试门店12',
          'descr': 'dcode demo',
          'img': '',
          'pageText': '[{"assemblyInfo":{"id":"DcodePages","title":"页面设置","iconType":"","onlyCode":"1697542490967625397"},"assemblyParam":{"onlyCode":"1697542490967625397"}},{"assemblyInfo":{"id":"DcodeSearchBar","iconType":"icon-Bannerzujian","title":"Search Bar","onlyCode":"1697688567339680934"},"assemblyParam":{"onlyCode":"1697688567339680934","Radios":"1","bgColor":"#ffffff","boxColor":"#f2f2f2","textColor":"#bebebe","isTop":false,"category":""}},{"assemblyInfo":{"id":"DcodeBanner","iconType":"icon-Bannerzujian","title":"banner组件","onlyCode":"1697533229729359879"},"assemblyParam":{"onlyCode":"1697533229729359879","height":"260","autoplay":true}},{"assemblyInfo":{"id":"DcodeAdvertising","iconType":"icon-guanggaotu","title":"广告图","onlyCode":"1697533231246488636"},"assemblyParam":{"onlyCode":"1697533231246488636","height":375,"padding":20,"isRound":true,"mode":"lineTwo"}},{"assemblyInfo":{"id":"DcodeOrderActive","iconType":"icon-Bannerzujian","title":"Order Activity","onlyCode":"1697688571364502261"},"assemblyParam":{"extraLinkType":"miniPage","buttonType":0,"showKeys":["itemName","linePrice","activityTag","activityPrice","activityTitle"],"RadioNotice":false,"showExtra":false,"rowType":"vertical","isShare":false,"onlyCode":"1697688571364502261","RadioGet":1,"radioActiveType":"FULL_PRESENT_ACTIVITY"}},{"assemblyInfo":{"id":"DcodeCoupons","iconType":"icon-Bannerzujian","title":"Coupons","onlyCode":"1697688661447223749"},"assemblyParam":{"onlyCode":"1697688661447223749"}},{"assemblyInfo":{"id":"DcodeProdRecomPro","iconType":"icon-Bannerzujian","title":"Product Recommendation","onlyCode":"1697688641764354066"},"assemblyParam":{"onlyCode":"1697688641764354066"}}]',
          'status': 0,
          'createdAt': '2023-10-17T09:08:27.289Z',
          'updatedAt': '2023-10-17T11:43:58.474Z'
      }
    }
  },
  doAnyRequest: async function (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Result<any>> {
    return await fetchWithAuth(url, { params: options }, 'GET')
  },
}
