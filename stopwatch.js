let start=document.getElementById("start");
let lap=document.getElementById("lap");
let time=document.getElementById("time");
let lap_list=document.getElementById("lap_list");
let lap_cont=document.getElementById("lap_cont");

lap_cont
let i=1,id,lap_count=0;
let mm=0,hh=0,ss=0,milli=0;

start.addEventListener("click",start_stop);
lap.addEventListener("click",lap_reset);
start.style.border="5px double black";
lap.style.border="5px double black";
function start_stop(){
    if(i==1){
        start.value="Stop";
        lap.value="Lap";
        start.style.backgroundColor="#66131a";
        lap.style.padding="25px";
        start.style.color="#fa0519";
        i=0;
         id=setInterval(function(){
            
            if(milli==100){++ss,milli=0;}
            if(ss==60){++mm,ss=0;}
            if(mm==60){++hh,mm=0;}

            ss=parseInt(ss);
            mm=parseInt(mm);
            hh=parseInt(hh);
            milli=parseInt(milli);

            if(hh<10)hh='0'+hh;
            if(mm<10)mm='0'+mm;
            if(ss<10)ss='0'+ss;
            if(milli<10)milli='0'+milli;
            time.innerText=hh+":"+mm+":"+ss+":"+milli;
            milli++;
        },10);

    }
    else{
        start.value="Start";
        lap.value="Reset";
        lap.style.textAlign="center";
        lap.style.padding="18px";
        start.style.backgroundColor="#878f99";
        start.style.color="#fff";
        
        i=1;
        clearInterval(id);
        
    }
       
}

function lap_reset(){

    if(lap.value=="Lap" && i==0){
        lap_count++;
        lap_cont.innerHTML+= `<hr>
                            <div class="col-12 col-md-12 d-flex justify-content-around">
                            <p>Lap ${lap_count}</p>
                            <p>${hh}:${mm}:${ss}:${milli}</p>
                            </div>`;
    }
    else if(lap.value=="Reset" && i==1){
        lap.value="Lap";
        lap.style.padding="25px";
        hh=0,mm=0,ss=0,milli=0,lap_count=0;
        time.innerHTML="00:00:00:00";
        lap_cont.innerHTML="";
        clearInterval(id);
    }
}

