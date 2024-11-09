import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [vehicles, setVehicles] = useState([])
  const [name,setName] = useState("")
  const [newName,setNewName] = useState("")
  const [vprice , setVprice] = useState(0)
  useEffect(()=>{
    fetchData()

  },[])
  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/account/vehicle/")
    const data = await response.json()
    console.log(data)
    setVehicles(data)

  }


  const handleAddElement = async () =>{
    const bookData = {
      name,
      price:vprice,

    }
    try{
      const response = await fetch("http://127.0.0.1:8000/account/vehicle/create/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(bookData),

      });
      const data = await response.json()
      setVehicles(prev=>[...prev,data])
      console.log(data)

    }catch(err){
      console.log(err)
    }
  }
  const handleNewTitle = async (pk,price) =>{
    const vehicleData = {
      name:newName,
      price,

    }
    try{
      const response = await fetch(`http://127.0.0.1:8000/account/vehicle/${pk}/`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(vehicleData),

      });
      const data = await response.json()
      setVehicles(prev=>
        prev.map((vehicle)=>{
          if(vehicle.id === pk){
            return data
          }else{
            return vehicle
          }
        
      }))

    }catch(err){
      console.log(err)
    }

  }
  const handleDelete = async (pk) =>{

    try{

      await fetch(`http://127.0.0.1:8000/account/vehicle/${pk}/`,{
        method:'DELETE',


      });
      setVehicles(prev=>prev.filter((vehicle)=>vehicle.id !== pk))

    }catch(err){
      console.log(err)
    }

  }

  return (
    <>
     <div>
      <h1>vehicle stoer</h1>
      <div>
        <input type="text" placeholder='write your vehicle name here....' onChange={(e)=>setName(e.target.value)} /><br />
        <input type="number" placeholder='price' onChange={(e)=>setVprice(e.target.value)}  /><br />
        <button onClick={handleAddElement}>add vehicle</button>

      </div>
      {vehicles.map((vehicle)=>(
        <div>
        <div>
          <p>Name:{vehicle.name}</p>
          <p>price:{vehicle.price}</p>
          <input type="text" placeholder='new name' onChange={(e)=>setNewName(e.target.value)} /><br />
          <button onClick={()=>handleNewTitle(vehicle.id,vehicle.price)}>change</button>
          <button onClick={()=>handleDelete(vehicle.id)}>delete</button>
        </div>
      </div>

      ))}
     </div>
    </>
  )
}

export default App
