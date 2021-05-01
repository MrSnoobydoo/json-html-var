#### json-html-var
> NPM packages <br>
**json-html-var** package allowing you to push NodeJS variable into your web page. <br >
It can use datas from a JSON file or an Javascript object and can be applied to all kinds of files containing a string *(html, txt, php, css ...)*.

## Installation

Use npm installation through your system console : 
`npm install json-html-var`

## Examples test

The npm package contain a test script render of the examples usage below. <br>
Create a new script **test.js** in the same folder of your node_modules folder ! then launch it with `node test.js` :
```js
const JHV = require('json-html-var')
new JHV().test(PORT=8085)
```
You should see the result on http://localhost:8085

## Getting start 

First you need to import the module in the script you wish to used
```js
const JHV = require('json-html-var') // you can name it whatever you want
```
1/ Using variable

> Input js script :
```js

let json = {
    'app-name' : 'json-html-var',
    version : '1.0.2',
    info : {
        creator : 'MrSnoobydoo',
        date : '2021-05-01'
    },
    test : 3*6
}

let code = "This text is build with $app-name on the version $version\n"
		+ "The first build was release the $info.date by $info.creator.\n"
		+ "Test number : $test"

let result = new JHV({
	code: code, 
	json: json
})
console.log(result.code)

```
> Output console :
```
This text is build with json-html-var on the version 1.0.2
The first build was release the 2021-05-01 by MrSnoobydoo.
Test number : 18
````

2/ Using file (no need to use fs node module)

> JSON file : data.json: 
```json
{
    "app-name" : "Delivery Pizza JHV",
    "version" : "1.0.2",
    "date" : "Sat May 01 2021 13:58:48 GMT+0000",
    "pizza" : {
    	"order-number" : 85,
    	"ratings" : 4.5
    }
}
```
> HTML page : index.htm
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<title>$app-name</title>
	</head>
	<body>
		<p>Welcome to $app-name version $version !</p>
		<p>This page was loaded the $date</p>
		<p>Here is some pizza order stats : </p>
		<ul>
			<li>Order Number : $pizza.order-number</li>
			<li>Ratings by customers : $pizza.ratings</li>
		</ul>
	</body>
</html>
```
> Input js script :
```js

let result = new JHV({
	file : {
		code : './index.htm',
		json : './data.json'
	}
})
console.log(result.code) // use result.code to show the html code into your http server

```
3/ Using both method (file and string/variable)
```js

let json = {
    "app-name" : "Delivery Pizza JHV",
    "version" : "1.0.2",
    "date" : "Sat May 01 2021 13:58:48 GMT+0000",
    "pizza" : {
    	"order-number" : 85,
    	"ratings" : 4.5
    }
}

let result = new JHV({
	json : json,
	file : {
		code : './index.htm'
	}
})

```

4/ Let's put some **custom style** on each variable !
> Script : index.js
```js

// we retake the code of the example 1
let json = {
    'app-name' : 'json-html-var',
    version : '1.0.2',
    info : {
        creator : 'MrSnoobydoo',
        date : '2021-05-01'
    },
    test : 3*6
}

let code = "This text is build with $app-name on the version $version\n"
		+ "The first build was release the $info.date by $info.creator.\n"
		+ "Test number : $test"

// We apply red bold style to all our variable JHV
let result = new JHV({
	code: code,
	json: json,
	custom : (value)=>{
		return '<span style="color: #4ab4ff;font-weight: bold;">'+value+'</span>'
	}
})

console.log(result.code);

````


> Another Example : The power of 2
> Script : index.js
```js

let json = {
	"1" : "1",
	"2" : "2",
	"3" : "3",
	"increment" : "increment"
}

let code = "2^1 = $1\n"
		+ "2^2 = $2\n"
		+ "2^3 = $3\n"

// We apply red bold style to all our variable JHV
let increment = 1;
let result = new JHV({
	code: code,
	json: json,
	custom : (value)=>{
		return Math.pow(2, parseInt(value));
	}
})

console.log(result.code);

````
> Console Output :
```
2^1 = 2
2^2 = 4
2^3 = 8
```
### Contribution
> You can contribute to this project of course :D

### Licence
This projec is under [MIT Licence](https://github.com/electron/electron/blob/master/LICENSE)

### Next features
- using loop to fetch array values with one lines
- executing nodejs inside a file directly
- ...