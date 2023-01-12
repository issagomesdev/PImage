const menuButton = document.getElementById("menu-button");
const labelsButton = document.getElementById("labels-button");

menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("status") === "false") {
    document.querySelector(".pin-buttons").style.display = "block";
    document.querySelector("#go-to-show").style.display = "none";
    document.querySelector("#labels-button").style.display = "none";
    menuButton.setAttribute("status", "true");
  } else {
    document.querySelector(".pin-buttons").style.display = "none";
    document.querySelector("#go-to-show").style.display = "flex";
    document.querySelector("#labels-button").style.display = "flex";
    menuButton.setAttribute("status", "false");
  }
}); // event responsible for show and hide the menu

labelsButton.addEventListener("click", () => {
  if (labelsButton.getAttribute("status") == "hidden") {
    const labels = document.querySelectorAll(".label");
    labels.forEach((label) => {
      label.style.display = "flex";
    });
    labelsButton.setAttribute("status", "show");
    labelsButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
  } else if (labelsButton.getAttribute("status") == "show") {
    const labels = document.querySelectorAll(".label");
    labels.forEach((label) => {
      label.style.display = "none";
    });
    labelsButton.setAttribute("status", "hidden");
    labelsButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  }
}); // event responsible for show and hide the labels

const mapContainer = document.querySelector("#map");
const image = mapContainer.querySelector("img");
const widthX = image.offsetWidth;
const heightY = image.offsetHeight;
const pinContainer = mapContainer.querySelector("#pins");
const listPin = document.querySelector(".list-pins");

const toPinElements = pins.map(function(pin) {
  const pinInMap = document.createElement("div");
  pinInMap.classList.add("pin");
  pinInMap.setAttribute('data-id', pin.id);
  pinInMap.setAttribute('data-name', pin.name);
  pinInMap.setAttribute('data-x', pin.x);
  pinInMap.setAttribute('data-y', pin.y);
  pinInMap.style.left = `${pin.x}%`;
  pinInMap.style.top = `${pin.y}%`;
  const label = document.createElement("div");
  label.classList.add("label");
  label.setAttribute('label-id', pin.id);
  label.innerHTML = pin.name;
  pinInMap.append(label);

  pinInMap.addEventListener("click", function () {
    const selected = document.querySelector(".pin.selected");
    if (selected) {
      selected.classList.remove("selected");
      selected.classList.remove("locate");
      const id = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${id}"]`).style.display = "none";
    } else {
      pinInMap.classList.add("selected");
      const id = pinInMap.getAttribute("data-id");
      document.querySelector(`[label-id="${id}"]`).style.display = "flex";
    }
  }); // to select the pin

  return pinInMap;
  
}); // load items of array in map

pinContainer.append(...toPinElements);

const toPinList = pins.map(function(pin) {
  const pinInList = document.createElement("div");
  pinInList.classList.add("pin-in-list");
  pinInList.setAttribute('data-id', pin.id);
  pinInList.setAttribute('data-name', pin.name);
  const locate = document.createElement("div");
  locate.classList.add("locate");
  const bttn = document.createElement("div");
  bttn.classList.add("bttn");
  bttn.classList.add("inverse");
  bttn.setAttribute('id', 'locate-pin-button');
  bttn.innerHTML = '<i class="fa fa-location-dot"></i>';
  const item = document.createElement("div");
  item.classList.add("item");
  const name = document.createElement("div");
  name.classList.add("name");
  const nameP = document.createElement("p");
  nameP.innerHTML = pin.name;
  const infos = document.createElement("div");
  infos.classList.add("infos");
  const p_id = document.createElement("p");
  p_id.setAttribute('data-id', pin.id);
  p_id.innerHTML = `id: ${pin.id}`;
  const p_x = document.createElement("p");
  p_x.innerHTML = `id: ${pin.x}`;
  const p_y = document.createElement("p");
  p_y.innerHTML = `id: ${pin.y}`;

    pinInList.append(locate);
    locate.append(bttn);
    pinInList.append(item);
    item.append(name);
    item.append(infos);
    item.append(infos);
    name.append(nameP);
    infos.append(p_id);
    infos.append(p_x);
    infos.append(p_y);

    
  bttn.addEventListener("click", () => {
    const deselected = document.querySelector(".pin.selected");
    const selected = document.querySelector(`[data-id="${pin.id}"]`);
    if (deselected) {
      deselected.classList.remove("selected");
      deselected.classList.remove("locate");
      const deselectedId = deselected.getAttribute("data-id");
      document.querySelector(`[label-id="${deselectedId}"]`).style.display =
        "none";
      selected.classList.add("selected");
      selected.classList.add("locate");
      const selectedId = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${selectedId}"]`).style.display = "flex";
    } else {
      selected.classList.add("selected");
      selected.classList.add("locate");
      const selectedId = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${selectedId}"]`).style.display = "flex";
    }
    document.getElementById("filter-pin").style = "display: none;";	
	  }); // to locate the pin

  return pinInList;
  
}); // load items of array in list

