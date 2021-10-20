export default function(cb){
    return async function(req,res,next){
        try{
            await cb(req,res,next);
            next();
        }
        catch(err){
            next(err);
        }
    }
}