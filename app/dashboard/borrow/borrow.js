"use client"
import {useState,useEffect} from "react";
import { TextField } from "@mui/material";
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";



const schema = yup.object().shape({
    amount:yup.number(). required().min(1000),
})

const duration = [
    { id: "7", days:7 },
    { id: "30", days: 30 },
    { id: "90", days: 90 },
];
export function Borrow(userId) {
    const [clickedRate, setClickedRate] = useState(undefined);
    const [rate, setRate] = useState(0);
    const [payback, setpayback] = useState(undefined);4
    const [loanduration, setLoanduration] = useState(0);
    // const [loadDate, setloadDate] = useState(0);
    const [opsprogress, setOpsProgress] = useState(false);

        const {handleSubmit, handleChange, values, touched,errors} = useFormik({
        initialValues: {

            amount:undefined
        },
        onSubmit: async () => {
            setOpsProgress(true);

            await addDoc(collection(db, "loans"), {
                user: userId,
                amount: values.amount,
                payback: payback,
                rate: rate,
                duration: loanduration,
                timecreated: new Date().getTime()
            })
            .then(() => {
                setOpsProgress(false);
                alert(`you have successfully borrowed ${values.amount} at the rate of ${rate}`)
            })
                .catch(e => {
                    setopsprogress(false);
                    console.error(e);
                    alert("you have encountered an unknown error")
            })
        },
        validationSchema:schema
    })
    useEffect(() => {
        if (values.amount >= 1) {
            const Interest = (rate * values.amount) / 100;
            setpayback(values.amount + Interest)
                    }
    }, [values.amount, rate]
    );
    
    //  console.log(amount);
            return (
        <main className="min-h-screen flex justify-center py-4 md:py-6 px-4 md:px-6 lg:px-16 bg-gray-100">
            <div className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-200 bg-gray-50 rounded-md p-2  md:pb-6">
                <blockquote className="border-b border-gray-200 pb-3">
                    <span className="font-thin text-lg text-blue-700">Get an Instant Loan</span>
                </blockquote>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-grey-600 text-xs">How much Do you want to borrow?</label>
                        <TextField
                            id="amount"
                            type="number"
                            variaant="oulined"
                            placeholder="loan amount"
                            value={values.amount}
                            onChange={handleChange}
                        />
                        {touched.amount && errors.amount ? <span className="text-xs text-red-500">{errors.amount }</span> : null}
                    </div>
                    <div className="border-dash border border-blue-500 p-4 rounded-md">
                    <p className="tetx-blue-700 text-sm mb-3">choose loan duration</p>
                    <ul className="grid grid-cols-3 gap-2 ">
                        {
                            duration.map(item=><li
                                key={item.id}
                                onClick={() => {
                                    setClickedRate(item.id);
                                    if (item.days === 7) {
                                        setRate(15.5);
                                        setLoanduration(7)
                                    }
                                    else if (item.days === 30) {
                                        setRate(12)
                                        setLoanduration(30)
                                    }
                                    else if (item.days === 90) {
                                        setRate(9.5);
                                        setLoanduration(90)
                                    }
                                    
                                    // if (item.days === 7) {
                                    //     setLoanduration(7)
                                    // }
                                    // else if (item.days === 30) {
                                    //     setloanduration(30)
                                    // }
                                    // else if (item.days === 90) {
                                    //     // setloanDate(90)
                                    // }
                                }}
                                
                                className={'h-16 bg-blue-700 text-white text-md  uppercase rounded-md justify-center flex items-center'}>{item.days} Days</li>)
                        }
                        </ul>
                </div>
                <div className=" border-dash border border-blue-500 p-4 rounded-md">
                    {/* <p className="text-gray-800">Interest rate for {loadDate}days</p> */}
                    <p className="text-6xl text-blue-600"> { rate}%</p>
                </div>
                <div className="flex flex-col gap-3 bg-gradient-to-b from-blue-600 to to-blue-800 border-dash border border-blue-500 p-4 rounded-md">
                    <p className="text-blue-50">you will pay back</p>
                    <p className="text-4xl text-white"> ₦{ payback}</p>
                </div>
                
                    <div className="flex items-center gap-1">
                    <button type="submit" className="p-2 rounded-md bg-blue-500 text-white text-xl uppercase">Get loan</button>
                    <CircularProgress style={{ display: !opsprogress ? "none" : "flex" }} />
                </div>
                </form>
            </div>
    </main>
    )
}