
        let txt_area=document.getElementById("txtarea");
        let task_list=document.getElementById("add_task");
        let task,i=0,key_no,data,ele;
        txt_area.addEventListener("keyup",press_enter);
        task = localStorage.getItem("to_do_list");
        task = JSON.parse(task);

        for (let x = 0; x<task.length; x++) {
            key_no=task[x].id;

            if(i<Number(key_no)) 
                i=key_no;
            
            task_list.innerHTML+=`<div class='col-12 col-md-12' id='col${key_no}'>
                                 <input type='text' style='border:none' id='p${key_no}' value='${task[x].task_list}' disabled>
                                 <i class='fa fa-xmark position-relative float-right mr-5' onclick='delet_task(${key_no})'></i>
                                 <i class='fa fa-pencil position-relative float-right mr-5' onclick='edit(${key_no})'></i>
                                 <input type='checkbox' onclick='complete(${i})' class='form-check-input position-relative float-right mr-5' id='${key_no}'></div>`;                    
            }
            chk();

        function chk(){
            for (let x = 0; x<task.length; x++) {
                key_no=task[x].id;
                if(task[x].checked){
                    let inp=document.getElementById(key_no);
                    inp.checked=true;
                    document.getElementById('p'+key_no).style.textDecoration="line-through";
                    console.log(inp)
                }
            }
        }

        function press_enter(event){
            if(event.keyCode==13){
                data=txt_area.value.trim();
                if(data!='')
                {
                    ++i;
                    task.push({id:i,task_list:data,checked:false});
                    localStorage.setItem("to_do_list",JSON.stringify(task));
                    task_list.innerHTML+=`<div class='col-12 col-md-12' id='col${i}'>
                    <input type='text' style='border:none' id='p${i}' value='${data}' disabled>
                    <i class='fa fa-xmark position-relative float-right mr-5' onclick='delet_task(${i})'></i>
                    <i class='fa fa-pencil position-relative float-right mr-5' onclick='edit(${i})'></i>
                    <input type='checkbox' onclick='complete(${i})' class='form-check-input position-relative float-right mr-5' id='${i}'></div>`;
                }

                txt_area.value='';
            }
            chk();
        }

        function complete(id){
            let p_id=document.getElementById('p'+id);
            let c_id=document.getElementById(id);
                ele=task.find(x => x.id == id);
            
            if(c_id.checked){
                p_id.style.textDecoration="line-through";
                ele.checked=true;
            }
            else{
                p_id.style.textDecoration="none";
                ele.checked=false;
            }
            localStorage.setItem("to_do_list",JSON.stringify(task));
        }

        function edit(id){
            let edit_id = document.getElementById('p'+id);
            let val;
                ele=task.find(x => x.id == id);

            if (edit_id.disabled) {
                edit_id.disabled = false;
            }
            else {
                edit_id.disabled = true;
                val=edit_id.value.trim();
                if(val!=''){
                    ele.task_list=val;
                    localStorage.setItem("to_do_list",JSON.stringify(task));
                }else
                    edit_id.value=ele.task_list;
                
            }
        }

        function delet_task(id){
            let col_id=document.getElementById('col'+id);
                col_id.remove();
                ele=task.findIndex(x => x.id == id);
                task.splice(ele,1);
                localStorage.setItem("to_do_list",JSON.stringify(task));
        }