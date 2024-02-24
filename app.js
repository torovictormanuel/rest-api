const express = require("express");
const movies = require("./movies.json");
const pelis = movies.peliculas;
const app = express();
app.disable("x-powered-by"); // deshabilitar el header express
app.use(express.json()); // middleware disponoible de express
const crypto = require("node:crypto");
const { validaciones, validParcialMovie } = require("./esquema");

console.log("llego esta shit", validaciones);

app.get("/", (req, res) => {
  res.json({ message: "Hola Mundo!" });
});

//todos los recursos en sean MOVIES  se identifica con  /movies
app.get("/movies", (req, res) => {
  const { genero } = req.query; //si no hay genero devuelv todo lo que esta en la lista

  if (genero) {
    const filterMovies = pelis.filter(
      (movie) => movie.genero.toLowerCase() === genero.toLowerCase()
    );
    return res.json(filterMovies);
  } else {
    res.json(movies);
  }
});


app.get("/movies/:id", (req, res) => {
  const { id } = req.params; //destructuring de parametros
  const movieFind = pelis.find((movie) => {
    return movie.id === parseInt(id);
  });

  if (movieFind) {
    return res.json(movieFind);
  } else {
    return res.status(404).json({ msg: "No existe la pelicula" });
  }
});


app.post("/movies", (req, res) => {
  console.log("hablame", validaciones);
  const result = validaciones(req.body); //validar si cumple las reglas definidas en esquemas

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error) });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  pelis.push(newMovie);
  res.status(201).json(newMovie);
});
const cantidad = pelis.length;
console.log(cantidad);


app.path("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movieIndex = pelis.findIndex((peli) => peli.id === parseInt(id));
  console.log("qlq", movieIndex);

  if (movieIndex == -1) {
    return res.status(404).json({ message: "movie not found" });
  }
  const update = {
    ...pelis[movieIndex],
    ...result.data,
  };
  pelis[movieIndex] = update;
  return req.json(update);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`servidor disponible en http://localhost:${PORT}`);
});

console.log("ya toy en el server");
