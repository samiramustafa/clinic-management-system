// const nodemailer = require('nodemailer');

// const sendRejectionEmail = async (patientEmail, appointmentTime) => {
//     try {
//         // إنشاء كائن النقل (Transporter)
//         let transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "drnasser.khairy@gmail.com",
//                 pass: "ohty xofz echq cevu",
//             },
//         });

//         // إعداد رسالة البريد الإلكتروني
//         let mailOptions = {
//             from: 'drnasser.khairy@gmail.com',
//             to: patientEmail,
//             subject: 'Appointment Rejection',
//             text: `We regret to inform you that your appointment for ${appointmentTime} has been rejected by the doctor.`,
//         };

//         // إرسال البريد الإلكتروني
//         let info = await transporter.sendMail(mailOptions);

//         console.log('Message sent: %s', info.messageId);
//     } catch (error) {
//         console.error('Error sending email: ', error);
//     }
// };

// export default sendRejectionEmail;