'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";
import {useFormik} from "formik";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import LoginForm from "@/components/auth/loginForm";

export default function Component() {
    const { data: session } = useSession()

    return (
        <div className="w-full mt-20 flex justify-center items-center">
            <LoginForm isModal={false}/>
        </div>
    )
}