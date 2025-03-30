const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // ل load متغيرات البيئة من ملف .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { patientEmail, appointmentTime } = req.body;

    try {
        // إنشاء كائن النقل (Transporter)
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // إعداد رسالة البريد الإلكتروني
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: patientEmail,
            subject: 'Appointment Rejection',
            text: `We regret to inform you that your appointment for ${appointmentTime} has been rejected by the doctor.`,
        };

        // إرسال البريد الإلكتروني
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});