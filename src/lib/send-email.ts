import {Resend} from "resend";
import {ReactNode} from "react";

export const sendEmail = async (template: ReactNode, to: string, subject: string) => {

    const resend = new Resend(process.env.RESEND_API_KEY);


    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react: template,
    });

    if(error){
        // Ensure `error` is a string or extract the message if it's an object
        const errorMessage = (error instanceof Error ? error.message : JSON.stringify(error));
        throw new Error(errorMessage);
    }

    return data
}