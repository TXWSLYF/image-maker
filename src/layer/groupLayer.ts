const groupLayer = (id: IBaseLayer['id']): IGroupLayer => ({
  id,
  name: '群组',
  type: 'GROUP',
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
    isExpanded: false,
  },
});

export default groupLayer;
