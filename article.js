const searchParams = new URLSearchParams(window.location.search);

const articleID = searchParams.get("article");

fetch("https://ralu2semkea-8d34.restdb.io/rest/posts/"+articleID+"?fetchchildren=true", {
  "method": "GET",
  "headers": {
    "x-apikey": "6071b7dbf592f7113340ee7c"
  }
})
.then(res=>res.json())
.then(response => {
  showPost(response);
})
.catch(err => {
  console.error(err);
});

function showPost(data){
    console.log(data);
    document.querySelector("h1").textContent=data.title;
    document.querySelector("h2 span").textContent=data.username;
    document.querySelector("p").textContent=data.content;

    const template = document.querySelector(".commentTemplate").content;

    data.comments.forEach((comment)=>{
        console.log(comment);

        const copy = template.cloneNode(true);
        copy.querySelector("h3").textContent=comment.content;
        copy.querySelector("p span").textContent=comment.username;
        document.querySelector(".commentList").appendChild(copy);
    })

    if(data.comments.length == 0) {
        const copy = template.cloneNode(true);
        copy.querySelector("h3").textContent="No comments yet. Be the first one to leave a comment!";
        copy.querySelector("p span").textContent= "you";
        document.querySelector(".commentList").appendChild(copy);
    }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();

    const payload = {
        username: form.elements.username.value,
        email: form.elements.email.value,
        content: form.elements.content.value,
        date: Date.now(),
    }

    fetch(`https://ralu2semkea-8d34.restdb.io/rest/posts/${articleID}/comments`, {
    "method": "POST",
    "headers": {
    "x-apikey": "6071b7dbf592f7113340ee7c",
    "Content-Type": "application/json"
    },
  
    body: JSON.stringify(payload),
    })

    .then(res=>res.json())
    .then(data=>console.log(data));

    const template= document.querySelector(".commentTemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector("h3").textContent=data.content;
    copy.querySelector("p span").textContent=data.username;
    document.querySelector(".commentList").appendChild(copy);
}






















