const imgLayer = (id: IBaseLayer['id']): IImgLayer => ({
  id,
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

    src: 'https://s3.ax1x.com/2020/11/22/D3XoRS.jpg',
  },
});

export default imgLayer;
