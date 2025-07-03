import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Dashboard (){
    const navigate = useNavigate();
    useEffect(()=>{
    const fetchUserDetailsFromAuthService = async ()=>{
        try{
            const user = await fetchUserDetails()
            if(!user){
                navigate('/signin')
            }
        }
        catch{
            console.log("User not logged in ")
        }
    }
    fetchUserDetailsFromAuthService()
        },[])
    return <div>
        <Appbar/>
        <div>
            <Balance balance={100}/>
            <Users/>
        </div>
    </div>
}