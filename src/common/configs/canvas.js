export default {

    template: {
        name: 'New template',
        width: 800,
        height: 600,
        barcode_type: 'code128',
        bar_text: 'Count01234567!',
        objects: [
            {
                id: 0,
                type: 'group',
                left: 150,
                top: 179,
                width: 501,
                height: 242,
                scaleX: 1,
                scaleY: 1,
                objects: [
                    {
                        type: 'image',
                        src: '/barcode.png',
                        originX: 'center',
                        originY: 'center',
                    }
                ]
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