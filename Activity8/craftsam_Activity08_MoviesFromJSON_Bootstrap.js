fetch("MoviesFromJSON.json")
.then(function (response) {
   return response.json()
  })

.then(function (data) {
   loadMovies(data)
  })


  function loadMovies(myMovies) {
    var cardMovie = document.getElementById("col")

    cardMovie.innerHTML = ""

    for (var i = 0; i < myMovies.movies.length; i++) {


        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        let addCardMovie = document.createElement("div")

        addCardMovie.classList.add("col")

        addCardMovie.innerHTML = `


        <div class="card shadow-sm">
           <img src = ${url} class = "card-img-top" alt = "..."></img>
            <div class="card-body">
              <p class="card-text"><strong>${title}</strong>, ${year}</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
          `

        
        cardMovie.appendChild(addCardMovie)
       }
    }