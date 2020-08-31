const textLayer = (): TextLayer => ({
  id: 'INIT',
  type: 'TEXT',
  editable: true,
  deletable: true,
  properties: {
    x: 0,
    y: 0,
    width: 100,
    height: 20,
    color: 'black',
    opacity: 1,

    fontSize: 20,
    fontFamily: 'sans-serif',
    textAlign: 'left',
    lineHeight: 20,
  },
});

export default textLayer;
