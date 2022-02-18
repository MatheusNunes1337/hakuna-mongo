const transporter = require('../../config/nodemailer')

class MailService {
    send({ receiverEmail }) {
        return transporter.sendMail({
            from: `"${process.env.MAIL_SENDER_NAME}" ${process.env.MAIL_SENDER_EMAIL}`,
            to: receiverEmail,
            subject: "Recuperação da senha de acesso",
			html: '<h1>Recuperação da senha de acesso</h1><p>Para recuperar a sua senha clique no link e você será redirecionado a uma página para redefinir a sua senha.</p><a href="http://hakunaaa.herokuapp.com/redefine-pass">redefinir senha<a/>'
        })
    }
}

module.exports = new MailService()