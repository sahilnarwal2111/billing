import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"

export const SendMoney = ({receiver}) =>{
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0)
    const id = searchParams.get("id");
    const send = searchParams.get("name");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center h-full">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Send Money"} />
                <br/>
                <div className="ml-5 flex left-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    <div className="flex flex-col justify-center ml-5">
                        <p>{send}</p>
                    </div>

                </div>
                <br />
                <div className="ml-4">
                    <InputBox onChange={(e) =>
                        setAmount(e.target.value)
                    } placeholder={"Enter Amount"} label={"Amount (in Rs.)"} /> 
                </div>
                <br />
                <div >
                    <Button onClick={ async()=>{
                            const respose = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to : id,
                                amount : amount
                            },{
                                headers : {authorization : "Bearer " + localStorage.getItem("token")}
                            })


                        }
                    } label={"Send Money"}/>
                </div>
            </div>
        </div>
    </div>
}