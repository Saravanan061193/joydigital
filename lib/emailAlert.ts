import nodemailer from "nodemailer";

export interface LeadEmailData {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  service: string;
  companyName?: string;
  website?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source?: string;
  region?: string;
  createdAt?: string;
  utmParams?: any;
}

export async function sendEmailLeadAlert(lead: LeadEmailData) {
  const smtpUser = process.env.SMTP_USER || "saravanan061193@gmail.com";
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.CONTACT_EMAIL || "saravanan061193@gmail.com";

  if (!smtpPass) {
    console.warn("SMTP_PASS is not configured in environment variables. Email notification skipped.");
    return { success: false, reason: "No SMTP_PASS configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const submittedAt = lead.createdAt 
      ? new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) 
      : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e4e8; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 24px 30px; text-align: center; }
          .header h2 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 14px; }
          .badge { display: inline-block; background: #22c55e; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
          .content { padding: 25px 30px; }
          .table-data { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .table-data td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; vertical-align: top; font-size: 14px; }
          .table-data td.label { font-weight: 600; color: #4b5563; width: 35%; background: #f8fafc; border-radius: 6px; }
          .table-data td.value { color: #111827; font-weight: 500; }
          .message-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin-top: 20px; border-radius: 4px; }
          .message-box h4 { margin: 0 0 8px 0; color: #1e40af; font-size: 14px; }
          .message-box p { margin: 0; color: #1e293b; font-size: 14px; white-space: pre-wrap; }
          .action-btn { display: inline-block; background: #25d366; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin-top: 20px; text-align: center; }
          .footer { background: #f8fafc; padding: 15px 30px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚨 New Website Lead Received!</h2>
            <p>Joy Digital Website Notification</p>
            <span class="badge">NEW ENQUIRY</span>
          </div>
          <div class="content">
            <p style="font-size: 15px; margin-top: 0;">You have received a new enquiry on your website. Here are the details:</p>
            
            <table class="table-data">
              <tr>
                <td class="label">👤 Name</td>
                <td class="value"><strong>${lead.name}</strong></td>
              </tr>
              <tr>
                <td class="label">📱 Mobile / WhatsApp</td>
                <td class="value"><a href="tel:${lead.mobile}">${lead.mobile}</a></td>
              </tr>
              <tr>
                <td class="label">📧 Email</td>
                <td class="value"><a href="mailto:${lead.email}">${lead.email}</a></td>
              </tr>
              <tr>
                <td class="label">💼 Service Required</td>
                <td class="value"><strong>${lead.service}</strong></td>
              </tr>
              ${lead.companyName && lead.companyName !== "N/A" ? `
              <tr>
                <td class="label">🏢 Company</td>
                <td class="value">${lead.companyName}</td>
              </tr>` : ""}
              ${lead.budget && lead.budget !== "N/A" ? `
              <tr>
                <td class="label">💰 Budget</td>
                <td class="value">${lead.budget}</td>
              </tr>` : ""}
              ${lead.website && lead.website !== "N/A" ? `
              <tr>
                <td class="label">🌐 Website</td>
                <td class="value">${lead.website}</td>
              </tr>` : ""}
              <tr>
                <td class="label">📍 Source / Region</td>
                <td class="value">${lead.source || "Website"} (${lead.region || "GLOBAL"})</td>
              </tr>
              <tr>
                <td class="label">⏰ Time</td>
                <td class="value">${submittedAt}</td>
              </tr>
            </table>

            ${lead.message && lead.message !== "N/A" && lead.message !== "No details provided." ? `
            <div class="message-box">
              <h4>📝 Client Requirement / Message:</h4>
              <p>${lead.message}</p>
            </div>` : ""}

            ${lead.mobile ? `
            <div style="text-align: center;">
              <a href="https://wa.me/${lead.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for reaching out to Joy Digital regarding ${lead.service}.`)}" class="action-btn" target="_blank">
                💬 Reply on WhatsApp
              </a>
            </div>` : ""}
          </div>
          <div class="footer">
            Sent automatically to ${recipientEmail} via Gmail SMTP.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Joy Digital Leads" <${smtpUser}>`,
      to: recipientEmail,
      subject: `🚨 NEW LEAD: ${lead.name} (${lead.service})`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent via Gmail SMTP successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Failed to send email via Gmail SMTP:", error);
    return { success: false, error: error.message };
  }
}
