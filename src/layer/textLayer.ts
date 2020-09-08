const textLayer = (): ITextLayer => ({
  id: 'INIT',
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

    text: 'hello',
    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'left',
    lineHeight: 20,
  },
});

export default textLayer;
