let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");

let  mood="create";
let temp;
//get total
function getTotal(){
    if(price.value != ""){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background="#040";
    }
    else{
        total.innerHTML= "";

        total.style.background="#a00d02";
    }
}
//create project

let dataPro="";
if(window.localStorage.getItem("products")){
    dataPro=JSON.parse(localStorage.products);
}
else{
    dataPro=[];
}



submit.onclick=function(){
    let  newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };

    if(title.value !="" &&price.value !=""&& category.value !="" ){
        if(mood ==="create"){
            if(count.value > 0){
                for(let i=0;i<count.value;i++){
                    dataPro.push(newPro);
                        
                    }
            }
            else{
                dataPro.push(newPro);
        
            }
        }
        else{
            dataPro[temp]=newPro;
            count.style.display="block";
            submit.innerHTML="Create";
            mood="create";
        }
    clearInput();

    }
    
    
    

    window.localStorage.setItem("products",JSON.stringify(dataPro));
    readdata(dataPro);
    shownBtN();
    



}

//save local storage
// clear input
function clearInput(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    count.value="";
    category.value="";
    total.innerHTML ="";

}
//read
let Read=document.getElementsByClassName("read")[0];
function readdata(dataPro)
{
    getTotal();
    Read.innerHTML ="";
    for(let i=0;i<dataPro.length;i++){

       Read.innerHTML +=`<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td> <a><button onclick="updateData(${i})" id="update">update</button></a></td>
                    <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
                </tr>`
                
}
}
readdata(dataPro);


// delete product


function deletepro(i){
    dataPro.splice(i,1);
    window.localStorage.setItem("products",JSON.stringify(dataPro));
    readdata(dataPro);
    shownBtN();
}

//delete all

let Clearall=document.getElementsByClassName("clearAll")[0];
function shownBtN(){
    if(dataPro.length > 0){
        Clearall.innerHTML ="";
    
        let d=document.createElement("button");
    d.innerHTML="Delete All";
    d.style.margin="20px 0";
    d.className="all";
    Clearall.appendChild(d);
    }
    else{
        Clearall.innerHTML ="";
    }
}

shownBtN();

document.addEventListener("click",function(e){
    if(e.target.className =="all"){
        localStorage.removeItem("products");
        dataPro =[];
        readdata(dataPro);
        shownBtN();
    
    }
});

//countv edit on function create

//update

function updateData(id){
    if(dataPro[id]){
        title.value= dataPro[id].title;
        price.value=dataPro[id].price;
        taxes.value=dataPro[id].taxes;
        ads.value=dataPro[id].ads;
        discount.value=dataPro[id].discount;
        total.innerHTML=dataPro[id].total;
        count.style.setProperty("display","none");
        category.value=dataPro[id].category;
        submit.innerHTML="Update";
        getTotal();
        
        mood="update";
        temp=id;
        
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        });
    }



}

//search


let searchMood= "title";
let search=document.getElementById("search");


function getSearchMood(id){
    if(id == 'search-title'){
            searchMood= "title";
            search.placeholder="Search By Title";
            


    }
    else{
            searchMood= "category";
            search.placeholder="Search By Category";


    }
    search.focus();
}

function searchData(value){
    if(searchMood ==="title"){
        Read.innerHTML ="";

        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.toLowerCase().includes(`${value.toLowerCase()}`)){
                Read.innerHTML +=`<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td> <a><button onclick="updateData(${i})" id="update">update</button></a></td>
                    <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
                </tr>`;
                
                    }
}



            }else{
                Read.innerHTML ="";
                for(let i=0;i<dataPro.length;i++){
                    if(dataPro[i].category.toLowerCase().includes(`${value.toLowerCase()}`)){
                        Read.innerHTML +=`<tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td> <a><button onclick="updateData(${i})" id="update">update</button></a></td>
                            <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
                        </tr>`;
                        
                            }
        }
            }
        }
    