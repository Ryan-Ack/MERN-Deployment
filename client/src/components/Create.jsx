import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';

const Create = () => {

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState("")
    const [dbErrors, setDBErrors] = useState("")
    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/movies", { title, rating, username })
            .then(res => {
                console.log(res.data)
                navigate("/movies")
            })
            .catch(err => {
                console.log(err)
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setDBErrors(errorArr)
            })
    }

    const [titleError, setTitleError] = useState("");
    const handleTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length < 1) {
            setTitleError("Title is required!");
        } else if (e.target.value.length < 3) {
            setTitleError("Title must be 3 characters or longer!");
        } else {
            setTitleError("")
        }
    }
    const [ratingError, setRatingError] = useState("");
    const handleRating = (e) => {
        setRating(e.target.value);
        if (e.target.value.length < 1) {
            setRatingError("Rating is required!");
        } else if (e.target.value < 1) {
            setRatingError("Rating cannot be lower than 1 star.");
        } else if (e.target.value > 5) {
            setRatingError("Rating cannot be greater than 5 stars.")
        } else {
            setRatingError("")
        }
    }
    const [usernameError, setUsernameError] = useState("");
    const handleUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length < 1) {
            setUsernameError("Username is required!");
        } else if (e.target.value.length < 10) {
            setUsernameError("Username must be 10 characters or longer!");
        } else {
            setUsernameError("")
        }
    }
    return (
        <div>
            {dbErrors ?
                dbErrors.map((err, index) => <p key={index}>Error: {err}  </p>)
                : ""
            }
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="">Movie Title: </label>
                    <input type="text" name={title} onChange={handleTitle} />
                    <br />
                    {
                        titleError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{titleError}</p> :
                            ''
                    }
                </div>
                <div>
                    <label htmlFor="">Rating (0-5): </label>
                    <input type="number" name={rating} onChange={handleRating} />
                    <br />
                    {
                        ratingError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{ratingError}</p> :
                            ''
                    }
                </div>
                <div>
                    <label htmlFor="">UserName: </label>
                    <input type="text" name={username} onChange={handleUsername} />
                    <br />
                    {
                        usernameError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{usernameError}</p> :
                            ''
                    }
                </div>
                <button> Submit </button>
                <button onClick={() => { navigate("/movies") }}>Cancel</button>
            </form>
        </div>
    )
}

export default Create
