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
    div.innerHTML = `<h3> ${title}</h3> <br> 
       ${year} <br> 
       <img src=${url} width = "200">`;

    mainContainer.appendChild(div);
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

var mainContainer3 = document.getElementById("input");

mainContainer3.innerHTML = "";

let div = document.createElement("div");
div.innerHTML = `
<input type="number" placeholder="Which robot" id = "inputBox">
<button id = "buttonInput">Click me!</button>
`
mainContainer3.appendChild(div);


document.getElementById("buttonInput").onclick = function changeID() {

  id = document.getElementById("inputBox").value

  fetch("http://localhost:8081/"+id)
.then(function (response) {
  return response.json();
})

.then(function (data) {
  oneBot(data);
});

  
}




