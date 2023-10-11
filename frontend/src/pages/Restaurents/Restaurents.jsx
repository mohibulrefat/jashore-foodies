import { useEffect, useState } from "react"

const Restaurents = () => {
    const[restarents, setRestaurents] = useState([])
    useEffect(()=>{
        fetch("restaurents.json")
        .then(res => res.json())
        .then(data => setRestaurents(data))
    },[])
  return (
    <div>Restaurents Size {restarents?.length}</div>
  )
}

export default Restaurents;