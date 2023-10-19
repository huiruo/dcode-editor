/* eslint-disable no-unused-vars */
export interface GetCategoryTreeParams {
  showDisable: number
}

interface TreeNode {
  attrs: string
  code: string
  createPerson: string | null
  createTime: string
  description: string
  extFields: {
    mallShow: boolean
    jiangHuOrderConfig: null
    showType: number
  }
  extension: string
  id: string
  instanceId: string
  jiangHuOrderConfig: null
  link: null
  links: null
  mallShow: boolean
  name: string
  organizationId: null
  organizationName: null
  ownerId: null
  parentId: string | number
  rootId: string
  showType: number
  sort: number
  status: number
  tenantId: number
  updatePerson: string
  updateTime: string
}

export interface TreeNodeItem {
  children: TreeNodeItem[]
  node: TreeNode
}

export interface TreeResponse {
  dirUsage: string
  tree: TreeNodeItem[]
}

export type TreeType = 'area' | 'category' | ''

export enum TreeTypes {
  Area = 'area',
  Category = 'category',
}
