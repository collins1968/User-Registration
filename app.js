const userForm = document.querySelector('#user-form');
const nameInput = document.querySelector('#name');
const userIdInput = document.querySelector('#user-id-number');
const countryInput = document.querySelector('#country');
const languagesInput = document.querySelector('#languages');
const errorContainer = document.querySelector('#form-error');
const tableBody = document.querySelector('#user-table-body');

let users = [];

// Check if users array is present in local storage
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'));
  displayUsers();
}

function resetForm() {
  userForm.reset();
  document.querySelector('#user-id').value = '';
}

function displayUsers() {
  tableBody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = user.name;
    row.appendChild(nameCell);
    const idCell = document.createElement('td');
    idCell.textContent = user.idNumber;
    row.appendChild(idCell);
    const countryCell = document.createElement('td');
    countryCell.textContent = user.country;
    row.appendChild(countryCell);
    const languagesCell = document.createElement('td');
    languagesCell.textContent = user.languages;
    row.appendChild(languagesCell);
    const actionCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editUser(index));
    actionCell.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteUser(index));
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}

function addUser(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const idNumber = userIdInput.value.trim();
  const country = countryInput.value.trim();
  const languages = languagesInput.value.trim();
  if (!name || !idNumber || !country || !languages) {
    errorContainer.textContent = 'All fields are required';
    return;
  }
  const userId = document.querySelector('#user-id').value;
  if (userId) {
    users[userId] = { name, idNumber, country, languages };
  } else {
    users.push({ name, idNumber, country, languages });
  }
  // Store users array in local storage
  localStorage.setItem('users', JSON.stringify(users));
  resetForm();
  displayUsers();
}

function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  userIdInput.value = user.idNumber;
  countryInput.value = user.country;
  languagesInput.value = user.languages;
  document.querySelector('#user-id').value = index;
}

function deleteUser(index) {
  users.splice(index, 1);
  // Store users array in local storage
  localStorage.setItem('users', JSON.stringify(users));
  displayUsers();
}

displayUsers();
