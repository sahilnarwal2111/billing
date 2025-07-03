import axios from 'axios'
export const fetchUserDetails = async ()=>{
    try{
        const url = "http://localhost:3000/api/v1/user/me"
        const token = "Bearer " + localStorage.getItem("token")
        const response = await axios.get(url, {
            headers :{
                Authorization : token
            }
        });
        return response.data
    }
    catch (err) {
        console.error("Error in fetchUserDetails:", err.response?.status, err.response?.data || err.message);
        return null;
    }

}