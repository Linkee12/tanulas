
let input = document.getElementById("inputlist")
input.addEventListener("keypress", e)
function e(){
    let data = input.value 
   
   
   
    localStorage.setItem("lista", data) ;
    document.getElementById("todo").innerHTML = localStorage.getItem("lista");

}