import { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import axios from 'axios'
import { Button } from "./Button";
import { useNavigate } from 'react-router-dom'

export const Users = () =>{
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    const navigate = useNavigate();
    useEffect( ()=>{
        const response = axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
        response.then((res)=>{
            setUsers(res.data.user)
            // console.log("Received data:", res.data);
        }).catch((err)=>{
            console.log("Something wrong with backend ... " + err )
        })
    }, [filter])

    return <div className="flex ml-10 mr-10 flex-col justify-center mt-4">
        <SearchBar onChange={(e) =>
            setFilter(e.target.value)
        } />

        {users.map( (u, idx) => {
            return <>
                <User user={u} idx = {idx}/>
            </>    
        })}

        <User user={"sahil"} />
    </div>

    function User({user, idx}){
        return <div id={idx} className="flex flex-row justify-between h-15 shadow-2xs" >
            <div className="flex flex-col justify-center">
                <div className="flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                <div className="ml-5">{user.firstName}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
            <Button label={"Send Money"} onClick={()=>{
                navigate("/transfer?id=" + user._id + "&name=" + user.firstName)
            }}/>
            </div>

        </div>

    }
}