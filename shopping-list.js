function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function redirectToHome() {
  window.location.href = "index.html";
}

function displayRemainingItems() {
  const itemRemaining = document.getElementById("items-remaining");
  const existingList = getShoppingList();
  itemRemaining.textContent =
    existingList.length < 5
      ? `You can add ${5 - existingList.length} more items`
      : "You cannot add items further";
  document.getElementById("add-list-button").disabled =
    existingList.length >= 5;
}

function getLoggedInUser() {
  return sessionStorage.getItem("loggedInUserName");
}

function getShoppingList() {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) redirectToHome();
  return JSON.parse(localStorage.getItem(loggedInUser)) || [];
}

function addToShoppingList(item) {
  const loggedInUser = getLoggedInUser();
  const existingList = getShoppingList();
  const id = existingList.length + 1;
  displayItem(item, id);
  existingList.push({ id, item });
  localStorage.setItem(loggedInUser, JSON.stringify(existingList));
  displayRemainingItems();
}

function getIndexById(arr, id) {
  return arr.findIndex((item) => item.id === id);
}

function saveItem(value, id) {
  const loggedInUser = getLoggedInUser();
  const existingList = getShoppingList();
  const updatedList = existingList.map((i) => {
    if (i.id === id) return { ...i, item: value };
    return item;
  });
  localStorage.setItem(loggedInUser, JSON.stringify(updatedList));
  displayRemainingItems();
}

function deleteItem(id) {
  const loggedInUser = getLoggedInUser();
  const existingList = getShoppingList();
  const index = getIndexById(existingList, id);
  if (index > -1) {
    existingList.splice(index, 1);
  }
  localStorage.setItem(loggedInUser, JSON.stringify(existingList));
  displayRemainingItems();
}

function displayItem(value, id) {
  const div = document.createElement("div");
  div.id = `input-${id}`;

  const input = document.createElement("input");
  input.value = value;
  input.disabled = true;
  input.oninput = handleInput;
  let inputValue = value;
  // handleChange for name input
  function handleInput(e) {
    inputValue = e.target.value;
  }

  const editButton = document.createElement("button");
  let isEditable = false;
  editButton.textContent = isEditable ? "Done" : "Edit";
  editButton.onclick = () => {
    if (isEditable) {
      saveItem(inputValue, id);
    }
    isEditable = !isEditable;
    input.disabled = !isEditable;
    editButton.textContent = isEditable ? "Done" : "Edit";
  };

  div.ondblclick = () => {
    isEditable = !isEditable;
    input.disabled = false;
    editButton.textContent = isEditable ? "Done" : "Edit";
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    document.getElementById(`input-${id}`).remove();
    deleteItem(id);
  };

  div.appendChild(input);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  document.getElementById("shopping-list").appendChild(div);
}

function onLoad() {
  const shoppingList = getShoppingList();
  if (shoppingList) {
    shoppingList.map((listItem, i) => displayItem(listItem.item, listItem.id));
  }
  displayRemainingItems();
}

function validateFormOnSubmit(formData) {
  addToShoppingList(formData.item.value);
}