listPin.append(...toPinList);

let isDragging = false;

mapContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("pin")) {
    return;
  }
  const selected = document.querySelector(".pin.selected");
  if (isDragging == false && selected == null) {
    const x = ((event.offsetX / widthX) * 98).toFixed(2);
    const y = ((event.offsetY / heightY) * 98).toFixed(2);
    addPin(x, y);
  } else {
    selected.classList.remove("selected");
    selected.classList.remove("locate");
    const id = selected.getAttribute("data-id");
    document.querySelector(`[label-id="${id}"]`).style.display = "none";
  }
}); // adding items when clicking somewhere on the map

mapContainer.addEventListener("mousedown", function () {
  isDragging = true;
}); // event responsible for starting moving items around the map

mapContainer.addEventListener("mouseup", function () {
  isDragging = false;
}); // event responsible for finishing moving items around the map

mapContainer.addEventListener("mousemove", function (event) {
  const selected = document.querySelector(".pin.selected");
  const x = ((event.offsetX / widthX) * 98).toFixed(2);
  const y = ((event.offsetY / heightY) * 98).toFixed(2);
  if (isDragging && selected) {
    selected.style.left = `${x}%`;
    selected.style.top = `${y}%`;
    const id = selected.getAttribute("data-id");
    selected.setAttribute("data-x", x);
    selected.setAttribute("data-y", y);
    const pinInList = listPin.querySelector(`[data-id="${id}"]`);
    const infosClass = pinInList.querySelector(".infos");
    const pX = infosClass.querySelector("p[data-x]");
    const pY = infosClass.querySelector("p[data-y]");
    pX.innerHTML = `x: ${x}`;
    pY.innerHTML = `y: ${y}`;
    const pin = pins.find((pin) => pin.id === Number(id));
    pin.x = x;
    pin.y = y;
  }
}); // event responsible for moving items around the map

let pinId = pins.length + 1; // adding value to id

function addPin(x, y) {
  const id = pinId++;
  const name = "pin" + id;
  const pin = { id, name, x, y };
  pins.push(pin);

  addPinElements(pin);
} // function responsible for adding items to the array

