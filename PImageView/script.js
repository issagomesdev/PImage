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
  p_x.innerHTML = `x: ${pin.x}`;
  const p_y = document.createElement("p");
  p_y.innerHTML = `y: ${pin.y}`;

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