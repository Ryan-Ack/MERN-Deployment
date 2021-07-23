import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from '@reach/router'


const Main = () => {
    const [movieList, setMovieList] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getMoviesFromDB()
    }, [])

    const getMoviesFromDB = () => {
        axios.get("http://localhost:8000/api/movies")
            .then(res => {
                setMovieList(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loaded && movieList.map((movie, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                                </td>
                                <td>{movie.rating}</td>
                                <td>
                                    <Link to={`/movies/${movie._id}`}> <button> Read Reviews </button> </Link>
                                    <Link to={`/movies/edit/${movie._id}`}> <button> Edit This Movie</button> </Link>
                                </td>
                                <td> <Link to={`/movies/${movie._id}`}></Link></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Main
