/*
	deprecated
*/


var winestate = false;

var exist_notes = []
var id = 0

function note_maker(obj_title,obj_content){
		var note = {
			id: id,
			title: obj_title,
			content: obj_content
		};
		id ++;
		return note;
}

function add(fun_title,fun_content) {
	if (fun_content != "" || fun_title == ""){
		now_note = note_maker(fun_title,fun_content)
		exist_notes.push(now_note);
		tarjeta = '<div>'
		tarjeta +=  '<div id="test" class="card">';
		tarjeta += '<a class="closebtn"  onmouseover="anim(this);" onmouseleave="desanim(this);" onclick="eliminar(this,'+ now_note.id+')")>X</a>';
		tarjeta += (fun_title == "" ? "": "<div class='title'>" + fun_title +"</div>");
		tarjeta += '<p class="content" ng-model="exist_notes">{{exist_notes['+now_note.id+'].content}}</p><br>';
		tarjeta += '</div></div>';
	}

	$("#menu_title").val("")
	$("#menu_content").val("")
	$("#dragin-space").append(tarjeta);
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

function eliminar(btn,fun_id){
	$(btn.parentElement).animate({width:"0%",height:"0%"},()=>{
	$(btn.parentElement.parentElement).remove();

	});

	exist_notes.forEach((item)=>{
		if (item.id == fun_id ){
			exist_notes.splice(item,1);

		}
	});
}
function recover(){
	var saved_notes = localStorage.getItem("notes")
	if (saved_notes != ""){

	}
}

function anim(btn){
	$(btn.parentElement).css("filter","grayscale(100%)")
	
	
}
function desanim(btn){	
	$(btn.parentElement).css("filter","none")
	
}