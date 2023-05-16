
let que_list=document.getElementById("que_list");
let search=document.getElementById("search");
let id=0,data=[],key_no,chk=true;
let question,title,ele,r_id=0;

//loading data from localstorage and display it
data = localStorage.getItem("discussion");
data = JSON.parse(data);

data = (data) ? data : [];

sort_question();

//display the questions
function sort_question(){
    fav_list.innerHTML="";
    que_list.innerHTML="";
    //sort the data
    data.sort(function(a,b){
        return (b.up-b.down)-(a.up-a.down);
    });

    for (let x = 0; x<data.length; x++) {
    key_no=data[x].q_id;

    if(id<key_no) 
        id=key_no;

    fav_list.innerHTML+=`${(data[x].fav)?`<div id="d1${key_no}" class="div1"><a href="resolve.html" target="frame1" onclick="show_resolve_page(${key_no})"><h2 id="${key_no}">${data[x].sub}</h2>
                          <p id="p${key_no}">${data[x].que}</p></a>
                          <span><i class="fa-solid fa-heart ${(data[x].fav)?"text-danger":"text-secondary"}" onclick="heart(${key_no})" id="h${key_no}"></i> </span><span class="mx-5 date"></span>
                          <span class="d-flex-inline float-right"><i class="fa-regular fa-thumbs-up" onclick="thumbup(${key_no})"><small id="tu${key_no}">${data[x].up}</small></i>
                          <i class="fa-regular fa-thumbs-down mx-4" onclick="thumbdown(${key_no})"><small id="td${key_no}">${data[x].down}</small></i></span>
                          <hr></div>`:""}`;   
    
    que_list.innerHTML+=`${(!data[x].fav)?`<div id="d1${key_no}" class="div1"><a href="resolve.html" target="frame1" onclick="show_resolve_page(${key_no})"><h2 id="${key_no}">${data[x].sub}</h2>
                          <p id="p${key_no}">${data[x].que}</p></a>
                          <span><i class="fa-solid fa-heart ${(data[x].fav)?"text-danger":"text-secondary"}" onclick="heart(${key_no})" id="h${key_no}"></i></span><span class="mx-5 date"></span>
                          <span class="d-flex-inline float-right"><i class="fa-regular fa-thumbs-up" onclick="thumbup(${key_no})"><small id="tu${key_no}">${data[x].up}</small></i>
                          <i class="fa-regular fa-thumbs-down mx-4" onclick="thumbdown(${key_no})"><small id="td${key_no}">${data[x].down}</small></i></span>
                          <hr></div>`:""}`;               
  }

}

//display time of question posted
let result,interval_id;
function show_time(){
 interval_id=setInterval(function () {
                 let temp_data = localStorage.getItem("discussion");
                    temp_data = JSON.parse(temp_data);
                    let time_span = document.querySelectorAll(".date");
                    let a=-1;
                    time_span.forEach(function (s) {
                        ++a;
                        let dt=temp_data[a].date_time;
                        let curr = new Date();
                        dt = new Date(dt);

                        let t_post = Math.abs(curr.getTime() - dt.getTime());

                        if(t_post<60000){
                            result= parseInt(t_post / 1000) + " sec ago";
                        }else if(t_post<3600000){
                            t_post = parseInt(t_post / 60000);
                            result= t_post += (t_post == 1) ? " min ago" : " mins ago";
                        }else if(t_post<86400000){
                            t_post = parseInt(t_post / 3600000);
                            result= t_post += (t_post == 1) ? " hour ago" : " hours ago";
                        }else if(t_post<31536000000){
                            t_post = parseInt(t_post / 86400000);
                            result= t_post += (t_post == 1) ? " day ago" : " days ago";
                        }else{
                            t_post = parseInt(t_post / 31536000000);
                            result= t_post += (t_post == 1) ? " year ago" : " years ago";
                        }
                        s.innerText = result;
                    });

}, 1000);
}
show_time();

//when responce form is load 
function show_resolve_page(qid){
    chk=false;
    ele=data.find(x => x.q_id == qid);
    title=ele.sub;
    question=ele.que;
}

//favourite button
function heart(id){
    let h=document.getElementById("h"+id);
    let indx=data.findIndex(x=>x.q_id==id);
    if(h.classList.contains("text-danger")){
        h.classList.remove("text-danger");
        h.classList.add("text-secondary");
        data[indx].fav=false;
    }else{
        h.classList.remove("text-secondary");
        h.classList.add("text-danger");
        data[indx].fav=true;
    }
    localStorage.setItem("discussion",JSON.stringify(data));
        
    sort_question();
}

//thumbup for question
function thumbup(id){
    let tu=document.getElementById("tu"+id);
    let indx=data.findIndex(x=>x.q_id==id);
    tu.innerText=++data[indx].up;
    localStorage.setItem("discussion",JSON.stringify(data));
    sort_question();
}

//thumbdown for question
function thumbdown(id){
    let td=document.getElementById("td"+id);
    let indx=data.findIndex(x=>x.q_id==id);
    td.innerText=++data[indx].down;
    localStorage.setItem("discussion",JSON.stringify(data));
    sort_question();
}

