import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'

const Update = (props) => {
    const { id } = props
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState("")
    const [dbErrors, setDBErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/' + id)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title)
                setRating(res.data.rating)
                setUsername(res.data.username)
                setLoaded(true)
            })
            .catch(err => { console.log(err) })
    }, [])
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
    const handleFormUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/movies/" + id, { title, rating, username })
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
    return (
        <div>
            {loaded && dbErrors ?
                dbErrors.map((err, index) => <p key={index}>Error: {err}  </p>)
                : ""
            }
            <form onSubmit={handleFormUpdate}>
                <div>
                    <label htmlFor="">Movie Title: </label>
                    <input type="text" name={title} onChange={handleTitle} value={title} />
                    <br />
                    {
                        titleError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{titleError}</p> :
                            ''
                    }
                </div>
                <div>
                    <label htmlFor="">Rating (0-5): </label>
                    <input type="number" name={rating} onChange={handleRating} value={rating} />
                    <br />
                    {
                        ratingError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{ratingError}</p> :
                            ''
                    }
                </div>
                <div>
                    <label htmlFor="">UserName: </label>
                    <input type="text" name={username} onChange={handleUsername} value={username} />
                    <br />
                    {
                        usernameError ?
                            <p style={{ color: 'red', display: 'inline-block' }}>{usernameError}</p> :
                            ''
                    }
                </div>
                <button>  Update </button>
                <button onClick={() => { navigate("/movies") }}>Cancel</button>
            </form>
        </div>
    )
}

export default Update
