const userService = {
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
        }).then(res => res.json())
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
        }).then(res => res.json())
    }
}

export default userService