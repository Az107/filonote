
const app = angular.module("ang_filonote",[]);
var winestate = false;
function note_maker(obj_title,obj_content){
		var note = {
			title: obj_title, 
			content: obj_content
		};
		return note;
}
app.controller("principal",($scope)=>{
	
	//functions
	function add() {
		fun_title = $scope.str_title;
		fun_content = $scope.str_content;
		if (fun_content != "" || fun_title == ""){
			now_note = note_maker(fun_title,fun_content)
			$scope.stack_notes.push(now_note);
			localStorage.setItem("notes",JSON.stringify($scope.stack_notes));
		}

		$("#menu_title").val("")
		$("#menu_content").val("")
		$(".message").css("display","none");
		$("#añadir").text("añadir");
		$("#añadir").css("z-index","1");
		$("body").css("overflow","auto");
		$("#añadir").css("top","auto");
		$("#añadir").css("position","relative");
		$(".apto").removeClass("NYB1");
		$(".apto").removeClass("NYB2");
		winestate = false;
	}
	function mostrar(){
		if (winestate){
			$("body").css("overflow","auto");
			$("#añadir").css("top","auto");
			$("#añadir").text("añadir");
			$("#añadir").css("z-index","1");	
			$("#añadir").css("position","relative");
			$(".apto").removeClass("NYB1");
			$(".apto").removeClass("NYB2");				
			$(".message").css("display","none");

		}else{
			$(".apto").addClass("NYB1");
			$(".apto").addClass("NYB2");
			$("#añadir").css("top","10%");
			$(".message").css("display","auto");
			$("body").css("overflow","hidden")
			$("#añadir").text("cerrar");
			$("#añadir").css("position","fixed");
			$("#añadir").css("z-index","1000");
			$(".message").css("display","block");
		}
		winestate = !winestate;
	}
	function eliminar(fun_id){
		$("#note_" + fun_id).animate({width:"0%",height:"0%"},{duration:500,complete:()=>{
			
			//$("#container_"+fun_id).remove();
			$scope.stack_notes.splice(fun_id,1);
			$scope.$apply();
			localStorage.setItem("notes",JSON.stringify($scope.stack_notes));
		}});

}
                                
	$scope.add = add;	
	$scope.mostrar = mostrar;
	$scope.eliminar = eliminar;	
	$scope.stack_notes = [];
	$scope.title = "FILONOTE";
	$scope.$watch("stack_notes",(newVal)=>{
		console.log("lista cambiada");
		$scope.stack_notes = newVal;
		$scope.$apply();
		localStorage.setItem("notes",JSON.stringify($scope.stack_notes));
	});

	var init = function(){
		let saved = localStorage.getItem("notes");
		if (saved == null){
			let nota1 = note_maker("Bienvenido","Bienvenido a filonote la webapp de notas offline")
			let nota2 = note_maker("Empezemos","prueba a eliminar estas notas o crear una nueva con el boton añadir")
			$scope.stack_notes.push(nota1);
			$scope.stack_notes.push(nota2);
		}else{
			$scope.stack_notes = JSON.parse(saved);
		}
	}
	init();
	
});
