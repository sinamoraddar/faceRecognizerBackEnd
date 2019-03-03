const handleSignin=(knex,bcrypt)=>(req,res)=>{
const{email,password}=req.body;
if(!(email||password)){return res.status(400).json('wornd information')}

knex.select('email','hash')
	.from('login')
	.where({email:email})
	.then(response=>{
		 if(bcrypt.compareSync(password, response[0].hash))
		{return	knex.select('*')
			.from('users')
			.where({email:email})
			.then(user=>
				{
					res.json(user[0])}
				).catch(()=>res.status(400).json("unable to get user"))
		}else{
			res.status(400).json("username or/and password was/were wrong")
		}

}).catch(()=>res.status(400).json("username or/and password was/were wrong"))

}

module.exports={
	handleSignin:handleSignin
}