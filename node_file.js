const http=require('http');
const fs=require('fs');
const port=3000;
let data;
function readAndServe(path){
    return fs.readFileSync(path,"utf-8");
}

const server=http.createServer((req,res)=>{
    let url=req.url;
    let method=req.method;

    if(url==="/" && method==="GET"){
        data=readAndServe("./index.html");
        res.end(data);
    }else if(url==="/API.html" && method==="GET"){
        data=readAndServe("./API.html");
        res.end(data);
    }else if(url==="/to_do_list.html" && method==="GET"){
        data=readAndServe("./to_do_list.html");
        res.end(data);
    }else if(url==="/stopwatch.html" && method==="GET"){
        data=readAndServe("./stopwatch.html");
        res.end(data);
    }else if(url==="/Pomodoro.html" && method==="GET"){
        data=readAndServe("./Pomodoro.html");
        res.end(data);
    }else{
        data=readAndServe("./index.html");
        res.end(data);
    }
});

server.listen(port,()=>{
    console.log(`port no: ${port}`);
});
