async function  getTemplate(name){

}



function render(template, data) {
    templateRaw = fetch(template).then(res => res.text()).then(text => {
        let template = Handlebars.compile(text);
        
        document.getElementById("card-zone").innerHTML = template(data);
    })
    
}

function onLoad(){
    render("Templates/note.hbs",{title:"titulo",content:"hola"});
}