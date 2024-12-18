const filterSelect = document.querySelector("#level-filter");
const filterLevel = document.querySelector("#level");
const workersForm = document.querySelector(".workers-form");
const workersModal = document.querySelector(".workers-modal");
const workersTableBody = document.querySelector(".workers-table tbody");
let workers = JSON.parse(localStorage.getItem("workers")) || [];
console.log(workers);

filterSelect.innerHTML = `<option>
All
</option>`;
level.map((el) => {
  filterSelect.innerHTML += `<option>
     ${el}
    </option>`;
  filterLevel.innerHTML += `<option>
     ${el}
    </option>`;
});

workersForm.addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("was-validated");
  if (this.checkValidity()) {
    let {
      firstName,
      lastName,
      address,
      birthday,
      position,
      level,
      salary,
      isMarried,
    } = this.elements;
    let worker = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      birthday: birthday.value,
      position: position.value,
      level: level.value,
      salary: salary.value,
      isMarried: isMarried.checked,
    };

    workers.push(worker);
    this.classList.remove("was-validated");

    firstName.value = "";
    lastName.value = "";
    address.value = "";
    birthday.value = "";
    position.value = "";
    level.value = level[0];
    salary.value = "";
    isMarried.checked = false;

    localStorage.setItem("workers", JSON.stringify(workers));
    bootstrap.Modal.getInstance(workersModal).hide();
    getWorkers();
  }
});

function getWorkerRow(
  {
    firstName,
    lastName,
    address,
    birthday,
    position,
    level,
    salary,
    isMarried,
  },
  i
) {
  console.log(firstName);

  return `<tr>
              <th scope="row">${i + 1}</th>
              <td>${firstName}</td>
              <td>${lastName}</td>
              <td>${address}</td>
              <td>${birthday}</td>
              <td>${position}</td>
              <td>${level}</td>
              <td>${salary}$</td>
              <td>${isMarried ? "Yes" : "No"}</td>
              <td>
                <button onClick = "editWorker(${i})" data-bs-toggle="modal"
          data-bs-target="#crud-modal" class="btn btn-primary" >
                  <i class="bx bx-edit"></i>
                </button>
                <button onClick = "deleteWorker(${i})" class="btn btn-danger">
                  <i class="bx bxs-message-square-x"></i>
                </button>
              </td>
            </tr>`;
}

function getWorkers() {
  workersTableBody.innerHTML = "";

  workers.map((el, i) => {
    workersTableBody.innerHTML += getWorkerRow(el, i);
  });
}

getWorkers();

function deleteWorker(i) {
  let checkDelete = confirm("Are you sure you want to delete ?");

  if (checkDelete) {
    workers.splice(i, 1);
    localStorage.setItem("workers", JSON.stringify(workers));
    getWorkers();
  }
}

function editWorker(i) {
  let worker = workers[i];

  workersForm.firstName.value = worker.firstName;
  workersForm.lastName.value = worker.lastName;
  workersForm.address.value = worker.address;
  workersForm.birthday.value = worker.birthday;
  workersForm.position.value = worker.position;
  workersForm.level.value = worker.level;
  workersForm.salary.value = worker.salary;
  workersForm.isMarried.checked = worker.isMarried;
}