function addPinElements(pin) {
  
  const pinInMap = document.createElement("div");
  pinInMap.classList.add("pin");
  pinInMap.setAttribute('data-id', pin.id);
  pinInMap.setAttribute('data-name', pin.name);
  pinInMap.setAttribute('data-x', pin.x);
  pinInMap.setAttribute('data-y', pin.y);
  pinInMap.style.left = `${pin.x}%`;
  pinInMap.style.top = `${pin.y}%`;
  const label = document.createElement("div");
  label.classList.add("label");
  label.setAttribute('label-id', pin.id);
  label.innerHTML = pin.name;
  pinInMap.append(label);

  pinInMap.addEventListener("click", function () {
    const selected = document.querySelector(".pin.selected");
    if (selected) {
      selected.classList.remove("selected");
      selected.classList.remove("locate");
      const id = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${id}"]`).style.display = "none";
    } else {
      pinInMap.classList.add("selected");
      const id = pinInMap.getAttribute("data-id");
      document.querySelector(`[label-id="${id}"]`).style.display = "flex";
    }
  });

  pinContainer.append(pinInMap);

  const pinInList = document.createElement("div");
  pinInList.classList.add("pin-in-list");
  pinInList.setAttribute('data-id', pin.id);
  pinInList.setAttribute('data-name', pin.name);
  const locate = document.createElement("div");
  locate.classList.add("locate");
  const bttn = document.createElement("div");
  bttn.classList.add("bttn");
  bttn.classList.add("inverse");
  bttn.setAttribute('id', 'locate-pin-button');
  bttn.addEventListener("click", () => {
    const deselected = document.querySelector(".pin.selected");
    const selected = document.querySelector(`[data-id="${pin.id}"]`);
    if (deselected) {
      deselected.classList.remove("selected");
      deselected.classList.remove("locate");
      const deselectedId = deselected.getAttribute("data-id");
      document.querySelector(`[label-id="${deselectedId}"]`).style.display =
        "none";
      selected.classList.add("selected");
      selected.classList.add("locate");
      const selectedId = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${selectedId}"]`).style.display = "flex";
    } else {
      selected.classList.add("selected");
      selected.classList.add("locate");
      const selectedId = selected.getAttribute("data-id");
      document.querySelector(`[label-id="${selectedId}"]`).style.display = "flex";
    }
    document.getElementById("filter-pin").style = "display: none;";	
	  });
    bttn.innerHTML = '<i class="fa fa-location-dot"></i>';
    const item = document.createElement("div");
    item.classList.add("item");
    const name = document.createElement("div");
    name.classList.add("name");
    const nameP = document.createElement("p");
    nameP.innerHTML = pin.name;
    const infos = document.createElement("div");
    infos.classList.add("infos");
    const p_id = document.createElement("p");
    p_id.setAttribute('data-id', pin.id);
    p_id.innerHTML = `id: ${pin.id}`;
    const p_x = document.createElement("p");
    p_x.innerHTML = `id: ${pin.x}`;
    const p_y = document.createElement("p");
    p_y.innerHTML = `id: ${pin.y}`;

    pinInList.append(locate);
    locate.append(bttn);
    pinInList.append(item);
    item.append(name);
    item.append(infos);
    item.append(infos);
    name.append(nameP);
    infos.append(p_id);
    infos.append(p_x);
    infos.append(p_y);

    listPin.append(pinInList);

} // function responsible for adding items in map and list

const editPinButton = document.getElementById("edit-pin-button");

editPinButton.addEventListener("click", () => {
  const selectedPin = document.querySelector(".pin.selected");

  if (selectedPin) {
    document.getElementById("edit-pin").style = "display: flex";

    const div = document.getElementById("form");
    const input = div.querySelector("input");
    const button = div.querySelector("button");

    if (input && button) {
      input.remove();
      button.remove();
    }

    const id = selectedPin.getAttribute("data-id");
    const name = selectedPin.getAttribute("data-name");
    EditNamePin(id, name);
  } else {
    alert("Please select a item to edit.");
  }
}); // event responsible for enter edit screen

const closeEdit = document.getElementById("closeEdit");

closeEdit.addEventListener("click", () => {
  document.getElementById("edit-pin").style = "display: none;";
}); // event responsible for exit edit screen

function EditNamePin(id, name) {
  const div = document.querySelector("#form");
  const nameInput = document.createElement("input");
  nameInput.placeholder = "Item Name";
  nameInput.value = name;
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  div.appendChild(nameInput);
  div.appendChild(editButton);

  editButton.addEventListener("click", () => {
    if (nameInput.value) {
      document.getElementById("edit-pin").style.display = "none";
      const pinElement = document.querySelectorAll(`[data-id="${id}"]`);
      pinElement.forEach((element) => {
        element.setAttribute("data-name", nameInput.value);
      });

      const pinInList = listPin.querySelector(`[data-id="${id}"]`);
      const nameClass = pinInList.querySelector(".name");
      const pName = nameClass.querySelector("p");
      pName.innerHTML = `${nameInput.value}`;
      document.querySelector(
        `[label-id="${id}"]`
      ).innerHTML = `${nameInput.value}`;

      const index = pins.find((pin) => pin.id === Number(id));
      index.name = nameInput.value;
      nameInput.remove();
      editButton.remove();
    } else {
      alert("Please enter a name for the item.");
    }
  });
} // function responsible to update items in array and html

const deletePinButton = document.getElementById("delete-pin-button");

deletePinButton.addEventListener("click", () => {
  const selectedPin = document.querySelector(".pin.selected");
  if (selectedPin) {
    const id = selectedPin.getAttribute("data-id");
    removePin(id);
  } else {
    alert("Please select a item to delete.");
  }
}); // event responsible for pass the selected item to the removePin function

function removePin(id) {
  const pinElement = document.querySelectorAll(`[data-id="${id}"]`);

  pinElement.forEach((element) => {
    element.remove();
  });

  const index = pins.findIndex((pin) => pin.id === id);
  pins.splice(index, 1);
} // function responsible to delete items in array and html

