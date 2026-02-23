class ApiResponse {
    constructor(satusCode , message = "success" , data){
        this.satusCode = satusCode
        this.data = data
        this.message = message
        this.success = satusCode < 400
    }
}

export {ApiResponse}