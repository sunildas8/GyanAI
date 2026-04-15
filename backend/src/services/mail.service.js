import nodeMiler from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMiler.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
    }
})

transporter.verify()
    .then(() => {
        console.log('✅ Ready to send emails');
    }).catch((err) => {
        console.error('Email transporter verification failed:', err);
    });

export async function sendEmail({to, subject, text, html}) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    const details = await transporter.sendMail(mailOptions);
    console.log('Email sent:', details);
}