if (localStorage.getItem("token") == "null") {
  document.querySelector(".librarian").style.display = "none";
  document.querySelector("body").innerHTML = "<h1>UnAuthorized Access<h1>";
}

//Delete Book
const deletebook = async (id) => {
  try {
    const response = await fetch(`http://kiran1432.pythonanywhere.com/book_delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      alert("Some Internal Error");
      // Handle the error accordingly
      return;
    }

    // No need to parse JSON for DELETE requests
    alert("Book Deleted");
    location.reload();
  } catch (error) {
    console.error("Error during delete fetch:", error);
    alert("An error occurred during the delete request");
  }
};

//librarian books

const libbooks = async () => {
  const userdata = await fetch("http://kiran1432.pythonanywhere.com/book_view", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const userjson = await userdata.json();
  const librarybooks = userjson.map((book) => {
    return `<div class="book-card" style="width: 15rem" data-target=${book.id}>
  <div class="card-body">
    <h5 class="card-title">${book.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${book.description}</h6>
    <h6 class="card-author mb-2 text-muted">${book.author}</h6>
    
    <div class="book-update">
      <button
        type="button"
        class="btn btn-success open-modal book-status"
        onclick="openModal('${book.id}')"
      >
        Update
      </button>
      <div id="${book.id}" class="update-book-modal modal">
        <div class="modal-content">
          <span class="close" onclick="closeModal('${book.id}')"
            >&times;</span
          >
          <h2>Update Book Form</h2>
          <form>
            <label for="Book-Name">Name:</label>
            <input
              type="text"
              class="update-book-name"
              value="${book.name}"
              name="book-name"
              required
            />

            <label for="Book-Description">Description:</label>
            <input
              type="text"
              class="update-book-description"
              value="${book.description}"
              name="book-description"
            />
            <label for="Book-Author">Author:</label>
            <input
              type="text"
              class="update-book-author"
              value="${book.author}"
              name="book-author"
              required
            />

            <button type="button" onclick="updatebook(${book.id})">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
    <button type="button" onclick="deletebook(${book.id})"
    class="btn btn-danger book-delete">
      Delete
    </button>
  </div>
</div>`;
  });
  const lib_books_block = document.querySelector(".library-book-cards");
  lib_books_block.innerHTML = librarybooks;
};

libbooks();

// Create Book
const add_book = async (book_name, book_description, book_author) => {
  const addfile = {
    user: 1,
    name: book_name,
    description: book_description,
    author: book_author,
  };
  const data = await fetch("http://kiran1432.pythonanywhere.com/book_add", {
    method: "POST",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!data.ok) {
    alert("Book already exists!");
    // Handle the error accordingly
    return;
  }

  const json = await data.json();
};

const addbook = () => {
  const add_book_modal = document.querySelector(".add-book-modal");
  const book_name = add_book_modal.querySelector("#book-name").value;
  const book_description =
    add_book_modal.querySelector("#book-description").value;
  const book_author = add_book_modal.querySelector("#book-author").value;
  add_book(book_name, book_description, book_author);
  closeModal("add-modal");
  location.reload();
  alert("Book Added");
};

//Update Book
const update_book = async (
  id,
  update_book_name,
  update_book_description,
  update_book_author
) => {
  const addfile = {
    user: 1,
    name: update_book_name,
    description: update_book_description,
    author: update_book_author,
  };
  const data = await fetch("http://kiran1432.pythonanywhere.com/book_update/" + String(id), {
    method: "PUT",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!data.ok) {
    alert("Please Enter Valid Information");
    // Handle the error accordingly
    return;
  }
};

const updatebook = (id) => {
  const book = document.getElementById(String(id));
  update_book(
    id,
    book.querySelector(".update-book-name").value,
    book.querySelector(".update-book-description").value,
    book.querySelector(".update-book-author").value
  );
  closeModal(String(id));
  location.reload();
  alert("Book Updated");
};

//librarain members
const libmembers = async () => {
  const userdata = await fetch("http://kiran1432.pythonanywhere.com/member", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const userjson = await userdata.json();
  const librarymembers = userjson.map((member) => {
    return `<div class="book-card" style="width: 15rem">
  <div class="card-body">
    <h5 class="card-title">${member.username}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${member.email}</h6>
    <div class="update-member">
      <button
        type="button"
        class="btn btn-success member-update"
        onclick="openModal('${member.id}')"
      >
        Update
      </button>
      <div
        id="${member.id}"
        class="update-member-modal modal"
      >
        <div class="modal-content">
          <span
            class="close"
            onclick="closeModal('${member.id}')"
            >&times;</span
          >
          <h2>Update Member Form</h2>
          <form>
            <label for="Member-Name">Name:</label>
            <input
              type="text"
              class="update-member-name"
              value="${member.username}"
              name="member-name"
              required
            />
            <label for="Member-New-Password">Password:</label>
            <input
              type="password"
              class="update-member-password"
              value=""
              name="member-password"
            />
            <label for="Member-Email">Email:</label>
            <input
              type="email"
              class="update-member-email"
              value="${member.email}"
              name="member-email"
              required
            />

            <button type="button" onclick="updatemember(${member.id})">
              Update Member
            </button>
          </form>
        </div>
      </div>
    </div>
    <button type="button" onclick="deletemember(${member.id})" class="btn btn-danger member-delete">
      Delete
    </button>
  </div>
</div>`;
  });
  const lib_members_block = document.querySelector(".member-cards");
  lib_members_block.innerHTML = librarymembers;
};

libmembers();

//Add Member
const add_member = async (name, password, email) => {
  const addfile = {
    username: name,
    password: password,
    email: email,
  };
  const data = await fetch("http://kiran1432.pythonanywhere.com/member", {
    method: "POST",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!data.ok) {
    alert("Book already exists!");
    // Handle the error accordingly
    return;
  }
};

const addmember = () => {
  const add_member_modal = document.querySelector(".add-member-modal");
  const name = add_member_modal.querySelector("#member-name").value;
  const password = add_member_modal.querySelector("#member-password").value;
  const email = add_member_modal.querySelector("#member-email").value;
  add_member(name, password, email);
  closeModal("add-member-modal");
  location.reload();
  alert("Member Added");
};

// Update Member
const update_member = async (id, name, password, email) => {
  const addfile = {
    username: name,
    password: password,
    email: email,
  };
  const data = await fetch("http://kiran1432.pythonanywhere.com/member/" + String(id), {
    method: "PUT",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

const updatemember = (id) => {
  const member = document.getElementById(String(id));
  update_member(
    id,
    member.querySelector(".update-member-name").value,
    member.querySelector(".update-member-password").value,
    member.querySelector(".update-member-email").value
  );
  closeModal(String(id));
  location.reload();
  alert("Member Updated");
};

//Delete Member
const deletemember = (id) => {
  const delete_fetch = async () => {
    try {
      const response = await fetch(`http://kiran1432.pythonanywhere.com/member/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        alert("Some Internal Error");
        // Handle the error accordingly
        return;
      }

      // No need to parse JSON for DELETE requests
      alert("Member Deleted");
      location.reload();
    } catch (error) {
      console.error("Error during delete fetch:", error);
      alert("An error occurred during the delete request");
    }
  };

  delete_fetch();
};
