
const inputButton = document.querySelector(".inputButton")
const input = document.querySelector(".input")
const list = document.querySelector(".list")
const deleteButton= document.querySelector(".deleteButton")
const tabButton=document.querySelector(".tabButton")
const redButton=document.querySelector(".redButton")
const ul=document.querySelector("ul")
let myLead = [];

let leadsLocal= JSON.parse(localStorage.getItem("myLeads"))

if(leadsLocal){
    myLead=leadsLocal;
    render(myLead);
}
function render(leads) {
    let listItems = ""
    leads.forEach(e =>
        listItems += `
        <li>
            <a target='_blank' href=' ${e} '>  
                ${e} 
            </a>
            <button class="redButton">X</button>
        </li>`
    )
    list.innerHTML = listItems;
}
function add() {
    if(input.value!=""){
    myLead.push(input.value);
    localStorage.setItem("myLeads", JSON.stringify(myLead))
    }
    render(myLead)
    input.value=""
}

input.addEventListener("keyup",function(e){
    if(e.key==="Enter" ||e.keyCode===13){
        add()
    }       
})



ul.addEventListener("click",function(e){
    if(e.target.classList.contains("redButton")){
        let li=e.target.parentElement;
        let nodes=Array.prototype.slice.call(ul.children)
        myLead.splice(nodes.indexOf(li),1)
        ul.removeChild(li)
    }
    render(myLead)

})


deleteButton.addEventListener("click", function(){
    if(confirm('Are you sure?')){
    localStorage.clear();
    myLead=[];
    render(myLead);
    }
});

inputButton.addEventListener("click", add)

tabButton.addEventListener("click",function(){

    chrome.tabs.query({active:true,lastFocusedWindow:true},tabs =>{
        myLead.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLead))
        render(myLead)
    });
});
