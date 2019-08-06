export default {

    login (data) {
        return {
            method: 'POST',
            url: '/auth/authenticate',
            data: data
        }
    },

    refresh (token) {
        return {
            method: 'POST',
            url: '/auth/refresh',
            data: {token}
        }
    },

    list () {
        return {
            method: 'GET',
            url: '/items/editor'
        }
    },

    get (id) {
        return {
            method: 'GET',
            url: '/items/editor/' + id
        }
    },

    update (data, id) {
        return {
            method: 'PATCH',
            url: '/items/editor/' + id,
            data: data
        }
    },

    create (data) {
        return {
            method: 'POST',
            url: '/items/editor',
            data: data
        }
    },

    remove (id) {
        return {
            method: 'DELETE',
            url: '/items/editor/' + id
        }
    }

}