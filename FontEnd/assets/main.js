function addNewData() {
  var update_button = document.getElementById("update_form");
  update_button.disabled = true;
  var submit_button = document.getElementById("submit_form")
  submit_button.disabled = false;
  document.getElementById("employee_form").reset();

}
function buildTable(data) {
  console.log(data);
  var table = document.getElementById("employee-list");
  for (var i = 0; i < data.length; i++) {
    
    var row = `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].address}</td>
                    <td>${data[i].salary}</td>
                    <td>
                    <button type="button" onclick= 'getDataById(${data[i].id})'
                     data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="true"
                    aria-controls="collapseExample"
                    class="btn btn-outline-info mx-3"><i class="fa fa-pencil"></i> Edit</button>
                    <button type="button" onClick= "deleteData(${data[i].id})" class="btn btn-outline-danger"><i class="fa fa-trash"></i> Delete</button>
                    </td> 
                </tr>`;
    table.innerHTML += row;
  }
}

// fetch data from api
function getData() {
  fetch("http://localhost:5000/api/employees")
    .then((response) => response.json())
    .then((data) => {
      buildTable(data);
    })
    .catch((err) => console.log(err));
}

getData();

// create new data
function createNewData() {
    
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var mobile = document.getElementById("mobile").value;
  var salary = document.getElementById("salary").value;
  var gender;
  if(document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  }
  else if(document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }
  console.log("gender is " + gender);
  console.log("cretaed new data");

  var form_data = { name: name, email: email, address: address, mobile: mobile, salary: salary, gender: gender};
  console.log(form_data);

  fetch("http://localhost:5000/api/employees/", {
    method: "POST",
    body: JSON.stringify(form_data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
      buildTable(data);
    });

  document.getElementById("employee_form").reset();
}
// Get Form data by Id
function getDataById(id) {
 
  var update_button = document.getElementById("update_form");
  update_button.disabled = false;
  var submit_button = document.getElementById("submit_form")
  submit_button.disabled = true;

  fetch("http://localhost:5000/api/employees/" + id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("id").value = data[0].id;
      document.getElementById("name").value = data[0].name;
      document.getElementById("email").value = data[0].email;
      document.getElementById("address").value = data[0].address;
      document.getElementById("mobile").value = data[0].mobile;
      document.getElementById("salary").value = data[0].salary;
      if (document.getElementById("male").value == data[0].gender)
      {
        document.getElementById("male").checked = true;
      }
      else if (document.getElementById("female").value == data[0].gender){
        document.getElementById("female").checked = true;
      }
    });

}

// update data
function updateData() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var mobile = document.getElementById("mobile").value;
  var salary = document.getElementById("salary").value;
  var gender;
  if(document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  }
  else if(document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }
  console.log("gender is " + gender);
  var form_data = { id: id, name: name, email: email, address: address, mobile, salary: salary, gender: gender};
  console.log(form_data);
  fetch("http://localhost:5000/api/employees/" + id, {
    method: "PUT",
    body: JSON.stringify(form_data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      // location.reload();
      buildTable(data);
    });
}

// delete data
function deleteData(id) {
  let url = "http://localhost:5000/api/employees/" + id;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
      buildTable(data);
    });
}
