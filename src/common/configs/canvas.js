export default {

    template: {
        name: 'New template',
        width: 800,
        height: 600,
        content: {
            "version": "3.3.0",
            "objects": [
                {
                    "type": "rect",
                    "version": "3.3.0",
                    "originX": "left",
                    "originY": "top",
                    "left": 100,
                    "top": 100,
                    "width": 20,
                    "height": 20,
                    "fill": "red",
                    "stroke": null,
                    "strokeWidth": 1,
                    "strokeDashArray": null,
                    "strokeLineCap": "butt",
                    "strokeDashOffset": 0,
                    "strokeLineJoin": "miter",
                    "strokeMiterLimit": 4,
                    "scaleX": 1,
                    "scaleY": 1,
                    "angle": 0,
                    "flipX": false,
                    "flipY": false,
                    "opacity": 1,
                    "shadow": null,
                    "visible": true,
                    "clipTo": null,
                    "backgroundColor": "",
                    "fillRule": "nonzero",
                    "paintFirst": "fill",
                    "globalCompositeOperation": "source-over",
                    "transformMatrix": null,
                    "skewX": 0,
                    "skewY": 0,
                    "rx": 0,
                    "ry": 0
                }
            ]
        }
    },

    text: {
        type: 'text',
        value: 'Text',
        options: {
            left: 100,
            top: 100
        }

    },

    rect () {
        return {
            id: Date.now(),
            "type": "rect",
            "version": "3.3.0",
            "originX": "left",
            "originY": "top",
            "left": 100,
            "top": 100,
            "width": 20,
            "height": 20,
            "fill": "red",
            "stroke": null,
            "strokeWidth": 1,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeMiterLimit": 4,
            "scaleX": 1,
            "scaleY": 1,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "clipTo": null,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "transformMatrix": null,
            "skewX": 0,
            "skewY": 0,
            "rx": 0,
            "ry": 0
        }
    }



}