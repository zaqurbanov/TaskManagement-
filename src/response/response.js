
 class Response {
    constructor() {
        if (Response.instance) {
            return Response.instance
        }else{
            Response.instance = this
            return Response.instance
        }
    }

    success(res,{statusCode=200,message,data=[]}){
        
        return res.status(statusCode).json({
            statusCode,
            success:true,
            message,            
            dataLength:data.length || 0,
            data,

        })
    }
}




const responseHandler  = new Response()
export default responseHandler