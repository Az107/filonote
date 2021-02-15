

function getToken(user,pass){
    let status = false;
    let data = {user,pass};
    let uri = (document.getElementById("newAccount").checked ?  "./api/createUser" : "./api/login" )
	fetch(uri,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}}).then((res)=>{

            if (res.status == 200){
                res.text().then((resText) =>{
                    console.log(resText);
                    let userOb = {
                        Name: user,
                        Token: resText
                    }
                    localStorage.setItem("user",JSON.stringify(userOb));
                    location.replace("/")
                    status = true;
                });

            }else{
                
                document.getElementById("password").value = "";
                alert("Invalid credentials");
            }
	});
    return status;
}

function login(){
    console.log("trying to login...")
    let hash = document.getElementById("password").value;
    let status = getToken(document.getElementById("username").value,hash);

}


