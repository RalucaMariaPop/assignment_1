const form = document.querySelector("form");

form.addEventListener("submit", userSubmitted);

function userSubmitted(event) {
  event.preventDefault();
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.content.value);

  const payload = {
      title: form.elements.title.value,
      username: form.elements.username.value,
      content: form.elements.content.value,
  };

  document.querySelector("input[type=submit]").disabled = true;

  fetch("https://ralu2semkea-8d34.restdb.io/rest/posts", {
  "method": "POST",
  "headers": {
    "x-apikey": "6071b7dbf592f7113340ee7c",
    "Content-Type": "application/json"
  },
  
  body: JSON.stringify(payload),
})
.then(response => {
  console.log(response);
  document.querySelector("input[type=submit]").disabled = false;
  form.elements.title.value = "";
  form.elements.username.value = "";
  form.elements.content.value = "";

  document.querySelector("p.hidden").classList.remove("hidden");

})
.catch(err => {
  console.error(err);
});
}

