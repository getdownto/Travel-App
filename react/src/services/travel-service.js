const travelService = {
    load: function() {
        return fetch('http://localhost:9999/api/travel').then(res => res.json())
    },
    details: function(id) {
        return fetch(`http://localhost:9999/api/travel/${id}`).then(res => res.json())
    },
    create: function(destination, price, imageUrl, startDate, duration, description, additionalTrips) {
        return fetch('http://localhost:9999/api/travel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                destination,
                price,
                imageUrl,
                startDate,
                duration,
                description,
                additionalTrips
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    update: function(id, destination, price, imageUrl, startDate, duration, description, additionalTrips) {
        return fetch(`http://localhost:9999/api/travel/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                destination,
                price,
                imageUrl,
                startDate,
                duration,
                description,
                additionalTrips
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    delete: function(id) {
        return fetch(`http://localhost:9999/api/travel/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            credentials: 'include'
        }).then(res => res.text())
    }

}

export default travelService