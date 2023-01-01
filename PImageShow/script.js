const labelsButton = document.getElementById("labels-button");

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
const pinContainer = mapContainer.querySelector("#pins");
const listPin = document.querySelector(".list-pins");

pins.forEach((pin) => {
  addPinElements(pin.id, pin.name, pin.x, pin.y);
}); // load items of array

mapContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("pin")) {
    return;
  }
  const selected = document.querySelector(".pin.selected");
  if (selected !== null) {
    selected.classList.remove("selected");
    selected.classList.remove("locate");
    const id = selected.getAttribute("data-id");
    document.querySelector(`[label-id="${id}"]`).style.display = "none";
  }
}); // deselect selected item on map

function addPinElements(id, name, x, y) {
  pinContainer.innerHTML += `<div class="pin" data-id="${id}" data-name="${name}" data-x="${x}" data-y="${y}" style="left: ${x}%; top: ${y}%;"> <div class="label" label-id="${id}"> ${name} </div>  </div>`;
  listPin.innerHTML += `
  <div class="pin-in-list" data-name="${name}" data-id="${id}"> 
  <div class="locate"> 
  <div class="bttn inverse" id="locate-pin-button" onclick="locateItem('${id}')"> 
  <i class="fa fa-location-dot"></i> 
  </div> 
  </div> 
  <div class="item">
  <div class="name"> 
  <p>${name}</p> 
  </div> 
  <div class="infos"> 
  <p data-id="${id}">id: ${id}</p> 
  <p data-x="${x}">x: ${x}</p> 
  <p data-y="${y}">y: ${y}</p> 
  </div> 
  </div>
  </div>`;

  const pinElements = pinContainer.querySelectorAll(".pin");

  pinElements.forEach((pinElement) => {
    pinElement.addEventListener("click", function () {
      const selected = document.querySelector(".pin.selected");
      if (selected) {
        selected.classList.remove("selected");
        selected.classList.remove("locate");
        const id = selected.getAttribute("data-id");
        document.querySelector(`[label-id="${id}"]`).style.display = "none";
      } else {
        pinElement.classList.add("selected");
        const id = pinElement.getAttribute("data-id");
        document.querySelector(`[label-id="${id}"]`).style.display = "flex";
      }
    });
  });
} // function responsible for adding items in html

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

function locateItem(id) {
  const deselected = document.querySelector(".pin.selected");
  const selected = document.querySelector(`[data-id="${id}"]`);
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
} // function responsible to locate and mark item on map