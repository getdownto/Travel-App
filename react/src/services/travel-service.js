const travelService = {
    load: function() {
        return fetch('http://localhost:9999/api/travel').then(res => res.json())
    }
}

export default travelService