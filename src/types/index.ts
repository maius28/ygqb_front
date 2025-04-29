// 数据类型定义

// 情报数据结构
export interface IntelData {
  // 唯一键
  id: string
  //   情报内容
  content: string
  //   情报图片
  imageUrl: string
  //   生成日期
  createdAt: string
  //   卫星编号
  satelliteId: string
  //  经纬度
  lnglat: string
}

// 机构数据结构
export interface Agent {
  // 唯一鍵
  id: string
  // 名称
  name: string
  // 地址
  address: string
  // 所属机构
  hostInstitution: string
}
