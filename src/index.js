const express = require('express');
const app= express();
const morgan =require('morgan');
const _ =require('underscore');

//seccion de configurafion
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
//seccion de los middleware

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// seccion donde implemento mis rutas ejemplo con carpeta  
// ruta 1 
app.get('/test',(req, res)=>{
    const data = {
        "name": "Victor",
        "Facebook": "Victor Monroy"
    };
    res.json(data); 
});

// en esta cosntante retormo los datos que tengo en semple
const movies = require('./semple.json');
//ruta de movies
app.get('/api/movies',(req, res)=>{
    res.json(movies);
});
//en esta ruta estamos add una nueva movie a nuestro arreglo 
app.post('/api/movies',(req, res)=>{
    const { title, director, year, rating }= req.body;
    if (title && director && year && rating) {
        const id = movies.length + 1;
        const newMovie = {...req.body, id};
        movies.push(newMovie);
        res.json(movies);
    } else{
        res.status(500).json({error: 'no guardado'});
    }  
});
//
app.put('/api/movies/:id',(req, res)=>{
    const {id} = req.params;
    const { title, director, year, rating }= req.body;
    if (title && director && year && rating) {
    _.each(movies, (movie, i) => {
        if (movie.id ==id) {
            movie.title = title;
            movie.director = director;
            movie.year = year;
            movie.rating = rating;
        }
    });
    res.send(movies);
} else{
    res.status(500).json({error: 'no guardado'});
}
});
//en esta ruta eliminaremos una movie
app.delete('/api/movies/:id',(req, res)=>{
    const {id} = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id ==id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);
});


//seccion de inicio de servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


// proyecto inserta elimina y edita desde postman 