
const createButtonn = document.getElementById("createButton")
createButtonn.addEventListener("click", ()=>{
    fetch("http://localhost:8000/postes/create", {
        method:"POST",
        body:JSON.stringify(
            {
                name: 'post8638863',
                description: 'description',
                author:"Author83838"
            }),
        headers:{
            "Content-Type": "application/json"
        }
    })
})
