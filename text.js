let add = document.querySelector(".add");
let input = document.querySelector("input");
let datas = document.querySelector(".datas");
let clear = document.querySelector(".clear p");
let all = document.querySelector(".clear .all");

task = [];
//  window.localStorage.clear();

if (localStorage.getItem("task")) {
  task = JSON.parse(localStorage.getItem("task"));
  addDataToPage(JSON.parse(localStorage.getItem("task")));
}
input.addEventListener("input", () => {
  if (input.value) {
    add.classList.add("active");
  } else {
    add.classList.remove("active");
  }
});

clear.innerHTML = `You have ${task.length} pending tasks`;
add.addEventListener("click", () => {
  let dataList = {
    name: input.value,
    id: new Date().getTime(),
  };
  if (dataList.name) {
    task.push(dataList);
    clear.innerHTML = `You have ${task.length} pending tasks`;
    all.classList.add("active");
  }
  addDataToPage(task);
  addDataToLocalStorage(task);
});
function addDataToPage(dat) {
  datas.innerHTML = "";
  dat.map((el) => {
    let data = `
  <div class="data">
  <p>${el.name}</p>
   <button ><i data-id="${el.id}" class="fa-solid fa-trash " ></i></button>
  </div>`;
    datas.innerHTML += data;
  });
  input.value = "";
  input.focus();
  add.classList.remove("active");
}
function addDataToLocalStorage(data) {
  window.localStorage.setItem("task", JSON.stringify(data));
}

datas.addEventListener("click", (el) => {
  if (el.target.dataset.id) {
    task.length = task.length - 1;
    let ids = el.target.dataset.id;
    el.target.parentElement.parentElement.remove();
    clear.innerHTML = `You have ${task.length} pending tasks`;

    let datz = JSON.parse(localStorage.getItem("task"));
    let newData = datz.filter((el) => {
      return el.id != ids;
    });
    window.localStorage.setItem("task", JSON.stringify(newData));
  }
});
all.addEventListener("click", () => {
  datas.innerHTML = "";
  window.localStorage.clear();
  clear.innerHTML = `You have 0 pending tasks`;
  all.classList.remove("active");
});
