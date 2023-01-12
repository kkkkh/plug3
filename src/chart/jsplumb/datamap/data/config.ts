
export const jsPlumbConfig = ()=>{
  const strokeColor = 'rgba(19,114,240,0.9)'
  return {
        // Endpoint: 'Blank',
        Endpoint: ['Dot', {radius: 5, cssClass: 'datamap-dot'}],
        EndpointStyle: {
          stroke: strokeColor,
          fill: 'rgba(255,255,255,1)',
          strokeWidth: 2,
        },
        // EndpointHoverStyle: {fill: '#fff'},
        // 连线的方式
        Connector: ['Straight', {}],
        // Connector: ['Bezier', {curviness: 150}],
        // Connector: ['StateMachine', {curviness: 80, margin: -0.1}],
        // Anchors: ['Bottom', 'Top'],
        Anchor: ['AutoDefault', 'AutoDefault'],
        // ConnectionOverlays: [['Arrow', {width: 6, length: 6, location: -1}]],
        PaintStyle: {
          stroke: strokeColor,
          strokeWidth: 1,
        },
      }
}

