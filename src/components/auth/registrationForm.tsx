'use client'

import {useFormik} from "formik";
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";
import Image from "next/image";
import registrationValidationScheme from "@/components/auth/registrationValidationScheme";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {registerUser} from "@/app/actions";
import toast from "react-hot-toast";

const RegistrationForm = ({isModal, setIsOpen}) => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: registrationValidationScheme,
        onSubmit: async (values) => {
            const res = await registerUser(values);

            if (res){
                router.push('/login?loginSuccessful');
            } else {
                toast.error("Пользователь с таким email уже существует");
            }

            if (isModal){
                setIsOpen(false);
            }
            console.log(res);
        },
    })

    return (
        <div className="py-4 px-2 w-[350px] bg-white rounded-2xl  flex flex-col justify-center items-center">
            <form onSubmit={formik.handleSubmit} className="w-full">
                <h1 className="text-xl font-bold">Регистрация</h1>
                <Input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Name*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.errors.name && formik.touched.name &&
                    <div className="text-sm text-red-400">{formik.errors.name}</div>}
                <Input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.errors.email && formik.touched.email &&
                    <div className="text-sm text-red-400">{formik.errors.email}</div>}
                <Input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.errors.password && formik.touched.password &&
                    <div className="text-sm text-red-400">{formik.errors.password}</div>}
                <Input
                    type="password"
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    placeholder="Repeat password*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword &&
                    <div className="text-sm text-red-400">{formik.errors.repeatPassword}</div>}
                <Button
                    type="submit"
                    className="w-full text-primary hover:bg-primary hover:text-white"
                    variant='outline'
                >
                    Регистрация
                </Button>
            </form>

            <div className="w-full flex justify-between items-center gap-2 my-5">
                <div className="h-2 border-b border-black w-full"></div>
                <div className="block">или</div>
                <div className="h-2 border-b border-black  w-full"></div>
            </div>
            <Button
                className="w-full bg-black"
                onClick={() => signIn('github', {
                    callbackUrl: '/?loginSuccessful',
                    redirect: true,
                })
                }>
                <Github/>Github
            </Button>

            <Button className="w-full bg-white border-[1px] border-gray-800 mt-2 text-black hover:bg-gray-300">
                <div>
                    <Image src="/google-logo.svg" alt="google logo" height={20} width={20}/>
                </div>
                Google
            </Button>

        </div>
    )
}
export default RegistrationForm