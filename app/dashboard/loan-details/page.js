"use server"
import { auth } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import LoanDetails from "./loan-details";


export default async function page() {
    const session = await auth();
    return (
        <>
            <AuthorizationCheck />
            <LoanDetails user={ session?.user} />
            
        </>
    )
}