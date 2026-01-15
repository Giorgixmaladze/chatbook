const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"gmail-smtp-in.l.google.com",
    port:2525,
    auth: {
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
})


const sendEmail = async (to,subject,text) => {
try{
    const mailOptions = {
        from: "noreply@example.com",
        to,
        subject,
        text,
        html: `<a href="${text}" style="color:green;text-align:center;">${text}</a>`
    }
    await transporter.sendMail(mailOptions)
}catch(error){
    console.error("Email sending error: ", error.message)
    throw error
}

}

module.exports = {sendEmail}