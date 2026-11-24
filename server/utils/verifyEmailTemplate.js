const verifyEmailTemplate = ({ name, url }) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111827;">Hello ${name || 'there'},</h2>
          <p style="font-size: 16px; color: #374151;">Thank you for registering PakhtoonMart.</p>
          <p style="font-size: 16px; color: #374151;">Please verify your email by clicking the button below:</p>
          <div style="margin: 24px 0;">
              <a href="${url}" style="display: inline-block; background: #f59e0b; color: #111827; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">
                  Verify Email
              </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">If the button does not work, copy and open this link in your browser:</p>
          <p style="font-size: 14px; color: #2563eb; word-break: break-all;">${url}</p>
      </div>
  `
}

export default verifyEmailTemplate
