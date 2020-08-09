const userService = {
    load: function(id) {
        return fetch(`http://localhost:9999/api/user?id=${id}`).then(res => res.json())
    },
    loadAll: function() {
        return fetch(`http://localhost:9999/api/user/all`).then(res => res.json())
    },
    register: function(username, password) {
        return fetch('http://localhost:9999/api/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.text())
    },
    login: function(username, password) {
        return fetch('http://localhost:9999/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username,
                password
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    verify: function(token) {
        return fetch('http://localhost:9999/api/user/verify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                token
            }),
            credentials: 'include'
        }).then(res => res.json())
    },
    logout: function() {
        return fetch('http://localhost:9999/api/user/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.text())
    },
    makeAdmin: function(id) {
        return fetch(`http://localhost:9999/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({}),
            credentials: 'include'
        }).then(res => res.text())
    },
}

export default userService