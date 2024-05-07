  /* 
  Sam Craft
  craftsam@iastate.edu
  4/20/2024
  
  */


function refreshBots() {

  
  fetch("http://localhost:8081/listRobots")
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      loadRobots(data);
    });

  function loadRobots(myRobots) {
    var mainContainer = document.getElementById("robots");

    mainContainer.innerHTML = "";

    for (var i = 0; i < myRobots.length; i++) {
      let title = myRobots[i].name;
      let year = myRobots[i].price;
      let url = myRobots[i].imageUrl;

      let div = document.createElement("div");
      div.innerHTML = `<h3> ${title}</h3> 
       ${year}
       <img src=${url} width = "200">`;

      mainContainer.appendChild(div);
    }
  }
}

var id = 0;

function oneBot(myRobot) {
  var mainContainer2 = document.getElementById("robots2");

  mainContainer2.innerHTML = "";

  let title = myRobot.name;
  let year = myRobot.price;
  let url = myRobot.imageUrl;

  let div = document.createElement("div");
  div.innerHTML = `<h3> ${title}</h3> <br> 
          ${year} <br> 
          <img src=${url} width = "200"> <br> <br>`;

  mainContainer2.appendChild(div);
}

refreshBots();

var mainContainer3 = document.getElementById("input");

mainContainer3.innerHTML = "";

let div = document.createElement("div");
div.innerHTML = `
<button onclick = "refreshBots()">All Robots</button> <br>
<input type="number" placeholder="Which robot" id = "inputBox">
<button onclick = "changeID()">Select Robot</button> <br>
<button onclick="addOneBot()">Add Robot</button> <br>
<input type="number" id="deleteRobotById" placeholder="Enter Robot ID">
<button onclick="deleteOneRobot()">Delete Robot</button> <br>
<input type="number" id="updateRobotById" placeholder="Enter Robot ID"> 
<button onclick="updateOneRobot()">Update Robot</button>

`;
mainContainer3.appendChild(div);

function changeID() {
  id = document.getElementById("inputBox").value;

  fetch("http://localhost:8081/" + id)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      oneBot(data);
    });
}

function addOneBot() {
  const newBot = {
    id: 4,
    name: "Robot 4",
    price: 100.9,
    description: "Another Robot",
    imageUrl: "https://robohash.org/robot4",
  };

  console.log(newBot);
  console.log(JSON.stringify(newBot));

  fetch("http://localhost:8081/addRobot", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newBot),
  });
}

function deleteOneRobot() {
  // Fetch the value from the input field
  let id = document.getElementById("deleteRobotById").value;
  console.log(id);
  fetch(`http://localhost:8081/deleteRobot/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  }).then((response) => response.json());
}

function updateOneRobot() {
  // Fetch the value from the input field
  let id = document.getElementById("updateRobotById").value;
  console.log(id);
  fetch(`http://localhost:8081/updateRobot/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Super robot",
      price: 300000,
      description: "Robot has been updated",
      imageUrl: "https://robohash.org/robot1",
    }),
  });
}
