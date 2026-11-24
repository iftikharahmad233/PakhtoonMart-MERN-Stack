import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.RESEND_API) {
  console.log('Provide RESEND_API in the .env file')
}

const resend = new Resend(process.env.RESEND_API)
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `PakhtoonMart <${resendFromEmail}>`,
      to: sendTo,
      subject,
      html,
    })

    if (error) {
      console.error('Resend email error:', error)
      throw new Error(error.message || 'Failed to send email')
    }

    return data
  } catch (error) {
    console.log('Send email failed:', error)
    throw error
  }
}

export default sendEmail
