const { readFileSync } = require('fs');

module.exports = class JsonHtmlVar{
	constructor(datas=null, apply=true){

		if(datas != null){

			if(datas["file"]){

				if(datas.file["code"]){
					try{
						datas.code = readFileSync(datas.file.code).toString();
					}catch(err){
						return console.log("\x1b[41m" + err + "\x1b[0m");
					}
				}

				if(datas.file["json"]){
					try{
						datas.json = JSON.parse(readFileSync(datas.file.json).toString());
					}catch(err){
						return console.log("\x1b[41m" + err + "\x1b[0m");
					}
				}

			}

			/*
				required field if datas set in args
				you can create an empty call : var jhv =  new JHV() and set it after jhv.code = ... | jhv.json = ...
			*/
			if(!datas["code"]) return console.log(Error("\x1b[41mExpected 'code' object in the JHV instance\x1b[0m"));
			if(!datas["json"]) return console.log(Error("\x1b[41mExpected 'json' object in the JHV instance\x1b[0m"));

			this.code = datas.code;
			this.json = datas.json;
			this.callback = datas.custom ? datas.custom : null;

			if(apply === true) 
				this.#apply(this.json);

		}
	}

	#apply(val, parentKey='', k='', parentVal=''){
		if(Object.keys(val).length > 0 && typeof val != "string" && !val['length']){ // if contain tabs
			for(let key in val){
				this.#apply(val[key], parentKey+key+".", key, val);
			}
		}else{
			if(!/^_/.test(k)){ // if key found
				parentKey = parentKey.substr(0, parentKey.length-1); // removing the last .
				let rg = new RegExp('\\$'+parentKey, 'g');
				this.code = this.code.replace(rg, this.callback ? this.callback(parentVal[k]) : parentVal[k]);
			}
		}
	}

	test(PORT=8085){
		let testPage = require('./test.js');
		testPage(PORT);
	}
}