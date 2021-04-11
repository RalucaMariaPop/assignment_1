function getData() {
    fetch("https://ralu2semkea-8d34.restdb.io/rest/posts", {
  "method": "GET",
  "headers": {
    "x-apikey": "6071b7dbf592f7113340ee7c"
  }
})
.then(res=>res.json())
.then(response => {
  showPosts(response);
})
.catch(err => {
  console.error(err);
});
}
getData();

function showPosts(posts){

    const template = document.querySelector("template.frontpage").content;
    posts.forEach(post => {
        const copy = template.cloneNode(true);
        template.querySelector("h2").textContent=post.title;
        template.querySelector("h3 span").textContent=post.username;
        template.querySelector("a.readmore").href=`article.html?article=${post._id}`;
        document.querySelector("main").appendChild(copy);
    });
    
}