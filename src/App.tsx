import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [sentmesaage, setSentMessage] = useState('')
  const [message, setMessage] = useState('')
  const [socket,setscoket]=useState<null | WebSocket>(null)
  const handlesend=()=>{
    if(!socket)
    {
      console.log('socket is not connected')
    }
    else
    {
      socket.send(sentmesaage)
      console.log('message sent')
    }
  }

  const handleclose=()=>{
    if(!socket)
    {
      console.log('socket is not connected')
    }
    else
    {
      setMessage('connection closed')
      socket.close()
      console.log('socket closed')
    }
  }
  useEffect(()=>{
      const socket = new WebSocket('ws://localhost:8080')//websocket is a browser api and the 
      socket.onopen = () => {
        console.log('WebSocket Client Connected');
      }
      
      socket.onmessage = (message) => {
        console.log('Received: ' + message.data);
        setMessage(message.data)
      }
      socket.onclose = () => {
        console.log('WebSocket Client Disconnected');
      }
      socket.onerror = (error) => {
        console.log('WebSocket Error: ' + error);
      }
      setscoket(socket)
  },[])
  if(!socket)
  {
    return <div>Loading...</div>
  }
  return (
    <>
     <input type="text" onChange={(e)=>{
      setSentMessage(e.target.value)
      console.log(sentmesaage)

     }}/>
      <button onClick={handlesend}>Send</button>
      message: {message}

      <button onClick={handleclose}>Close</button>
    </>
  )
}

export default App
