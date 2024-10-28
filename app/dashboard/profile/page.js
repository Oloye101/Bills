import link from "next/link";
import Image from "next/image";

export default function () {
    return (
        <main className="min-h-screen flex justify-center py-4 md: py-6 lg:py-8 px-4 md:px-12 lg:px-16 bg-gray-100">
        <div className="w-full md:w-[380] flex  flex-col gap-4 border border-gray-200 rounded-md bg-gray-50 p-2 md:p-6"> 
            <div className="flex justify-center">
        <Image
        width={80}
        height={80}
        src="/facebookIcon.png"
        alt=" profile photo"
        className="rounded full"/>
        </div>

        </div>

        </main>
    )
}