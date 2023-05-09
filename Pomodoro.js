let count_down=document.getElementById("count_down");
let s_time=document.getElementById("s_time");
let b_time=document.getElementById("b_time");
let session_break=document.getElementById("session_break");
let s_minus=document.getElementById("s_minus");
let s_plus=document.getElementById("s_plus");
let b_minus=document.getElementById("b_minus");
let b_plus=document.getElementById("b_plus");
let start=document.getElementById("start");
let reset=document.getElementById("reset");
let pro1=document.getElementById("pro1");
let pro2=document.getElementById("pro2");

let i=1,id,s_count=1,flag=1;
let ss=0,mm=20,bb=5,orig_mm=20,orig_bb=5;

start.addEventListener("click",start_pause);

reset.addEventListener("click",function(){
    s_minus.disabled=false;
    b_minus.disabled=false;
    s_plus.disabled=false;
    b_plus.disabled=false;
    mm=20,bb=5,ss=0,s_count=1;
    clearInterval(id);
    s_time.innerHTML=mm;
    count_down.innerHTML=mm+":00";
    start.value="Start ";
    count_down.style.color="#31bdd6";
    session_break.innerHTML="Session 1";

});

s_minus.addEventListener("click",function(){
    parseInt(--mm);
    if(mm<=0)mm=1;
     if(mm<10)mm='0'+mm;
    s_time.innerHTML=mm;
    count_down.innerHTML=mm+":00";
    orig_mm=mm;
});

s_plus.addEventListener("click",function(){
    parseInt(++mm);
    if(mm<10)mm='0'+mm;
    s_time.innerHTML=mm;
    count_down.innerHTML=mm+":00";
    orig_mm=mm;
});
b_minus.addEventListener("click",function(){
    bb--;
    if(bb<=0)bb=1;
    b_time.innerHTML=bb;
    orig_bb=bb;
});
b_plus.addEventListener("click",function(){
    bb++;
    b_time.innerHTML=bb;
    orig_bb=bb;
});

function start_pause(){
    if(i==1){
        start.value="Pause";
        s_minus.disabled=true;
        b_minus.disabled=true;
        s_plus.disabled=true;
        b_plus.disabled=true;
        i=0;

         id=setInterval(function(){
            
            if(ss<0){--mm,ss=59;}
            if(mm==0&&ss==0&&flag==1){
                mm=orig_bb;
                session_break.innerHTML="Break!";
                count_down.style.color="#F74B00";
                flag=0;
            }else if(mm==0&&ss==0&&flag==0){
                mm=orig_mm;
                s_count++;
                session_break.innerHTML=`Session ${s_count}`;
                count_down.style.color="#31bdd6";
                flag=1;
            }
            ss=parseInt(ss);
            mm=parseInt(mm);

            if(mm<10)mm='0'+mm;
            if(ss<10)ss='0'+ss;
            count_down.innerText=mm+":"+ss;
            ss--;
        },100);

    }
    else{
        start.value="Start ";
        s_minus.disabled=true;
        b_minus.disabled=true;
        s_plus.disabled=true;
        b_plus.disabled=true;
        i=1;
        clearInterval(id);
        
    }
}
