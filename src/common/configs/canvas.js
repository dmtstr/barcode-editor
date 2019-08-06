export default {

    template: {
        name: 'New template',
        width: 800,
        height: 600,
        objects: [
            {
                id: 0,
                type: 'group',
                left: 274.75,
                top: 239.5,
                width: 250.5,
                height: 121,
                scaleX: 1,
                scaleY: 1,
                barcodeType: 'code128',
                barText: 'Count01234567!',
                objects: [
                    {
                        type: 'image',
                        src: '/barcode.png',
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.5,
                        scaleY: 0.5
                    }
                ]
            }
        ]
    },

    text: {
        type: 'i-text',
        text: 'text',
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