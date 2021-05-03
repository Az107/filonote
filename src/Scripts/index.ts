import * as Handlebars from 'handlebars';
import { Note } from './lib/Notes';

var notes : Note[] = [new Note("test","hello")];

var apiState :boolean = false;

async function  checkApi() : Promise<boolean> {
    let res = await fetch("./api/check");
    if (res.ok){
        let result = await res.text();
        console.log(result);
        return true;
    }else{
        console.log("❌ api unreachable");
        return false;
    }
}

async function  getTemplate(name : string) : Promise<HandlebarsTemplateDelegate<any>> {
    let res = await fetch(name);
    let templateText = await res.text();
    let template : HandlebarsTemplateDelegate<any> = Handlebars.compile(templateText)
    return template;
}

async function renderNotes() {
    const templateName = "Templates/note.hbs";
    let template = await getTemplate(templateName);
    notes.forEach(note => {
        document.getElementById("card-zone")!.innerHTML += template(note);        
    });
    
}

async function onLoad(){
    renderNotes();
    apiState = await checkApi();
    
}

onLoad();