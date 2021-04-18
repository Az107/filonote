console.log("welcome")

var template = Handlebars.compile(document.getElementById('note-template').innerHTML);
function render() {
    document.getElementById("card-zone").innerHTML = template({ doesWhat: "rocks!" });
    
}

function onLoad(){
    render();
}