const textLayer = (): ITextLayer => ({
  id: 'INIT',
  name: '双击编辑文本',
  type: 'TEXT',
  editable: true,
  deletable: true,
  properties: {
    x: 0,
    y: 0,
    width: 100,
    height: 20,
    opacity: 1,
    rotation: 0,

    text: '双击编辑文本',
    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'left',
    lineHeight: 20,
    color: '#000000',
  },
});

export default textLayer;
