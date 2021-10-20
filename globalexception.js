export default function(fn){
    return function(req,res,next){
        try{
            fn(req,res,next);
            next();
        }
        catch(err){
            next(err);
        }
    }
}