const handleProfile=(req,res,knex)=>{
	const {id}=req.params;
	knex.select('*').from('users').where('id','=',id).then(user=>{
		if(user.length)
		{res.json(user[0])}
	else{
		res.status(400).send('user was not found')
	}
	})
	.catch(()=>res.status(400).send('error getting the user'));
	
    
    
};
module.exports={
	handleProfile
}