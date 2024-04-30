import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.trasporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
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
                    <div style="
                    border-radius: 8px;
                    background: #151515;
                    width: 800px;
                    font-style: Poppins;
                    text-align: center;
                    padding: 20px;
                    ">
                        <h1 style="
                        color: #FFFFFF;
                        margin: 0 0 16px 0;
                        ">To activate follow the link</h1>
                        <a
                        style="
                        color: #161616;
                        padding: 8px;
                        border-radius: 8px;
                        background:#BEDBB0;
                        font-size: 20px;
                        text-decoration: none;
                        "
                        href="${link}">Click on me</a>
                    </div>
                
                `,
            });
        } catch (error) {}
    }

    async sendRestoreMail(to, restoreNumber) {
        await this.trasporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Restore Password on " + process.env.API_URL,
            text: "",
            html: `
                    <div style="
                    border-radius: 8px;
                    background: #151515;
                    width: 200px;
                    font-style: Poppins;
                    text-align: center;
                    padding: 20px;
                    ">
                        <h1 style="
                        color: #FFFFFF;
                        margin: 0 0 16px 0;
                        ">Your code</h1>
                        <p
                        style="
                        color: #161616;
                        padding: 8px;
                        border-radius: 8px;
                        background:#BEDBB0;
                        font-size: 20px;
                        text-decoration: none;
                        "
                       >${restoreNumber}</p>
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
            cc: process.env.SMTP_USER,
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
