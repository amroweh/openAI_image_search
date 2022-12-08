let currentTimeout = null

function onSubmit(e){
    e.preventDefault();

    document.querySelector(".msg").textContent = "";
    document.querySelector("#image").src = ""

    const prompt = document.querySelector("#prompt").value;
    const size = document.querySelector("#size").value;

    if(prompt === ''){
        showMessage("Please add a text description!")
        return;
    }
    generateImageRequest(prompt, size)
    //generateFakeImage()
}

async function generateFakeImage(){
    showSpinner()
    setTimeout(() => {
        hideSpinner()
        document.querySelector("#image").src = './assets/sample_image_1.jpg'        
    }, 2000);    
}



async function generateImageRequest(prompt, size){
    try {
        showSpinner()
        
        const response = await fetch("/openai/generateimage",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })
        if(!response.ok){
            hideSpinner()
            throw new Error("That image could not be generated")
        }
        const data = await response.json();
        const imageUrl = data.data;
        document.querySelector("#image").src = imageUrl
        hideSpinner()
    } catch (error) {
        showMessage(error)
    }
}

function hideMessage(){
    if(currentTimeout!==null) clearTimeout(currentTimeout)    
    document.querySelector(".msg").classList.remove("show")
    document.querySelector(".msg").textContent = ""
}

function showMessage(messageText){
    if(currentTimeout!==null) clearTimeout(currentTimeout)
    document.querySelector(".msg").textContent = messageText
    document.querySelector(".msg").classList.add("show")
    const timeout = setTimeout(() => {
        document.querySelector(".msg").classList.remove("show")
    }, 2000);
    currentTimeout = timeout
}

function showSpinner(){
    document.querySelector("#spinner-img").classList.add("show")
}

function hideSpinner(){
    document.querySelector("#spinner-img").classList.remove("show")
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);