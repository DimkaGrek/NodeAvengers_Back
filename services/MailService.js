import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.trasporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        try {
            await this.trasporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: "Activation account on " + process.env.API_URL,
                text: "",
                html: `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                
                `,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async sendRestoreMail(to, restoreNumber) {
        await this.trasporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Restore Password on " + process.env.API_URL,
            text: "",
            html: `
                    <div>
                        <h1>Restore number for new password:</h1>
                        ${restoreNumber}
                    </div>
                `,
        });
    }

    async sendPasswordMail(to, password) {
        await this.trasporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Your Password on " + process.env.API_URL,
            text: "",
            html: `
                    <div>
                        <h1>For sing in using email/password, please use this password.</h1>
                        ${password}
                    </div>
                `,
        });
    }

    async sendSupportMail(to, title, description, userEmail) {
        await this.trasporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Support needed from ${userEmail} ` + process.env.API_URL,
            text: "",
            html: `
                    <div>
                        <h1>Support Task pro</h1>

                        <h2><u>User email:</u> ${userEmail}</h2>

                        <h2><u>Subject:</u> ${title}</h2>
                        <h2><u>Description:</u></h2>
                        <h3>${description}</h3>
                    </div>
                `,
        });
    }
}

export default new MailService();
