import express from 'express'
import cors from 'cors';
import versions from './versions.js';
import autorization from './autorization.js';
import  bcrypt from 'bcrypt';
import { jwt } from './jwt.js';
import {body } from 'express-validator'
import validator from './validator.js';
import { Forbiden } from './customerros.js';
import globalExpception from './globalexception.js'
const app = express()

const {v1,v2} =versions;

app.use(function(err,req,res,next){
  console.log('error')
  res.status(500).end('pendiente de resolver')
})
app.use(cors());
app.use(express.json())
app.use('/v1',versions.v1);
app.use('/v2',versions.v2);

v1.get('/pizzas', function (req, res) {
  const {name,page,size} = req.query;
  console.log(name);
  console.log(page);
  console.log(size);
  res.json([{id:1}]);
})


//cors,json,autorizacion,controlador
v1.get('/pizzas/:id', autorization(),function (req, res) {
  const {id} = req.params;
  if(id==='33'){
    res.status(404).end('');
  }
  else {
    res.json({id:id});
  }
})

v1.post('/pizzas',function(req,res){
  const {name} = req.body || {};
  res.status(201).json({name,id:1})
})

v1.put('/pizzas/:id',function(req,res){
  const {id} = req.params;
  const {name} = req.body || {};
  res.status(204).end('');
})

v1.patch('/pizzas/:id',function(req,res){
  const {id} = req.params;
  const {name} = req.body || {};
  res.status(204).end('');
})

v1.delete('/pizzas/:id',function(req,res){
  const {id} = req.params;
  res.status(204).end('');
})

v1.post('/pizzas/:id/comments',function(req,res){
  console.log(req.body);
  console.log(req.params);
  const pizza={...req.body,id:25}
  res.status(201).json(pizza)
})
v1.delete('/pizzas/:id/comments/:idcomment',function(req,res){
  const {id,idcomment} = req.params;
  console.log(`pizza ${id}, comments ${idcomment}`)
  res.status(204).end();
})

v1.get('/pizzas/:id/comment',function(req,res){
  res.status([{},{}]).end();
})

v1.get('/pizzas/:id/comment/:idcomment',function(req,res){
  res.status({}).end();
})

v1.patch('/pizzas/:id/comments/:idcomment',function(req,res){
  const {id,idcomment} = req.params;
  console.log(`pizza ${id}, comments ${idcomment}`)
  res.status(204).end();
})

v1.put('/pizzas/:id/comments/:idcomment',function(req,res){
  const {id,idcomment} = req.params;
  console.log(`pizza ${id}, comments ${idcomment}`)
  res.status(204).end();
})

async function generateJWT(user,role){
  const access_token = await jwt.sign({
    user,
    role
}, 'secret guardar en sitio seguro', { algorithm: 'HS256' })
return access_token;
}

v1.post('/login',
      body('user').isEmail(),
      body('password').isLength({ min: 5 }),
      validator(),
      globalExpception(
        async function(req,res){
          //12345
          const pwdBd='$2b$10$2TmhnTeoxN70yoewCV65N.P3u2ue4BoGEoFbaTC..zS4S5CAMwwwK'
          const {user,password} = req.body;
          const pwd = bcrypt.hashSync(password, 10);
        
            if(bcrypt.compareSync(password,pwdBd)){
              const token = await generateJWT(user,"admin")
              res.json({token:token})
            }else{
              throw new Forbiden({data:'usuario y contraseña invalidos'})
            }
          })   
      ),
        




v2.get('/pizzas', function (req, res) {
  res.json([{id:2},{id:1}]);
})



app.listen(3000,()=>{
  console.log("server start in port 3000")
})