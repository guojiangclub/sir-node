class response {
    constructor() {

    }
    succeed() {
        this.message = "OK"
        this.code = 0
        return JSON.stringify(this)
    }
    fail(code=1000,message) {
        this.code = code
        this.message = message
        return JSON.stringify(this)
    }
    setData(data) {
        this.message = "OK"
        this.data = data
        return JSON.stringify(this)
    }
}
module.exports = response