//search function
search.addEventListener("input",function(){
    let text_search=this.value;
    let all_div=document.querySelectorAll(".div1");
    let no_match = document.querySelector("#no_match");
    let checker = 0;

        all_div.forEach(function(d){
            let h2 = d.querySelector("h2");
            h2.innerHTML = h2.innerHTML.replace('<span class="bg-warning">', "");
            h2.innerHTML = h2.innerHTML.replace('</span>', "");

            let p = d.querySelector("p");
            p.innerHTML = p.innerHTML.replace('<span class="bg-warning">', "");
            p.innerHTML = p.innerHTML.replace('</span>', "");

            let match_h2 = h2.innerText.match(text_search);
            let match_p = p.innerText.match(text_search);

        if (match_h2 || match_p) {

            if (d.classList.contains("d-none")) {
                d.classList.remove("d-none");
            }

            if (match_h2) {
                h2.innerHTML = h2.innerHTML.replace(text_search, `<span class="bg-warning">${text_search}</span>`);
            }
            if (match_p) {
                p.innerHTML = p.innerHTML.replace(text_search, `<span class="bg-warning">${text_search}</span>`);
            }
            checker++;
        }
        else {
            d.classList.add("d-none");
        }

        if(text_search==""){
            h2.innerHTML = h2.innerHTML.replace( `<span class="bg-warning">${text_search}</span>`,"");
            p.innerHTML.replace(`<span class="bg-warning">${text_search}</span>`,"");
            p.innerHTML = p.innerHTML.replace(`<span class="bg-warning">${text_search}</span>`,"");
        }

        });

        if (checker == 0) {
            no_match.classList.add("text-danger");
            no_match.innerText = "No match found!!";
        }
        else {
            no_match.classList.remove("text-danger");
            no_match.innerText = "";
        }
});


function access(){
    let fr=document.getElementById("frame");
    let frame=document.getElementById("frame").contentWindow.document;
    if(chk){
    let subject=frame.getElementById("subject");
    let ques_textarea=frame.getElementById("ques_textarea");
    let q_btn=frame.getElementById("q_btn");
     
    //submit the question
    q_btn.addEventListener("click",function(){
        
        title=subject.value.trim();
        question=ques_textarea.value.trim();

        if(question!=""&&title!=""){
            
            let current_date=new Date();
            ++id;
            data.push({q_id:id,sub:title,que:question,resolve:[],fav:0,up:0,down:0,date_time:current_date});
            localStorage.setItem("discussion",JSON.stringify(data));
            que_list.innerHTML+=`<div id="d1${id}" class="div1"><a href="resolve.html" target="frame1" onclick="show_resolve_page(${id})"><h2 id="${id}">${title}</h2>
                          <p id="p${id}">${question}</p></a>
                          <span><i class="fa-solid fa-heart text-secondary" onclick="heart(${id})" id="h${id}"></i></span><span class="mx-5 date">0 sec ago</span>
                          <span class="d-flex-inline float-right"><i class="fa-regular fa-thumbs-up" onclick="thumbup(${id})"><small id="tu${id}">0</small></i>
                          <i class="fa-regular fa-thumbs-down mx-4" onclick="thumbdown(${id})"><small id="td${id}">0</small></i></span>
                          <hr></div>`; 
            subject.value="";
            ques_textarea.value="";

        }
    })
    }
    else{
       //responce form
        let prev_que=frame.getElementById("prev_que");
        let name=frame.getElementById("name");
        let resolve_textarea=frame.getElementById("resolve_textarea");
        let r_btn=frame.getElementById("r_btn");
        let remove_q=frame.getElementById("remove");
        let name_sol=frame.getElementById("name_sol");
        let u_name,u_ans;

        r_id=0;
        prev_que.innerHTML=`<h4>${title}</h4>
                            <p>${question}</p>`;

        //display the previous solution list
        ele.resolve.sort(function(a,b){
            return (b.up-b.down)-(a.up-a.down);
        });

        for (let x = 0; x<ele.resolve.length; x++) {
            key_no=ele.resolve[x].id;
            if(r_id<key_no) 
                r_id=key_no;
            name_sol.innerHTML+=`<div class="col-12 col-md-12">
                                 <h5>${ele.resolve[x].name}</h5>
                                 </div>
                                 <div class="col-12 col-md-12">
                                 <p>${ele.resolve[x].answer}
                                 
                                 <span class="d-flex-inline float-right">
                                 <i class="fa-regular fa-thumbs-up" onclick="thumbup1(${key_no},${ele.q_id})"><small id="tu1${key_no}">${ele.resolve[x].up}</small></i>
                                 <i class="fa-regular fa-thumbs-down mx-4" onclick="thumbdown1(${key_no},${ele.q_id})"><small id="td1${key_no}">${ele.resolve[x].down}</small></i>
                                </span></p></div>`;                    
        }

        //submit the solution
        r_btn.addEventListener("click",function(){
        
        u_name=name.value.trim();
        u_ans=resolve_textarea.value.trim();

        if(u_name!=""&&u_ans!=""){
            ++r_id;
            
            name_sol.innerHTML+=`<div class="col-12 col-md-12">
                                <h5>${u_name}</h5>
                                </div>
                                <div class="col-12 col-md-12">
                                <p>${u_ans}<span class="d-flex-inline float-right">
                                <i class="fa-regular fa-thumbs-up" onclick="thumbup1(${r_id},${ele.q_id})"><small id="tu1${r_id}">0</small></i>
                                <i class="fa-regular fa-thumbs-down mx-4" onclick="thumbdown1(${r_id},${ele.q_id})"><small id="td1${r_id}">0</small></i>
                               </span></p></div>`;
           ele.resolve.push({id:r_id,name:u_name,answer:u_ans,up:0,down:0});
           localStorage.setItem("discussion",JSON.stringify(data));
            name.value="";
            resolve_textarea.value="";
        }
    });
    
    

    //remove the question from the list
    remove_q.addEventListener("click",function(){
        if(ele.resolve.length!=0){
        let col_id=document.getElementById("d1"+ele.q_id);
        col_id.remove();
        let idx=data.findIndex(x => x.q_id == ele.q_id);
        data.splice(idx,1);
        localStorage.setItem("discussion",JSON.stringify(data));
        fr.src="question.html";
        } 
    });

    chk=true;
    }

}

