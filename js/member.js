if (localStorage.getItem("token") == "null") {
  document.querySelector(".member").style.display = "none";
  document.querySelector("body").innerHTML = "<h1>UnAuthorized Access<h1>";
}
// Member Books Section

const member_books = async () => {
  const userdata = await fetch("http://kiran1432.pythonanywhere.com/book_view", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const userjson = await userdata.json();
  const memberbooks = userjson.map((book) => {
    if (book.status) {
      return `<div id='${book.id}'class="book-card" style="width: 15rem">
    <div class="card-body book-card-body">
      <h5 class="card-title">${book.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${book.description}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
      <button type="button" class="btn btn-success book-status">
        Avaliable
      </button>
      <button type="button" onclick="borrow(${book.id},'${book.name}','${book.description}','${book.author}')" class="btn btn-warning book-borrow">
        Borrow
      </button>
    </div>
  </div>`;
    } else {
      return `<div id='${book.id}'class="book-card" style="width: 15rem">
    <div class="card-body book-card-body">
      <h5 class="card-title">${book.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${book.description}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
      <button type="button" class="btn btn-danger book-status">
        Borrowed
      </button>
    </div>
  </div>`;
    }
  });

  const books_block = document.querySelector(".member-book-cards");
  books_block.innerHTML = memberbooks;
  //Buttons reaction

  const books = document.querySelector(".member-book-cards");
  if (books !== null) {
    const book_cards = books.querySelectorAll(".book-card");
    book_cards.forEach((book) => {
      const book_borrow = book.querySelector(".book-borrow");
      if (book_borrow !== null) {
        book_borrow.addEventListener("click", () => {
          book_borrow.style.display = "none";
          const book_status = book.querySelector(".book-status");
          book_status.innerHTML = "Borrowed";
          book_status.classList.remove("btn-success");
          book_status.classList.add("btn-danger");
        });
      }
    });
  }
};
member_books();

// My Books

const mybooks = async () => {
  const userdata = await fetch("http://kiran1432.pythonanywhere.com/mybooks", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const userjson = await userdata.json();
  const my_books = userjson.mybooks.map((book) => {
    return `<div id='${book.id}'class="book-card" style="width: 15rem">
  <div class="card-body">
  <h5 class="card-title">${book.name}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${book.description}</h6>
  <h6 class="card-author mb-2 text-muted">${book.author}</h6>
    <button type="button" onclick="returnfetch(${book.id},'${book.name}','${book.description}','${book.author}')" class="btn btn-success book-status">
      Return Book
    </button>
  </div>
</div>`;
  });
  const my_books_block = document.querySelector(".my-book-cards");
  my_books_block.innerHTML = my_books;
};
mybooks();

//Borrow Book
const borrow = async (id, name, description, author) => {
  const addfile = {
    user: localStorage.getItem("userid"),
    name: name,
    description: description,
    author: author,
    status: "false",
  };
  await fetch(`http://kiran1432.pythonanywhere.com/book_update/${id}`, {
    method: "PUT",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  location.reload();
};

//Return Book
const returnfetch = async (id, name, description, author) => {
  const addfile = {
    user: 1,
    name: name,
    description: description,
    author: author,
    status: "true",
  };
  await fetch(`http://kiran1432.pythonanywhere.com/book_update/${id}`, {
    method: "PUT",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  location.reload();
};

//Delete Own Account
const owndelete = async () => {
  await fetch(`http://kiran1432.pythonanywhere.com/memberowndelete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  window.location.assign("index.html");
};
