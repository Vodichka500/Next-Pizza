'use client';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {useRouter} from "next/navigation";
import RegistrationForm from "@/components/auth/registrationForm";
import {useState} from "react";

const RegistrationModal = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="flex justify-center w-[400px]">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Registration</DialogTitle>
                        <DialogDescription>Registration Form</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div>
                    <RegistrationForm isModal={isOpen} setIsOpen={setIsOpen}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default RegistrationModal