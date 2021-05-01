const http = require('http');
const JHV = require('./index.js');

const server = http.createServer((req, res)=>{

	/*
		------ EXAMPLE 1
	*/
	let result1 = new JHV({
		code : "<p>This text is generate with $name at version $version</p>",
		json : {
			name : "json-html-var",
			version : "1.0.0"
		}
	});


	/*
		------ EXAMPLE 2
	*/
	let result2 = new JHV({
		code : "<p>$app-name is build by $author.name and publish the $author.date with some css style :D</p>",
		json : {
			'app-name' : result1.json.name,
			author : {
				name : "Julien Tech",
				date : "2021-05-01"
			}
		},
		custom : (value)=>{
			return '<span class="keyword-style" title="This word is replace from json !">' + value + '</span>'
		}
	});


	/*
		------ EXAMPLE 3	
	*/
	let result3 = new JHV({
		file : {
			code : './test/index.htm',
			json : './test/infos.json'
		}
	})

	// returning the code to the web page
	res.write(result3.code);
	res.write(result1.code);
	res.write(result2.code)

	res.end();
	
});
server.listen(8085, '', '', ()=>{
	console.log("Testing json-html-var\nSee the result on : http://localhost:8085");
})