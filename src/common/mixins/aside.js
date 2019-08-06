import {mapActions} from 'vuex'
import iconUp from '@/assets/icons/up.svg'
import iconDown from '@/assets/icons/down.svg'
import iconDelete from '@/assets/icons/delete.svg'


export default {

    components: {
        iconUp,
        iconDown,
        iconDelete
    },

    computed: {

        last () {
            return this.canvas.getObjects().indexOf(this.active) === 0;
        },

        first () {
            return this.canvas.getObjects().indexOf(this.active) === this.canvas.getObjects().length - 1;
        }

    },

    methods: {

        ...mapActions('template', [
            'activate'
        ]),

        remove () {
            this.canvas.remove(this.active);
            this.activate(this.canvas);
        },

        backwards () {
            this.active.sendBackwards();
        },

        forwards () {
            this.active.bringForward();
        },

        prop (prop, value) {
            this.active.set(prop, value);
            this.render();
        },

        render () {
            this.active.setCoords();
            this.canvas.requestRenderAll();
        }

    }

}