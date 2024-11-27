"use client"
import { useFormik} from "formik"
import * as yup from "yup";
import { TextField, Button } from "@mui/material";
import {FaUserEdit} from "react-icons/fa";

const schema = yup.object().shape({
firstName: yup.string().required().min(3),
lastName: yup.string().required().min (3),
phone: yup.string().required().min (11).max(17),
address: yup.string().required().min (12). max(300)
});

export default function UpdateProfile () {

    const { handleSubmit, handleChange, handleBlur, errors, touched, value} = useFormik({
        initialValues: {firstname: "", lastname: "",phone: "", address:""},
        onSubmit: ()=> {},
        validationSchema: schema
    });

    return (
        <main className="flex justify-center px-2 md:px-16 lg:px-20 py-16 bg-gray-200">
            <div className="w-full md:w-[400px] p-4 rounded-md bg-gray-50">
            <blockquote>
                <FaUserEdit className="text-2xl"/> 
                <span className="block text-2xl">Update Your Profile</span>
            </blockquote>

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-3">
                    <TextField
                    type="text"
                    id="firstName"
                    label= "frist name"
                    variant="outlined"
                    value={value?.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg Ademola"
                    className="w-full"
                    />
                    {touched?.firstName && errors?.firstName ? <span className="text-xs text-red-500">{errors?.firstName}</span> : null}
                 </div>
                <div className="mb-3">
                    <TextField
                    type="text"
                    id="lastname"
                    label= "frist name"
                    variant="outlined"
                    value={value?.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg Ademola"
                    className="w-full"
                    />
                    {touched?.lastname && errors?.lastname ? <span className="text-xs text-red-500">{errors?.lastname}</span> : null}
                 </div>
                <div className="mb-3">
                    <TextField
                    type="text"
                    id="firstName"
                    label= "frist name"
                    variant="outlined"
                    value={value?.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg Ademola"
                    className="w-full"
                    />
                    {touched?.firstName && errors?.firstName ? <span className="text-xs text-red-500">{errors?.firstName}</span> : null}
                 </div>
            <button type="submit" variant="contained">Update Profile</button>
            </form>
            </div>
        </main>
    )
}