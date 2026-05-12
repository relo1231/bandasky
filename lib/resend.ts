import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export function buildOwnerEmail(data: {
  cisloDopytu: string
  meno: string
  firma: string | null
  email: string
  telefon: string
  sprava: string | null
  polozky: Array<{ nazov: string; mnozstvo: number; poznamka?: string | null }>
}): string {
  const rows = data.polozky
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;">${p.nazov}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:center;">${p.mnozstvo}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;">${p.poznamka || '–'}</td>
        </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0a0a0a;color:#e8e8e8;font-family:Arial,sans-serif;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
    <div style="background:#d4a017;padding:16px 24px;">
      <h1 style="margin:0;color:#0a0a0a;font-size:20px;">Nový dopyt č. ${data.cisloDopytu}</h1>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:#888;width:120px;">Meno:</td><td style="padding:6px 0;">${data.meno}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Firma:</td><td style="padding:6px 0;">${data.firma || '–'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Email:</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#d4a017;">${data.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#888;">Telefón:</td><td style="padding:6px 0;">${data.telefon}</td></tr>
        ${data.sprava ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top;">Správa:</td><td style="padding:6px 0;">${data.sprava}</td></tr>` : ''}
      </table>

      <h2 style="color:#d4a017;font-size:16px;margin-bottom:12px;">Objednané produkty:</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #2a2a2a;">
        <thead>
          <tr style="background:#1a1a1a;">
            <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #2a2a2a;">Produkt</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:1px solid #2a2a2a;">Ks</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #2a2a2a;">Poznámka</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="margin-top:24px;color:#888;">
        Odpovedzte na: <a href="mailto:${data.email}" style="color:#d4a017;">${data.email}</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

export function buildCustomerEmail(data: {
  cisloDopytu: string
  meno: string
  nazovFirmy: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0a0a0a;color:#e8e8e8;font-family:Arial,sans-serif;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
    <div style="background:#d4a017;padding:16px 24px;">
      <h1 style="margin:0;color:#0a0a0a;font-size:20px;">${data.nazovFirmy}</h1>
    </div>
    <div style="padding:24px;">
      <p>Dobrý deň, ${data.meno},</p>
      <p>váš dopyt č. <strong style="color:#d4a017;">${data.cisloDopytu}</strong> sme úspešne prijali.</p>
      <p>Ozveme sa vám do <strong>24 hodín</strong> na váš email alebo telefón.</p>
      <p style="margin-top:24px;color:#888;">S pozdravom,<br>${data.nazovFirmy}</p>
    </div>
  </div>
</body>
</html>`
}
