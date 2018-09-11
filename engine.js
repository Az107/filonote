
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

		$scope.stack_notes.splice(fun_id,1);
}
                                
	$scope.add = add;	
	$scope.mostrar = mostrar;
	$scope.eliminar = eliminar;	
	$scope.stack_notes = [];
	$scope.title = "FILONOTE";
	$scope.$watch("stack_notes",(newVal)=>{
		$scope.stack_notes = newVal;
	});
	
});
