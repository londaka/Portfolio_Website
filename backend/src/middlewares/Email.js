import { transporter } from "./emailService.js";

export const SendVerificationCode  = async (email,verificationCode) => {
    try {
        const response = await transporter.sendMail({
                 from: '"CodeBySanjay" <sanjayapokhrel41@gmail.com>',
                 to: email, // Send it to your own address for testing
                 subject: "Verify your Email",
                 text: "If you receive this, your setup is correct!",
                html: verificationCode,
           });
           console.log('Email send successfully', response)
    } catch (error) {
       console.log('Email error') 
    }
}
