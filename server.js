const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Wanted98wanted',
    database : 'smart-brain'
  }
});
knex.select('*').from('users')
.then(data=>console.log(data))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
res.json(database)
})
app.post("/signin",(req,res)=>{
// 	bcrypt.compare("12345678", "$2a$10$oxPGY0BzWFgqrXCtQTwfYePb09I8cdejXVnS7AcM6ZIiM2o7OvA1i",
// 	 function(err, res) {
//     console.log(res)
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
// console.log(req.body)
// 	if(req.body.email==database[0].email&&
// 		req.body.password==database[0].password){
// 		res.json(database[0]);
// 	}else {
// 		res.status(400).json('error logging in');
// 	}
// res.send('signing in')
const{email,password}=req.body;
knex.select('email','hash')
	.from('login')
	.where({email:email})
	.then(response=>{
		 if(bcrypt.compareSync(password, response[0].hash))
		{return	knex.select('*')
			.from('users')
			.where({email:email})
			.then(user=>
				{	console.log('users',user[0])
					res.json(user[0])}
				).catch(()=>res.status(400).json("unable to get user"))
		}else{
			res.status(400).json("username or/and password was/were wrong")
		}

}).catch(()=>res.status(400).json("username or/and password was/were wrong"))

})
app.post('/register',(req,res)=>{
const {name,email,password}=req.body;
const hash = bcrypt.hashSync(password);

// bcrypt.compareSync("bacon", hash); // true
// bcrypt.compareSync("veggies", hash); // fals
knex.transaction(trx=>{
	trx.insert({
		hash:hash,
		email:email
	})
	.into('login')
	.returning('email')
	.then(loginEmail=>{
		return trx('users')
       .returning('*')
       .insert({
       	name:name,
       	email:loginEmail[0],
       	joined:new Date()
       })
       .then(user=>
        res.json(user[0]))

	})
	.then(trx.commit)
    .catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('we were unable to register you for some funny reason'));
     
       
      
});
app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	knex.select('*').from('users').where('id','=',id).then(user=>{
		if(user.length)
		{res.json(user[0])}
	else{
		res.status(400).send('user was not found')
	}
	})
	.catch(()=>res.status(400).send('error getting the user'));
	
    
    
});
app.put('/image',(req,res)=>{
	const {id}=req.body;
	knex('users')
	.where({id:id})
	.increment('entries',1)
	.returning('entries')
   	.then(entries=>
   		{
if(entries.length)
{res.json(entries[0])}

else{
	res.status(400).json('user was not found')
}
   			
   		})
   	.catch(()=>res.status(400).json('couldn\'t handle the request'))
})
app.listen(3001,()=>{
	console.log('app is running on port 3001')
})