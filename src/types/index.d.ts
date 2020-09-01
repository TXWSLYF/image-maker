// 基础properties定义
interface IBaseProperties {
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

interface ITextProperties extends IBaseProperties {
  text: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
}

interface IImgProperties extends IBaseProperties {
  src: string;
}

interface IBaseLayer<T = IBaseProperties> {
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

interface ITextLayer extends IBaseLayer<ITextProperties> {
  type: 'TEXT';
}

interface IImgLayer extends IBaseLayer<IImgProperties> {
  type: 'IMG';
}

type ILayer = ITextLayer | IImgLayer;

interface IProjectState {
  // 项目 id
  id: number;

  // 项目标题
  title: string;

  // 画布相关
  canvas: {
    width: number;
    height: number;
  };

  // 图片 map
  images: {
    byId: {
      [key: string]: {
        // 图片 id
        id: string;

        // 图片名称
        name: string;

        // 图片包含的图层 id
        layers: string[];
      };
    };
    allIds: string[];
  };

  // 图层 map
  layers: {
    byId: {
      [key: string]: ILayer;
    };
    allIds: string[];
  };
}

interface IEditorState {
  // 当前图片 id
  curImageId: string;

  // 当前选中图层 id
  curLayerIds: string[];
}

interface IRequestResponse<T> {
  errNo: number;
  errMsg: string;
  data: T;
}
