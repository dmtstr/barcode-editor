export default {

    login (data) {
        return {
            method: 'POST',
            url: '/auth/authenticate',
            data: data
        }
    },

    list () {
        return {
            method: 'GET',
            url: '/items/editor'
        }
    },

    get () {
        return {
            method: 'GET',
            url: '/items/products'
        }
    },

    update () {
        return {
            method: 'GET',
            url: '/items/products'
        }
    },

    remove () {
        return {
            method: 'GET',
            url: '/items/products'
        }
    }

}