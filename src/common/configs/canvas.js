export default {

    template: {
        name: 'New template',
        width: 800,
        height: 600,
        objects: [
            {
                type: 'rect',
                fill: '#ff0000',
                left: 100,
                top: 100,
                width: 100,
                height: 100,
                scaleX: 1,
                scaleY: 1,
                strokeWidth: 0
            }
        ]

    },

    text: {
        type: 'i-text',
        text: 'hello world',
        fontFamily: 'Times New Roman',
        fontSize: 40,
        fontStyle: 'normal',
        fontWeight: 'normal',
        left: 100,
        top: 100,
        scaleX: 1,
        scaleY: 1,
        fill: '#000000',
        textAlign: 'left'
    },

    line: {
        // clipTo: null
        // fill: 'rgb(0,0,0)'
        // fillRule: 'nonzero'
        // flipX: false
        // flipY: false
        // globalCompositeOperation: 'source-over'
        // height: 100
        // left: 170
        // opacity: 1
        // originX: 'left'
        // originY: 'top'
        // paintFirst: 'fill'
        // scaleX: 1
        // scaleY: 1
        // shadow: null
        // skewX: 0
        // skewY: 0
        // stroke: 'red'
        // strokeDashArray: null
        // strokeDashOffset: 0
        // strokeLineCap: 'butt'
        // strokeLineJoin: 'miter'
        // strokeMiterLimit: 4
        // strokeWidth: 1
        // top: 150
        // transformMatrix: null
        // type: 'line'
        // version: '3.3.0'
        // visible: true
        // width: 150
        // x1: -75
        // x2: 75
        // y1: -50
        // y2: 50
    },

    rect: {
        type: 'rect',
        fill: '#ff0000',
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        strokeWidth: 0
    }



}