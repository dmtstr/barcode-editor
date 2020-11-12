export default {

    login (data) {
        return {
            method: 'GET',
            url: '/login.json',
            data: data
        }
    },

    refresh (token) {
        return {
            sync: true,
            method: 'POST',
            url: '/auth/refresh',
            data: {token}
        }
    },

    list () {
        return {
            method: 'GET',
            url: '/items.json'
        }
    },

    get (id) {
        return {
            method: 'GET',
            url: `/${id}.json`
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