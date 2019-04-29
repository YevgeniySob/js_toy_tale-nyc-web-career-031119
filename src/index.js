const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyDiv = document.querySelector('#toy-collection');
let addToy = false;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
});

  const createToy = function(toy){
    toyDiv.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button id=toy-${toy.id} class="like-btn">Like <3</button>
    <button id=delete-${toy.id} class="delete-btn">Delete</button>
  </div>`
  };

  document.addEventListener('DOMContentLoaded',  e => {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toys => {

        toys.forEach(toy => {
          createToy(toy);
        })
      })

    const form = document.querySelector(".add-toy-form")
    const nameField = document.getElementById('name');
    const imgField = document.getElementById('img');

    form.addEventListener('submit', function(e) {
      e.preventDefault()
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameField.value,
          image: imgField.value,
          likes: 0
        })
      })
        .then(res => res.json())
        .then(toy => {
          createToy(toy);
        });
      form.reset()
    });

    document.addEventListener('click', function (e) {
      // debugger;
      if (e.target.className === 'like-btn') {
        const toyId = e.target.id.split('-')[1];
        let like = parseInt(e.target.previousElementSibling.innerHTML);
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            likes: ++like
          })
        })
          .then(res => res.json())
          .then(toy => {
            e.target.previousElementSibling.innerHTML = `${toy.likes} Likes`
          })
      } else if (e.target.className === `delete-btn`) {
        const toyId = e.target.id.split('-')[1];
        debugger;
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "DELETE",
          headers:
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
        })
          .then(res => res.json())
          .then(toy => {
            e.target.parentElement.remove()
          })
      }
    })
  });

