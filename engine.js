
const app = angular.module("ang_filonote",[]);
var winestate = false;
var id = 0;
function note_maker(obj_title,obj_content){
		var note = {
			title: obj_title, 
			content: obj_content,
			id: id
		};
		id++;
		return note;
}
app.controller("principal",($scope)=>{
	
	//functions
	function add() {
		let fun_title = $scope.str_title;
		let fun_content = $scope.str_content;
		if (fun_content != "" || fun_title == ""){
			let now_note = note_maker(fun_title,fun_content)
			$scope.stack_notes.push(now_note);
			localStorage.setItem("notes",JSON.stringify($scope.stack_notes));
		}

		show();
	}

	function show(){
		console.log($scope.stack_notes);
		if (winestate){
			$("#add").text = "Close";
			$("#win").addClass("invisible");

		}else{
			$("#add").text = "Add";
			$("#win").removeClass("invisible");



		}
		winestate = !winestate;
	}
	function eliminar(fun_id){
		$("#note_" + fun_id).animate({width:"0%",height:"0%"},{duration:500,complete:()=>{
			
			$scope.stack_notes.splice(fun_id,1);
			$scope.$apply();
			localStorage.setItem("notes",JSON.stringify($scope.stack_notes));
		}});

}
                                
	$scope.add = add;	
	$scope.show = show;
	$scope.eliminar = eliminar;	
	$scope.stack_notes = [];
	$scope.title = "FILONOTE";

	var init = function(){
		let saved = localStorage.getItem("notes");
		if (saved == null){
			let nota1 = note_maker("Bienvenido","Bienvenido a filonote la webapp de notas offline")
			let nota2 = note_maker("Empezemos","prueba a eliminar estas notas o crear una nueva con el boton añadir")
			$scope.stack_notes.push(nota1);
			$scope.stack_notes.push(nota2);
		}else{
			$scope.stack_notes = JSON.parse(saved);
			console.log($scope.stack_notes);
			id = $scope.stack_notes.length;
		}
	}
	init();
	
});
