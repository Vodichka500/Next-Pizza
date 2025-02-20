'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {Github} from "lucide-react";
import Image from "next/image";
import {useFormik} from "formik";
import loginValidationScheme from "@/components/auth/loginValidationScheme";
import {useState} from "react";
import {useRouter} from "next/navigation";

const LoginForm = ({isModal, setIsOpen}) => {
    const [loginError, setLoginError] = useState("");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationScheme,
        onSubmit: async (values) => {
            setLoginError("");
            const res = await signIn("credentials", {
                ...values,
                redirect: false,
            });
            if (res?.error) setLoginError("Неверный email или пароль");
            if (!res.error){
                router.push('/?loginSuccessful');
                if (isModal){
                    setIsOpen(false);
                }
            }
            console.log(res);
        },
    })

    return (
        <div className="py-4 px-2 w-[350px] bg-white rounded-2xl  flex flex-col justify-center items-center">
            <form onSubmit={formik.handleSubmit} className="w-full">
                <h1 className="text-xl font-bold">Войти</h1>
                <Input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.touched.email && formik.errors.email &&
                    <div className="text-sm text-red-400">{formik.errors.email}</div>}
                <Input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password*"
                    className="w-full border-2 border-gray-200 p-2 my-2 rounded-xl"
                />
                {formik.touched.password && formik.errors.password &&
                    <div className="text-sm text-red-400">{formik.errors.password}</div>}
                <Button
                    type="submit"
                    className="w-full text-primary hover:bg-primary hover:text-white"
                    variant='outline'
                >
                    Войти
                </Button>
                {loginError && <div className="text-sm text-red-400">{loginError}</div>}
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

            <Button
                className="w-full bg-white border-[1px] border-gray-800 mt-2 text-black hover:bg-gray-300"
                onClick={() => signIn('google', {
                    callbackUrl: '/?loginSuccessful',
                    redirect: true,
                })}>
                <div>
                    <Image src="/google-logo.svg" alt="google logo" height={20} width={20}/>
                </div>
                Google
            </Button>
        </div>
    )
}
export default LoginForm