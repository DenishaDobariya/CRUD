let name =document.getElementById('name');
let email =document.getElementById('email');
let contact =document.getElementById('contact');
let std =document.getElementById('std');
let roll =document.getElementById('roll');
let pr =document.getElementById('pr');
let select =document.getElementById('select');


let isEdit=false;

let addStudents =[];

const createStudents = () =>{
    event.preventDefault();

    if(!isEdit){
    let students = {
        'name' :name.value,
        'email' :email.value,
        'contact' : contact.value,
        'std' :std.value,
        'roll' :roll.value,
        'pr' :pr.value,
        'id' : addStudents.length>0 ? addStudents[addStudents.length-1].id+1  : 1 
    };

    // // get students
    var getStudents =JSON.parse (localStorage.getItem('students')) ?? [];
    // console.log(getStudents);

    // setItem
    addStudents.push(students);
    localStorage.setItem('students',JSON.stringify(addStudents));
    // console.log(addStudents);

    name.value = '';
    email.value = '';
    contact.value = '';
    std.value = '';
    roll.value = '';
    pr.value = '';

    viewStudents();
}
else {
    let index = addStudents.findIndex(student => student.id === isEdit);
    addStudents[index] = {
        'name': name.value,
        'email': email.value,
        'contact': contact.value,
        'std': std.value,
        'roll': roll.value,
        'pr': pr.value,
        'id': isEdit
    };
    localStorage.setItem('students', JSON.stringify(addStudents));
    isEdit = false;
    viewStudents();
} 
    
}

addStudents = JSON.parse (localStorage.getItem('students')) ?? [];


const viewStudents = () =>{
    if(addStudents.length > 0){
        dataview.innerHTML = '';
        addStudents.forEach(data =>{
            dataview.innerHTML += `<div class="px-2 col-3">
            <div class="card bg-warning-subtle text-black p-2">
                <span>Name : ${data.name} </span>
                <span>Email : ${data.email} </span>
                <span>Contact no. : ${data.contact} </span>
                <span>Standard : ${data.std} </span>
                <span>Roll no. : ${data.roll} </span>
                <span>Persantage : ${data.pr} </span>
                <span>Id : ${data.id} </span>
                <span class="py-2">
                    <button class='btn btn-primary py-1 px-3' onclick='editStudents(${data.id})'>Edit</button>
                    <button class='btn btn-primary  py-1 px-3' onclick='dltStudents(${data.id})'>Delete</button>
                    <button class='btn btn-primary  py-1 px-3' onclick='selectStudents(${data.id})'>Select</button>
                </span>
            </div>
        </div>`
        });
    }
    else{
        dataview.innerHTML = `<p class="text-danger">No data Found...</p>`;
    }
}


const editStudents = (id) =>{
    const student = addStudents.find(student => student.id === id);
    let singleData = addStudents[0];
    // console.log(singleData);

    if(student){
        name.value = student.name;
        email.value = student.email;
        contact.value = student.contact;
        std.value = student.std;
        roll.value = student.roll;
        pr.value = student.pr;
    }
    isEdit = id;
}

const dltStudents = (id) => {
    addStudents = addStudents.filter(student => student.id !== id);
    localStorage.setItem('students',JSON.stringify(addStudents));
    viewStudents();
    deselectStudents(id); 
}

const deselectStudents = (id) => {
    let selectedStudents = JSON.parse(localStorage.getItem('selectData')) ?? [];
    selectedStudents = selectedStudents.filter(student => student.id !== id);
    localStorage.setItem('selectData', JSON.stringify(selectedStudents));

    count--;
    if (count < 0) {
        count = 0; 
    }
    select.innerHTML = `${count}+`;
    localStorage.setItem('select', JSON.stringify(count));
}

let count= 0;
const selectStudents = (id) =>{
    let selectStudents = JSON.parse(localStorage.getItem('selectData')) ?? [];
    let selectData= addStudents.find(student=>student.id === id);

    if(selectData){
        selectStudents.push(selectData);
        localStorage.setItem('selectData',JSON.stringify(selectStudents));

        count++;
        select.innerHTML = `${count}+`;
        localStorage.setItem('select',JSON.stringify(count));
    }else {
        console.log(`No student found with ID: ${id}`);
    }
}

window.onload = function() {
    let count = JSON.parse(localStorage.getItem('select')) ?? 0;
    let select = document.getElementById('select');

    if (select) {
        select.innerHTML = `${count}+`;
    } else {
        console.log('Element with ID "select" not found');
    }
};

const displayNames = () => {
    let selectStudents = JSON.parse(localStorage.getItem('selectData')) ?? [];
    let selectList = document.getElementById('selectList');

    if (selectList) {
        selectList.innerHTML = ''; 
        selectStudents.forEach(student => {
            selectList.innerHTML += `<p>${student.name}</p>`; 
        });
    } else {
        console.log('Element with ID "selectList" not found');
    }
    selectList.innerHTML += " ";
};


viewStudents()