const content = document.querySelector(".page-content");
const nav_buttons = document.querySelectorAll(".nav-link");
const content_blocks = document.querySelectorAll(".content");
const csrfToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

// Navbar Section

nav_buttons.forEach((but) => {
  if (but.innerHTML == "Books") {
    but.classList.add("active");
    const member_books = document.getElementById("member-books-block");
    if (member_books !== null) {
      member_books.style.display = "block";
    }
    const library_books = document.getElementById("library-books-block");
    if (library_books !== null) {
      library_books.style.display = "block";
    }
  } else {
    but.classList.remove("active");
  }
  but.addEventListener("click", function () {
    nav_buttons.forEach((button) => {
      button.classList.remove("active");
    });
    but.classList.add("active");

    const target = this.getAttribute("data-target");
    if (target !== "account") {
      content_blocks.forEach((block) => {
        block.style.display = "none";
      });
      const currentblock = document.getElementById(target);
      currentblock.style.display = "block";
    }
  });
});

//modal

const openModal = (modal) => {
  document.getElementById(modal).style.display = "flex";
};

const closeModal = (modal) => {
  document.getElementById(modal).style.display = "none";
};

//login

const login = async () => {
  const addfile = {
    username: String(document.querySelector("#username").value),
    password: String(document.querySelector("#password").value),
  };
  const data = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    body: JSON.stringify(addfile),
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  });

  if (!data.ok) {
    alert("Invalid Username or Password");
    // Handle the error accordingly
    return;
  }

  const json = await data.json();
  localStorage.setItem("token", json.access);
  localStorage.setItem("refresh", json.refresh);
  if (json !== null) {
    fun();
  }
};

const fun = async () => {
  const userdata = await fetch("http://127.0.0.1:8000/usertype", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const userjson = await userdata.json();
  localStorage.setItem("userid", userjson.id);
  document.querySelector(".login-container").style.display = "none";
  if (userjson.admin) {
    window.location.assign("librarian.html");
  } else {
    window.location.assign("member.html");
  }
};

//logout

const logout = document.querySelector(".logout");
if (logout !== null) {
  logout.addEventListener("click", () => {
    localStorage.setItem("token", null);
    window.location.assign("index.html");
  });
}
