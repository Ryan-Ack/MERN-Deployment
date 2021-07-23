import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';


const Details = (props) => {
    const { id } = props
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [deleteCheck, setDeleteCheck] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/' + id)
            .then(res => {
                setTitle(res.data.title)
                setRating(res.data.rating)
                setUsername(res.data.username)
                setLoaded(true)
            })
    })

    const deleteMovie = () => {
        axios.delete(`http://localhost:8000/api/movies/` + id)
            .then(res => {
                navigate("/movies")
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2>{title} </h2>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{title}</td>
                        <td>{rating}</td>
                        <td>{username}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <input type="checkbox" onChange={(e) => setDeleteCheck(!deleteCheck)} />
                {deleteCheck ?
                    <dialog open> < button onClick={deleteMovie}> Delete </button> </dialog> :
                    <label> Check This Box to Delete </label>
                }
                <hr />
            </div >
        </div >

    )
}

export default Details
