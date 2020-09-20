const imgLayer = (): IImgLayer => ({
  id: 'INIT',
  type: 'IMG',
  editable: true,
  deletable: true,
  properties: {
    x: 0,
    y: 0,
    width: 100,
    height: 20,
    opacity: 1,
    rotation: 0,

    src: 'http://static.xhxly.cn/1fcdaef0-5a23-11ea-82db-91c6358ad7fc.png'
  },
});

export default imgLayer;
