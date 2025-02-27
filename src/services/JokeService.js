export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const postJoke = async (jokeInput) => {; 
    const postoptions = {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": jokeInput,
            "told": false
        }) 
}
await fetch("http://localhost:8088/jokes", postoptions)
}



