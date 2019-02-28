const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const database=[
   {
   	id:'1',
   	name:'sina',
   	email:'sinamoraddar@gmail.com',
   	password:"12345678",
   	entries:0,
   	joined:new Date()
   },
   {
   	id:'2',
   	name:'abbas',
   	email:'abbas@gmail.com',
   	password:'12345678',
   	entries:0,
   	joined:new Date()
   },
   {
   	id:'3',
   	name:'gholam',
   	email:'gholam@gmail.com',
   	password:'12345678',
   	entries:0,
   	joined:new Date()
   },
]

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
console.log(req.body)
	if(req.body.email==database[0].email&&
		req.body.password==database[0].password){
		res.json(database[0]);
	}else {
		res.status(400).json('error logging in');
	}
// res.send('signing in')
})
app.post('/register',(req,res)=>{
// 	bcrypt.hash(req.body.password, null, null, function(err, hash) {
// 		console.log(hash)
// });
       database.push({
       		id:(Number(database[database.length-1].id)+1).toString(),
   	name:req.body.name,
   	email:req.body.eamil,
   	// password:req.body.password,
   	entries:0,
   	joined:new Date()
       });
       res.json(database[database.length-1])
});
app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let found=false;
	database.forEach(
    (user)=>{
    	if(user.id===id){
    		found=true;
    	return	res.json(user)
    	}
    });
    if(!found){
    	res.status(404).send('user was not found');
    }
});
app.put('/image',(req,res)=>{
	console.log(req.body)
	const {id}=req.body;
	let found=false;
	database.forEach(
    (user)=>{
    	if(user.id===id){
    		found=true;
    		user.entries++;
    	return	res.json(user.entries)
    	}
    	if(!found){
    	res.status(404).send('user was not found');
    }
    });

})
app.listen(3001,()=>{
	console.log('app is running on port 3001')
})