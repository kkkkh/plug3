import {cloneDeep, omit} from 'lodash-es'

/**
1. 先找到最外层，删掉集合中的当条数据
2. 循环最外层，循环集合，如果集合中的父id等于上一层的id，
*/
export function toTreeData(
  data: any,
  attributes = {
    id: 'id',
    parentId: 'parentId',
    name: 'name',
    rootId: '0',
    icon: 'icon',
    hideMore: false,
    delEmptyChildRen: false, // 删除空的children
    sort: false,
  } as any,
  useDefaultIcon = false,
) {
  const transData = cloneDeep(data)
  const tree = []
  const map = new Map()

  transData.map(el => map.set(el[attributes.id], el))
  transData.map((el) => {
    const parent = map.get(el[attributes.parentId])
    // 没有排序 和 需要计算时
    // debugger
    // const sort = attributes.sort ? 
    const sort = attributes.sort && !el.sort ? 
      // 默认没有排序，计算排序
      {sort: (parent?.children?.length || 0) + 1} : 
      {}
    const hasChildren = Array.from(map.values()).find(item => item[attributes.parentId] === el[attributes.id])
    Object.assign(el, {
      value: el[attributes.id],
      label: el[attributes.name],
      icon: useDefaultIcon ? (hasChildren ? 'folder' : 'line-file') : el[attributes.icon],
      id: el[attributes.id],
      hideMore: attributes.hideMore || false,
      children: el.children?.length ? el.children : attributes.delEmptyChildRen ? null : [],
      info: omit(el, 'children'),
      ...sort,
    })
    if (parent) {
      (parent.children || (parent.children = [])).push(el)
      if (attributes.sort) {
        // debugger
        parent.children = parent.children.sort((a,b) => a.sort - b.sort)
      }
    } else if (el[attributes.parentId] === attributes.rootId){
      tree.push(el)
    }	
  })
  return tree
}
