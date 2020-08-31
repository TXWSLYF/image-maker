// 基础properties定义
interface BaseProperties {
  // 横坐标
  x: number;

  // 纵坐标
  y: number;

  // 宽度
  width: number;

  // 高度
  height: number;

  // 颜色
  color: string;

  // 透明度
  opacity: number;

  // zIndex?: number;
}

interface TextProperties extends BaseProperties {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
}

interface ImgProperties extends BaseProperties {
  src: string;
}

interface BaseLayer<T = BaseProperties> {
  // id
  id: string;

  // 图层类型
  type: 'TEXT' | 'IMG';

  // 是否可编辑
  editable: boolean;

  // 是否可以删除
  deletable: boolean;

  // 图层属性
  properties: T;
}

interface TextLayer extends BaseLayer<TextProperties> {
  type: 'TEXT';
}

interface ImgLayer extends BaseLayer<ImgProperties> {
  type: 'IMG';
}

interface ProjectState {
  // 项目 id
  id: number;

  // 项目标题
  title: string;

  // 图片 map
  images: {
    byId: {
      [key: string]: {
        // 图片 id
        id: string;

        // 图片名称
        name: string;

        // 图片包含的图层 id
        layerIds: string[];
      };
    };
    allIds: string[];
  };

  // 图层 map
  layers: {
    byId: {
      [key: string]: BaseLayer;
    };
    allIds: string[];
  };
}

interface EditorState {
  // 当前图片 id
  curImageId: string;

  // 当前选中图层 id
  curLayerIds: string[];
}

interface RequestResponse<T> {
  errNo: number;
  errMsg: string;
  data: T;
}
