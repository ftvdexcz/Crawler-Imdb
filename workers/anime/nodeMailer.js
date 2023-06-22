const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const html = `
    <h1>Test</h1>
    <p>Test</p>
`
const sendEmail = async (to) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const message = {
            from: process.env.EMAIL,
            to: to,
            subject: 'Test',
            text: 'Test',
            html: html
        }
        const info = await transporter.sendMail(message)
        console.log("Message sent: %s", info.messageId)
    } catch (error) {
        console.log(error)
    }
}
 
module.exports = sendEmail;