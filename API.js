let compile=document.getElementById("compile");
let language=document.getElementById("language");
let code=document.getElementById("code");
let output=document.getElementById("output");
let url="https://codequotient.com/api/executeCode";
let r_url="https://codequotient.com/api/codeResult/";
let obj,data,i;

language.addEventListener("change",function(){
    output.innerText="OUTPUT:";
});

compile.addEventListener("click",function(){
    obj={
        "code":code.value,
        langId:language.value
    }
    send_request();
});

function send_request(){
    let request = new XMLHttpRequest();
    request.open("POST",url); 
    request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
    let id=JSON.parse(request.responseText);
    console.log(request.responseText);
    
    fetch_result(id)
    });
}       

function fetch_result(id){
      i= setInterval(function(){
            let request1 = new XMLHttpRequest();
            request1.open("GET",r_url+id.codeId); 
            request1.send();
            request1.addEventListener("load",function(){
            console.log(request1.responseText)
            data=JSON.parse(request1.responseText);
            data =JSON.parse(data.data);
            if(data.status!="Pending"){
                clearInterval(i);
                print_result(data);
            }
        });
        },1000);
   
}

function print_result(data){
    if(data.errors!="")
        output.innerText=data.errors;
    else
        output.innerText=data.output;
}
