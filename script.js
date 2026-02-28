// Global Variables
const userList = document.getElementById("userList");
const userDetails = document.getElementById("userDetails");
const loadingText = document.getElementById("loadingText");
const errorText = document.getElementById("errorText");
const searchInput = document.getElementById("searchInput");
const reloadBtn = document.getElementById("reloadBtn");

let usersData = []; // store fetched users

// =====================================
// Task 1: Fetch Users from API
// =====================================

function fetchUsers() {
  loadingText.style.display = "block";
  errorText.textContent = "";
  userList.innerHTML = "";
  userDetails.innerHTML = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      usersData = data;
      displayUsers(usersData);

      // Task 3: Remove Loading Text
      loadingText.style.display = "none";
    })
    .catch(function () {
      // Task 4: Error Handling
      loadingText.style.display = "none";
      errorText.textContent = "Failed to fetch data";
    });
}

// =====================================
// Function to Display Users
// =====================================

function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach(function (user) {
    const li = document.createElement("li");
    li.textContent = user.name;

    // Task 2: Display User Details on Click
    li.addEventListener("click", function () {
      userDetails.innerHTML = `
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
            `;
    });

    userList.appendChild(li);
  });
}

// =====================================
// Task 5: Search Filter
// =====================================

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  const filteredUsers = usersData.filter(function (user) {
    return user.name.toLowerCase().includes(searchValue);
  });

  displayUsers(filteredUsers);
});

// =====================================
// Task 6: Refresh Button
// =====================================

reloadBtn.addEventListener("click", function () {
  fetchUsers();
});

// Load data when page loads
window.addEventListener("DOMContentLoaded", function () {
  fetchUsers();
});
