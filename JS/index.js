let nameinput=document.getElementById("name");
let priceinput=document.getElementById("price");
let taxinput=document.getElementById("taxes");
let adsinput=document.getElementById("ads");
let discinput=document.getElementById("disc");
let alltotal=document.getElementById("total");
let countcinput=document.getElementById("count");
let categinput=document.getElementById("categ");
let searchinput=document.getElementById("search");
let creat =document.getElementById("creat");
 let mood ="create";
 let indexGlo = '';
let addData ;
if(localStorage.getItem("list") ==null){
     addData =[];
}
else{

     addData =JSON.parse(localStorage.getItem("list")) 
}

//total

function getTotal(){

if(priceinput.value !=''){

    let result = (+priceinput.value + +taxinput.value + + adsinput.value)-+discinput.value
 alltotal.innerHTML=result;

}else{
    alltotal.innerHTML='';
    
}

}
// creat 


    creat.onclick = function(){
        let adds={
            name:nameinput.value.toLowerCase(),
            price:priceinput.value,
            taxes:taxinput.value,
            adds:adsinput.value,
            discount:discinput.value,
            total:alltotal.innerHTML,
            count:countcinput.value,
            categry:categinput.value.toLowerCase(),
        
        }
       
       
        if(nameinput.value!=''&&priceinput.value!=''){
       
       if(mood==="create"){
        if(adds.count > 1){
            for(let i=0;i<adds.count;i++){
                addData.push(adds);
            }
        }else{
            addData.push(adds);
        }
       }else{

        addData[indexGlo]=adds;
        mood="create";
        creat.innerHTML="create"
        countcinput.style.display='block'
       }
   
        
        localStorage.setItem("list",JSON.stringify(addData))
        console.log(addData)
        showData()
        clearFor()
        }
}

//clear

function clearFor(){
    nameinput.value ='',
    priceinput.value ='',
    taxinput.value ='',
    adsinput.value ='',
    discinput.value ='',
    alltotal.innerHTML='Total',
    countcinput.value ='',
    categinput.value =''
}
//  read
function showData(){

let table ='';
for(let i=0;i<addData.length;i++){

table +=`
<tr>
<td> ${[i+1]}</td>
<td>${addData[i].name} </td>
<td>${addData[i].price} </td>
<td>${addData[i].taxes} </td>
<td>${addData[i].adds} </td>
<td>${addData[i].discount} </td>
<td>${addData[i].total} </td>
<td>${addData[i].categry} </td>
<td> <button onclick="updateData(${i})" id="update" >Update</button></td>
<td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>
</tr>
`
}
document.getElementById("teData").innerHTML = table
  


}
// delete
function deleteData(i){
 
    addData.splice(i,1)
    localStorage.list = JSON.stringify(addData);
    showData()
}

// update

function updateData(i){

    nameinput.value =addData[i].name,
    priceinput.value =addData[i].price,
    taxinput.value =addData[i].taxes,
    adsinput.value =addData[i].adds,
    discinput.value =addData[i].discount,
    getTotal()
    countcinput.style.display='none'
    categinput.value =addData[i].categry,
    creat.innerHTML = 'Update'
   mood ="update"
   indexGlo =i;
    
}


// search

let srcMood = "name";
function searchFun(id){
    searchinput.focus()
if(id=='searchName'){
srcMood = "name";
 searchinput.placeholder="Search By Name"
}else{

    srcMood = "category";
    searchinput.placeholder="Search By Category"

}
searchinput.focus();


}

function searchData(value){

   let table ='';
    if(srcMood == "name"){  
for( let i=0;i<addData.length;i++){
if(addData[i].name.includes(value.toLowerCase())){
    table +=`
    <tr>
    <td> ${[i]}</td>
    <td>${addData[i].name} </td>
    <td>${addData[i].price} </td>
    <td>${addData[i].taxes} </td>
    <td>${addData[i].adds} </td>
    <td>${addData[i].discount} </td>
    <td>${addData[i].total} </td>
    <td>${addData[i].categry} </td>
    <td> <button onclick="updateData(${i})" id="update" >Update</button></td>
    <td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `
    }
}
        }else{
            for( let i=0;i<addData.length;i++){

                if(addData[i].categry.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                    <td> ${[i]}</td>
                    <td>${addData[i].name} </td>
                    <td>${addData[i].price} </td>
                    <td>${addData[i].taxes} </td>
                    <td>${addData[i].adds} </td>
                    <td>${addData[i].discount} </td>
                    <td>${addData[i].total} </td>
                    <td>${addData[i].categry} </td>
                    <td> <button onclick="updateData(${i})" id="update" >Update</button></td>
                    <td> <button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                    }
                }
        }



        document.getElementById("teData").innerHTML = table
    }

