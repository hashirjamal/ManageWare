const asyncErrorHandler = (func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(e=>{
            // console.log("Async error handler");    
            next(e)
        })
    }
}


module.exports = asyncErrorHandler