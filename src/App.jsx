import "./App.css"
import { useEffect, useState } from "react"
import { postJoke, getAllJokes } from "./services/JokeService.js"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [jokeInput, setJokeInput] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [toldJokesCount, setToldJokesCount] = useState(0)
  const [untoldJokesCount, setUntoldJokesCount] = useState(0)

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
      console.log("jokes set")
    })
  }, [])

  useEffect(() => {
      const filteredUntoldJokes = allJokes.filter(
        (joke) => joke.told === false)
        setUntoldJokes(filteredUntoldJokes)

     const filteredToldJokes = allJokes.filter((joke) =>
    joke.told === true)   
     setToldJokes(filteredToldJokes)
  
     setToldJokesCount(filteredToldJokes.length)

     setUntoldJokesCount(filteredUntoldJokes.length)
}, [allJokes] 
)


  return ( <div className="app-container">
    <div className="app-heading">
    <div className="app-heading-circle">
   <img className="app-logo" src={stevePic} alt="Good job Steve" />
 </div>
 
    <h1 className="app-heading-text">Chuckles Checklist</h1>
    </div>

    <h2 className="h2">Add Joke</h2>
    <div className="joke-add-form">

  <input
  className="joke-input"
  value={jokeInput}
  type="text"
  placeholder="New One Liner"
  onChange={(event) => { setJokeInput(event.target.value)
  }}
  />

<button
  className="joke-input-submit"
  onClick={() => {
    if (jokeInput !== "") {
      postJoke(jokeInput).then(() => {
        getAllJokes().then((jokesArray) => {
          setAllJokes(jokesArray); 
        });
      });
    }
    setJokeInput(""); 
  }}
>Add
  </button>
  </div>
  <div>
    <div className="joke-list-container">
  <h2 className="h2">
    <span className="untold-count">{untoldJokesCount}</span>Untold Jokes</h2>
  <div className="joke-list-container" >
{untoldJokes.map(joke => {
  return ( 
    <section key={joke.id}>
      {joke.text}
    </section>


  )
})}
  </div>
  <h2 className="h2">
    <span className="told-count">{toldJokesCount}</span>Told Jokes</h2>
  <div className="joke-list-container">
    {toldJokes.map((joke) =>(
      <section key={joke.id}>
        {joke.text}
      </section>
    ))}

  </div>
  </div>
  </div>
  
</div>
  )
}


