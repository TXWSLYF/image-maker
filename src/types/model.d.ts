/**
 * @description 存放数据库实体表结构
 */

interface ModelMetaInfo {
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: 0 | 1;
}

interface BaseModel extends ModelMetaInfo {
  id: number;
}
