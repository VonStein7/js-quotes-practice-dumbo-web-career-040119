// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
function populateQuoteList(){
  fetch("http://localhost:3000/quotes")
  .then(res => res.json())
  .then(data => data.forEach(displayQuoteList))
}

function displayQuoteList(quote) {
  console.log(quote)
  const ul = document.getElementById("quote-list")
  const li = document.createElement("li")

  li.className = "quote-card"
  li.id = quote.id
  li.innerHTML += `<blockquote class="blockquote">
  <p class="mb-0">${quote.quote}</p>
  <footer class="blockquote-footer">${quote.author}</footer>
  <br>
  <button class='btn-success' id=${quote.id}>Likes: <span>${quote.likes}</span></button>
  <button class='btn-danger'>Delete</button>
</blockquote>`

ul.appendChild(li)
const likeBtn = li.querySelector(`.btn-success`)
let span = document.querySelector("span")
span.dataset.likes = parseInt(quote.likes)
likeBtn.addEventListener("click", likeThisQuote)
likeBtn.dataset.quoteId = `${quote.id}`
likeBtn.dataset.likes = quote.likes
const deleteBtn = li.querySelector(".btn-danger")
deleteBtn.dataset.quoteId = `${quote.id}`
console.log(deleteBtn.dataset.quoteId)
console.log(deleteBtn)
deleteBtn.addEventListener("click", deleteThisQuote)
}

function likeThisQuote(){
  let span = document.querySelector("span")
  console.log(event.target.dataset.quoteId + "heey")
  fetch(`http://localhost:3000/quotes/${event.target.dataset.quoteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
       {likes: parseInt(span.dataset.likes) + 1}
       )
  })
.then(res => res.json())
.then( (data) => {
  document.querySelector("#quote-list").innerHTML = ""
  populateQuoteList()
})


}



function createQuote(e){
  console.log("hello")
  e.preventDefault();

  const newQuote = document.getElementById("new-quote").value
  const newAuthor = document.getElementById("author").value
  const quote = {quote:newQuote,
    author:newAuthor,
    likes:1}

fetch("http://localhost:3000/quotes",{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body:JSON.stringify(quote)
})
.then(res => res.json())
.then(data => displayQuoteList(data))

}

function deleteThisQuote(){

const liToDelete = document.getElementById(`${event.target.dataset.quoteId}`)


    fetch(`http://localhost:3000/quotes/${event.target.dataset.quoteId}`,{method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }})
    .then(resp => console.log(resp.json()))

liToDelete.remove()

}


document.addEventListener("DOMContentLoaded",()=>{
  const button = document.querySelector(".btn-primary")
  button.addEventListener("click", createQuote)
  populateQuoteList()
})