const imgLayer = (): IImgLayer => ({
  id: 'INIT',
  name: '图片',
  type: 'IMG',
  editable: true,
  deletable: true,
  properties: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    opacity: 1,
    rotation: 0,
    children: [],

    src: 'http://static.xhxly.cn/1fcdaef0-5a23-11ea-82db-91c6358ad7fc.png',
  },
});

export default imgLayer;
