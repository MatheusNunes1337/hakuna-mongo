const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_CONFIG_HOST,
	port: process.env.SMTP_CONFIG_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_CONFIG_USER, 
		pass: process.env.SMTP_CONFIG_PASS
	},
	tls:{
        rejectUnauthorized: false
    }
})

module.exports = transporter