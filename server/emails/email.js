const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendHelloEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "peggyliu613@gmail.com",
        subject: "Welcome to Louis Bento",
        text: `Thanks for joining us, ${name}.`
    })
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "peggyliu613@gmail.com",
        subject: "Your account has been removed",
        text: "Sorry to see you leaving us. Hope to see you again in the future."
    })

}

module.exports = {
    sendHelloEmail,
    sendGoodByeEmail
}