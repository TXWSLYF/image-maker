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
    color: 'black',
    opacity: 1,

    src: 'https://static.xhxly.cn/fc357090-5a22-11ea-82db-91c6358ad7fc.png'
  },
});

export default imgLayer;
