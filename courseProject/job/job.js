
const axios = require('axios');
const backEndTodo = process.env.BACKEND
const urlwiki = process.env.WIKI

async function randomWiki() {

	const wikiarticle = await axios.get(urlwiki, {
	   maxRedirects: 0,           
	   validateStatus: () => true
	});
	let locationurl = wikiarticle.headers['location']
	console.log('Wikipedia article retrieved '+locationurl);
	
	const response = await axios.post(
      backEndTodo+'/add',
      { todo: locationurl },
		{ 
		  headers: { 'Content-Type': 'application/json' },
		  maxRedirects: 0,
		  alidateStatus: () => true
		}
	);
	console.log('Todo added');

}

randomWiki()