const filterPinButton = document.getElementById("filter-pin-button");
const closeFilter = document.getElementById("closeFilter");

filterPinButton.addEventListener("click", () => {
  document.getElementById("filter-pin").style =
    "flex-wrap: wrap; display: flex;";
}); // event responsible for enter filter screen

closeFilter.addEventListener("click", () => {
  document.getElementById("filter-pin").style = "display: none;";
}); // event responsible for exit filter screen

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
  const items = listPin.querySelectorAll("div[data-name]");
  let Itemsfiltered;
  if (e.target.value === "") {
    Itemsfiltered = items;
  } else {
    Itemsfiltered = Array.from(items).filter((item) =>
      item.getAttribute("data-name").includes(e.target.value)
    );
  }
  items.forEach((item) => (item.style.display = "none"));
  Itemsfiltered.forEach((item) => (item.style.display = "flex"));
}); // event responsible for search and filter items

const leftItem = document.getElementById("left");
const upItem = document.getElementById("up");
const downItem = document.getElementById("down");
const rightItem = document.getElementById("right");

leftItem.addEventListener("click", () => {
  const selected = document.querySelector(".pin.selected");
  if (selected) {
    const current = parseInt(selected.style.left, 10) || 0;
    if (current >= 1) {
      leftItem.style = "color: #000000;";
      const x = `${current - 1}`;
      selected.style.left = `${x}%`;
      const id = selected.getAttribute("data-id");
      selected.setAttribute("data-x", x);
      const pinInList = listPin.querySelector(`[data-id="${id}"]`);
      const infosClass = pinInList.querySelector(".infos");
      const pX = infosClass.querySelector("p[data-x]");
      pX.innerHTML = `x: ${x}`;
      const pin = pins.find((pin) => pin.id === Number(id));
      pin.x = x;
    }
  } else {
    alert("Please select a item to move.");
  }
}); // event responsible for moving selected item to left

upItem.addEventListener("click", () => {
  const selected = document.querySelector(".pin.selected");
  if (selected) {
    const current = parseInt(selected.style.top, 10) || 0;
    if (current >= 0) {
      upItem.style = "color: #000000;";
      const y = `${current - 1}`;
      selected.style.top = `${y}%`;
      const id = selected.getAttribute("data-id");
      selected.setAttribute("data-y", y);
      const pinInList = listPin.querySelector(`[data-id="${id}"]`);
      const infosClass = pinInList.querySelector(".infos");
      const pY = infosClass.querySelector("p[data-y]");
      pY.innerHTML = `y: ${y}`;
      const pin = pins.find((pin) => pin.id === Number(id));
      pin.y = y;
    }
  } else {
    alert("Please select a item to move.");
  }
}); // event responsible for moving selected item to up

downItem.addEventListener("click", () => {
  const selected = document.querySelector(".pin.selected");
  if (selected) {
    const current = parseInt(selected.style.top, 10) || 0;
    if (current <= 93) {
      downItem.style = "color: #000000;";
      const y = `${current + 1}`;
      selected.style.top = `${y}%`;
      const id = selected.getAttribute("data-id");
      selected.setAttribute("data-y", y);
      const pinInList = listPin.querySelector(`[data-id="${id}"]`);
      const infosClass = pinInList.querySelector(".infos");
      const pY = infosClass.querySelector("p[data-y]");
      pY.innerHTML = `y: ${y}`;
      const pin = pins.find((pin) => pin.id === Number(id));
      pin.y = y;
    }
  } else {
    alert("Please select a item to move.");
  }
}); // event responsible for moving selected item to down

rightItem.addEventListener("click", () => {
  const selected = document.querySelector(".pin.selected");
  if (selected) {
    const current = parseInt(selected.style.left, 10) || 0;
    if (current <= 97) {
      rightItem.style = "color: #000000;";
      const x = `${current + 1}`;
      selected.style.left = `${x}%`;
      const id = selected.getAttribute("data-id");
      selected.setAttribute("data-x", x);
      const pinInList = listPin.querySelector(`[data-id="${id}"]`);
      const infosClass = pinInList.querySelector(".infos");
      const pX = infosClass.querySelector("p[data-x]");
      pX.innerHTML = `x: ${x}`;
      const pin = pins.find((pin) => pin.id === Number(id));
      pin.x = x;
    }
  } else {
    alert("Please select a item to move.");
  }
}); // event responsible for moving selected item to right
