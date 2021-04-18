
const app = angular.module("ang_filonote",[]);
var winestate = false;
var id = 0;
var apiConnection = false;
var notes = [];
var user = null;


async function getNotes(user){
	var notes = null;
	var result = await fetch("./api/getNotes",{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}});
	if (result.ok){
		let textResult = await result.text();
		notes  = JSON.parse(textResult).Notes
	}

	console.log(notes);
	return notes;
	
}

function checkApi(){
	fetch("./api/check").then((res)=>{
		if(res.ok){
			res.text().then((resText) =>{
				apiConnection = true;
				console.log(resText);
			})
		}else{
			console.log("api unreachable ❌");
		}
	})
}

function noteMaker(obj_title,obj_content){
		var note = {
			title: obj_title, 
			content: obj_content,
			id: id
		};
		id++;
		return note;
}

function load(){
	user = JSON.parse(localStorage.getItem("user"));
	notes = localStorage.getItem("notes");
		if (user == null){
			checkApi();
			location.replace("/login");

		}else{
			
			console.log(notes);
		}
}


function show(){
	alert("show");
}

console.log("welcome to Filonote");
checkApi();
load();