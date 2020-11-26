// 基础 properties 定义
interface IBaseProperties {
  // 横坐标
  x: number;

  // 纵坐标
  y: number;

  // 宽度
  width: number;

  // 高度
  height: number;

  // 透明度
  opacity: number;

  // 旋转角度
  rotation: number;

  // zIndex?: number;
}

// 文字组件 properties
interface ITextProperties extends IBaseProperties {
  text: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  color: string;
}

// 图片组件 properties
interface IImgProperties extends IBaseProperties {
  src: string;
}

// 基础图层
interface IBaseLayer<T = IBaseProperties> {
  // id
  id: string;

  name: string;

  // 图层类型
  type: 'TEXT' | 'IMG';

  // 是否可编辑
  editable: boolean;

  // 是否可以删除
  deletable: boolean;

  // 图层属性
  properties: T;
}

// 文字图层
interface ITextLayer extends IBaseLayer<ITextProperties> {
  type: 'TEXT';
}

// 图片图层
interface IImgLayer extends IBaseLayer<IImgProperties> {
  type: 'IMG';
}

type ILayer = ITextLayer | IImgLayer;
type IProperties = IBaseProperties | ITextProperties | IImgProperties;

interface IProjectState {
  // 项目 id
  id: number;

  // 项目标题
  name: string;

  data: {
    // 画布相关
    canvas: {
      width: number;
      height: number;
    };

    // 图片数据
    imagesById: {
      [key: string]: {
        // 图片 id
        id: string;

        // 图片名称
        name: string;

        // 图片包含的图层 id
        layers: string[];
      };
    };
    imageAllIds: string[];

    // 图层数据
    layersById: {
      [key: string]: ILayer;
    };
    layerAllIds: string[];
  };
}

// 方向类型，上北、下南、左西、右东
type Direction = 'n' | 's' | 'w' | 'e';

interface IEditorState {
  // 当前图片 id
  curImageId: string;

  // 当前选中图层 id
  curLayerIds: string[];

  // 当前 hover 图层 id
  hoverLayerId: string;

  // 当前映现图层 id，当鼠标在图层列表中移入对应图层触发
  echoLayerId: string;

  // 编辑区相对于页面的坐标
  editorCanvasCoordinate: ICoordinate;

  // 是否处于拖拽状态
  isDraging: boolean;

  // 唯一标识一次拖拽过程的 id
  dragId: string;

  // 拖拽开始点鼠标坐标
  dragStartMouseCoordinate: ICoordinate;

  // 拖拽开始点被拖动图层初始坐标
  dragStartLayersCoordinate: IIdWithCoordinate[];

  // 是否处于旋转状态
  isRotating: boolean;

  // 唯一标识一次旋转过程的 id
  rotateId: string;

  // 旋转开始点鼠标与 x 轴正方向夹角
  rotateStartMouseAngle: number;

  // 旋转中心点坐标
  rotateCenterCoordinate: ICoordinate;

  // 旋转开始点被旋转图层初始位置信息
  rotateStartLayersRotation: (Pick<IBaseLayer, 'id'> & Pick<IBaseProperties, 'rotation'>)[];

  // 是否处于拖拽缩放状态
  isDragZooming: boolean;

  // 唯一标识一次拖拽缩放过程的 id
  dragZoomId: string;

  // 拖拽缩放起始鼠标坐标
  dragZoomStartMouseCoordinate: ICoordinate;

  // 拖拽缩放方向
  dragZoomDirection: Direction[];

  // 拖拽缩放图层位置信息
  dragZoomStartLayersPosition: (IRect & Pick<IBaseLayer, 'id'>)[];

  /**
   * @description 左侧面板相关属性
   */
  isLeftPanelVisible: boolean; // 左侧面板是否可见
  leftPanelWidth: number; // 左侧面板宽度

  /**
   * @description 拖拽画布区域相关属性
   */
  // 可拖拽范围
  scrollWidth: number;
  scrollHeight: number;
  // 当前滚动位置
  scrollTop: number;
  scrollLeft: number;
  // 滚动区域宽高
  screenWidth: number;
  screenHeight: number;

  // 基础组件面板宽度
  basicWidgetsPanelWidth: number;
  propertyPanelWidth: number;
}

// 二维坐标系坐标点
interface ICoordinate {
  x: number;
  y: number;
}

type IIdWithCoordinate = { id: string } & ICoordinate;

// 矩形坐标尺寸
interface IRect {
  // 矩形左上角 x 坐标
  x: number;

  // 矩形左上角 y 坐标
  y: number;

  // 矩形宽度
  width: number;

  // 矩形高度
  height: number;

  // 矩形旋转角
  rotation: number;
}
