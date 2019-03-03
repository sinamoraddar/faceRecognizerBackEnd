const Clarifai=require('clarifai');
const app = new Clarifai.App({
 apiKey: 'abedd40f642c492eaec1b1de12d07831'
});
const handleApiCall=(req,res)=>{
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data=>res.json(data))
.catch(err=>res.status(400).json('unable to work with api'))
}
const handleImage=(req,res,knex)=>{
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
}
module.exports = {
	handleImage,
	handleApiCall
}