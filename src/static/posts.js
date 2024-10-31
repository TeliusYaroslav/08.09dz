const createButton = document.getElementById("createButton") 

createButton.addEventListener("click", () => {
    fetch("http://localhost:8000/posts", { 
        method: "POST",
        body: JSON.stringify({
            name: 'Example Post',
            description: 'This is an example description',
            author: "Example Author",
            
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Post created successfully!") 
            window.location.reload()  
        } else {
            alert("Failed to create post") 
        }
    })
    .catch(error => {
        console.error("Error creating post:", error) 
        alert("An error occurred while creating the post") 
    }) 
}) 
