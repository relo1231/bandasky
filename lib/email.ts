async function sendBrevoEmail(payload: {
  to: string
  subject: string
  html: string
  senderName?: string
  senderEmail?: string
}) {
  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = payload.senderEmail ?? process.env.BREVO_SMTP_LOGIN ?? ''
  const senderName = payload.senderName ?? (process.env.NEXT_PUBLIC_NAZOV_FIRMY ?? 'Bandasky')

  if (!apiKey) throw new Error('BREVO_API_KEY nie je nastavený')

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: payload.to }],
      subject: payload.subject,
      htmlContent: payload.html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Brevo API error: ${err}`)
  }

  return res.json()
}

export async function posliEmailMajitelovi(data: {
  cisloDopytu: string
  meno: string
  firma: string | null
  email: string
  telefon: string
  sprava: string | null
  polozky: Array<{ nazov: string; mnozstvo: number; poznamka?: string | null }>
  prijemca: string
}) {
  const rows = data.polozky
    .map(
      (p) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2a45;">${p.nazov}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2a45;text-align:center;">${p.mnozstvo}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1a2a45;">${p.poznamka || '–'}</td>
        </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="background:#050d1a;color:#e2e8f0;font-family:Arial,sans-serif;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#0a1628;border:1px solid #1a2a45;border-radius:4px;overflow:hidden;">
    <div style="background:#1e6fff;padding:16px 24px;">
      <h1 style="margin:0;color:#fff;font-size:18px;">Nový dopyt č. ${data.cisloDopytu}</h1>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#6b7fa3;width:110px;">Meno:</td><td>${data.meno}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7fa3;">Firma:</td><td>${data.firma || '–'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7fa3;">Email:</td><td><a href="mailto:${data.email}" style="color:#1e6fff;">${data.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7fa3;">Telefón:</td><td>${data.telefon}</td></tr>
        ${data.sprava ? `<tr><td style="padding:6px 0;color:#6b7fa3;vertical-align:top;">Správa:</td><td>${data.sprava}</td></tr>` : ''}
      </table>
      <h2 style="color:#1e6fff;font-size:15px;margin-bottom:12px;">Objednané produkty:</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #1a2a45;">
        <thead>
          <tr style="background:#0f1e38;">
            <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #1a2a45;">Produkt</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:1px solid #1a2a45;">Ks</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #1a2a45;">Poznámka</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:20px;color:#6b7fa3;">
        Odpovedzte na: <a href="mailto:${data.email}" style="color:#1e6fff;">${data.email}</a>
      </p>
    </div>
  </div>
</body></html>`

  return sendBrevoEmail({
    to: data.prijemca,
    subject: `Nový dopyt č. ${data.cisloDopytu} – ${data.meno}`,
    html,
  })
}

export async function posliEmailZakaznikovi(data: {
  cisloDopytu: string
  meno: string
  nazovFirmy: string
  email: string
}) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="background:#050d1a;color:#e2e8f0;font-family:Arial,sans-serif;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#0a1628;border:1px solid #1a2a45;border-radius:4px;overflow:hidden;">
    <div style="background:#1e6fff;padding:16px 24px;">
      <h1 style="margin:0;color:#fff;font-size:18px;">${data.nazovFirmy}</h1>
    </div>
    <div style="padding:24px;">
      <p>Dobrý deň, ${data.meno},</p>
      <p>váš dopyt č. <strong style="color:#1e6fff;">${data.cisloDopytu}</strong> sme úspešne prijali.</p>
      <p>Ozveme sa vám do <strong>24 hodín</strong> na váš email alebo telefón.</p>
      <p style="margin-top:24px;color:#6b7fa3;">S pozdravom,<br>${data.nazovFirmy}</p>
    </div>
  </div>
</body></html>`

  return sendBrevoEmail({
    to: data.email,
    subject: `Potvrdenie dopytu č. ${data.cisloDopytu}`,
    html,
  })
}
