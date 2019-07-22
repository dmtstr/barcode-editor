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

    get (id) {
        return {
            method: 'GET',
            url: '/items/editor/' + id
        }
    },

    update (data) {
        return {
            method: 'PATCH',
            url: '/items/editor/' + data.id,
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