import LoginForm from "@/components/auth/loginForm";

export default function Component() {

    return (
        <div className="w-full mt-20 flex justify-center items-center">
            <LoginForm isModal={false}/>
        </div>
    )
}