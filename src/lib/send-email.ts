import {Resend} from "resend";

export const sendEmail = async (template, to, subject) => {

    const resend = new Resend(process.env.RESEND_API_KEY);


    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react: template,
    });

    if(error){
        throw new Error(error)
    }

    return data
}