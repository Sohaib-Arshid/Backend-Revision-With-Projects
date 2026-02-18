import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [jokes , setJokes] = useState([]);
  useEffect(()=>{
    axios.get('/api/jokes')
    .then((response) =>{
      setJokes(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  })
  return (
    <>
    <h1>
      hello world
      <p>Jokes : {jokes.length} </p>
      {
        jokes.map((Jokes , index)=>{
          <div key={Jokes.id}>
            <h1>{Jokes.title}</h1>
            <p>{Jokes.content}</p>
          </div>
        })
      }
    </h1>
    </>
  )
}

export default App
