const superagent = require('superagent')
const baseUrl = 'http://localhost:3000/dev'

const getOrderById = (id) => {
    return new Promise((resolve, reject) => {
        superagent
        .get(`${baseUrl}/api/orders`)
        .query({id: id})
        .end((err, res) => {
            err ? resolve(err) : resolve(res)
        })
    })
}

module.exports = {
    getOrderById
}