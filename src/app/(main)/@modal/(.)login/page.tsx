'use client';
import LoginForm from "@/components/auth/loginForm";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {useRouter} from "next/navigation";
import {useState} from "react";

const LoginModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    return (
        <Dialog open={isOpen} onOpenChange={() => router.back()}>
            <DialogContent className="flex justify-center w-[400px]">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>Login page</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div>
                    <LoginForm isModal={true} setIsOpen={setIsOpen}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default LoginModal
