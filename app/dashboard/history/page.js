
"use client"
import React from "react";
import { db } from "@/config/firebase.config";
import { HistoryTab } from "@/app/components/HistoryTab";
import { collection, getDocs } from "firebase/firestore";

export default function History () {
    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        const handleFetchLoan = async () => {
            const q = collection (db, "loans");
            const onSnap = await getDocs (q);

            const compileResults = [];
            onSnap.docs.forEach(doc => {
                compileResults.push({
                    id:doc.id,
                    data:doc.data()
                });
                setLoans(compileResults)
            })
        }
        handleFetchLoan()
    },[]);
  
    return( 
        <main className="min-h-screen flex justify-center items-center bg-gradient-to-b from-sky-100 via-sky-200 to-blue-300">
            <div className="w-[380px] min-h-[400px] bg-white rounded-md p-4">
                <h1 className="text-xl text-gray-800 mb-4">My Loan History</h1>
                <div className="flex flex-col gap-4">
                {loans.map(loan => <HistoryTab 
                amount={6500}
                rate={12.5}
                duration={30}
                date= "13 Oct 2024"
                type="Personal"
                key={loan}/>)}
                </div>
            </div>
     </main>  
    )
}