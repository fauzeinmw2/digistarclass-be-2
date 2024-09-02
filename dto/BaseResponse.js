class BaseResponse {
    constructor(success = true, message = "success", data) {
        this.success = success
        this.message = message
        this.data = data
    }
}

module.exports = BaseResponse