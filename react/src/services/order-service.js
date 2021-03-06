const orderService = {
    load: function() {
        return fetch('http://localhost:9999/api/order').then(res => res.json())
    },
    details: function(id) {
        return fetch(`http://localhost:9999/api/order/${id}`).then(res => res.json())
    },
    create: function(mainTrip, destination, imageUrl, startDate, duration, mainTripPrice, totalPrice, additionalTrips) {
        return fetch('http://localhost:9999/api/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                mainTrip,
                destination,
                imageUrl,
                startDate,
                duration,
                mainTripPrice,
                totalPrice,
                additionalTrips
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    update: function(id, status) {
        return fetch(`http://localhost:9999/api/order/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                status
            }),
            credentials: 'include'
        }).then(res => res.text())
    },
    delete: function(id) {
        return fetch(`http://localhost:9999/api/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            credentials: 'include'
        }).then(res => res.text())
    }

}

export default orderService