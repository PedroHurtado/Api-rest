import { jwt } from "./jwt.js";
async function isValidToken(authorization){
    const token = authorization.split(' ');
    if(token[0].trim()!=='bearer'){
        return false;
    }
    return await jwt.verify(token[1].trim(),'secret guardar en sitio seguro');
}
export default function(){
    return function(req,res,next){
        const {authorization} = req.headers;
        if(!authorization || !isValidToken(authorization)){
            res.status(403).end('');
            return;
        }
        next();
    }
}
 