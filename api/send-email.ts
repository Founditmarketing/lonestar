export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      notes,
      model,
      size,
      sidingColor,
      trimColor,
      roofType,
      cashPrice,
      rtoTerm,
      rtoPayment,
      dealership,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return res.status(500).json({ error: 'Email service is not configured.' });
    }

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: #1e293b; padding: 32px 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 4px;">New Custom Quote Request</h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">Lone Star Sheds — Build Configurator</p>
        </div>

        <!-- Customer Info -->
        <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; border-left: 3px solid #d97706; padding-left: 10px;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Dealer</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${dealership || 'No preference'}</td>
            </tr>
          </table>
        </div>

        <!-- Build Specs -->
        <div style="padding: 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; border-left: 3px solid #d97706; padding-left: 10px;">Build Specifications</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;">Model</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${model}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Size</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${size}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Siding</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${sidingColor}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Trim</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${trimColor}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Roof</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${roofType}</td>
            </tr>
          </table>
        </div>

        <!-- Pricing -->
        <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; border-left: 3px solid #d97706; padding-left: 10px;">Estimated Pricing</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;">Cash Price</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 16px; font-weight: 700;">${cashPrice}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">RTO Term</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${rtoTerm} months</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Monthly Pmt</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${rtoPayment}/mo</td>
            </tr>
          </table>
        </div>

        <!-- Notes -->
        ${notes ? `
        <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px; border-left: 3px solid #d97706; padding-left: 10px;">Additional Notes</h2>
          <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0; background: #f1f5f9; padding: 12px; border-radius: 6px;">${notes}</p>
        </div>
        ` : ''}

        <!-- Footer -->
        <div style="padding: 20px 24px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">This email was sent from the Lone Star Sheds website configurator.</p>
          <p style="color: #94a3b8; font-size: 11px; margin: 4px 0 0;">Reply directly to this email to contact the customer at <strong>${email}</strong>.</p>
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lone Star Sheds <hello@lonestarshedsllc.com>',
        to: ['lyndon@lonestarshedsllc.com'],
        reply_to: email,
        subject: `New Quote Request: ${model} — ${size}`,
        html: htmlBody,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to send email.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Send email failed:', error);
    return res.status(500).json({ error: 'An unexpected error occurred while sending the email.' });
  }
}
