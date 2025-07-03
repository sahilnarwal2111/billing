export function Balance({balance}){
    return <div className="flex ml-10 flex-col justify-center mt-4">
        <div className="font-sans text-base font-weight: 700" >
            <p className="font-bold">Your Balance : Rs. {balance}</p>
        </div>
    </div>
}