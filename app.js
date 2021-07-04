// define  Ui Vars
const form= document.querySelector("#task-form");
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners()
{
    //dom load event
    document.addEventListener('DOMContentLoaded',getTasks);

    // add task event
    form.addEventListener('submit',addTask);
    //remove task event
    tasklist.addEventListener('click',removeTask);
    // claer task event
    clearBtn.addEventListener('click',clearTasks);
    //filter task events
    filter.addEventListener('keyup',filterTasks);
    
}

   function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }  
    tasks.forEach(function(task){
      // ctreate li element
 const li =document.createElement('li');
 // add class
 li.className='collection-item';
 //create text note and append to li
 li.appendChild(document.createTextNode(task));
 //create a new link element
 const link =document.createElement('a');
 //add class
 link.className='delete-item secondary-content';
 // add icon html
 link.innerHTML='<i class="fa fa-remove"></i>';
 //append link to the li
 li.appendChild(link);
 //append li to ul

 tasklist.appendChild(li);  
    }) 
   }
 function addTask(e){
 if(taskInput.value === " "){
  alert("add Task");
 }
 // ctreate li element
 const li =document.createElement('li');
 // add class
 li.className='collection-item';
 //create text note and append to li
 li.appendChild(document.createTextNode(taskInput.value));
 //create a new link element
 const link =document.createElement('a');
 //add class
 link.className='delete-item secondary-content';
 // add icon html
 link.innerHTML='<i class="fa fa-remove"></i>';
 //append link to the li
 li.appendChild(link);
 //append li to ul

 tasklist.appendChild(li);
 // sotre task in ls
 storeTaskInLocalStorege(taskInput.value);
 //clear task input
 taskInput.value=" ";
e.preventDefault();
}

function storeTaskInLocalStorege(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item'))
 {
     console.log(e.target);
 if (confirm('Are you sure')){
     e.target.parentElement.parentElement.remove();
 }

 //reomove from ls
 removeTaskFromLoacalStorage
 (e.target.parentElement.parentElement);
}

}

function removeTaskFromLoacalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
tasks.forEach(function(task){
    if(taskItem.textContent === task){
        tasks.splice(index,1);
    }
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(e){
tasklist.innerHTML = '';
cleartaskFromLoacalStorage();
}

function cleartaskFromLoacalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    console.log(text);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';

        }
    });

}