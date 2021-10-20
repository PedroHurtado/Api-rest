export default function(){
    return function(req,res,next){
        try{
            next()
        }
        catch(err){
            next(err);
        }
    }
}