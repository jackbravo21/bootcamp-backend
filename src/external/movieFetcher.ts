import { Request, Response } from "express";
import axios from "axios";

const URL_MOVIES = "https://api.themoviedb.org/3/trending/all/week?api_key=8c9751844a68e8e7105d68bd90f6eb25";

const URL_CATEGORIES = "https://api.themoviedb.org/3/genre/movie/list?api_key=8c9751844a68e8e7105d68bd90f6eb25&language=en-US";

const URL_IMAGES = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

async function movieFetcher(req: Request, res: Response)
{
    //primeiro argumento do axios eh a nossa URL, e posso passar outras configs se quiser
    const getMovies = await axios(URL_MOVIES);
    
    const moviesList = getMovies.data.results;
    
    //console.log(getMovies.data.results);

    const getCategories = await axios(URL_CATEGORIES);
    const catsList = getCategories.data.results;

    //vai retornar um array de objetos e inicia vazio;
    const moviesArray: Object[] = [];

    //return(catsList);

    //preciso de um objeto que sera o filme;
    moviesList.map((obj: any) => {
        const MovieObj = {
            name: obj.original_title,
            category: obj.genre_ids,
            description: obj.overview,
            poster: URL_IMAGES + obj.poster_path,
            backdrop: URL_IMAGES + obj.backdrop_path
        }        
    });

    moviesArray.map((movie: any, moviesIndex: any) => {
        catsList.find((cat: any, catIndex: any) => {
            if(cat.id === movie.category[0])
            {
                movie.category = cat.name;
            }
        });
    });

    console.log(moviesArray);
    return res.status(200).json({
        moviesArray
    });


}

export { movieFetcher } ;