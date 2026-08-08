import { Resend } from "resend";
import { wedding } from "@/content/wedding";

/** URL publique du site (liens dans les emails). */
export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://wedding-akan-maureen.vercel.app"
  );
}

/**
 * Email d'invitation aux couleurs du site (HTML « table » compatible
 * clients mail, tout en styles inline).
 */
export function renderInvitationEmail(firstName: string, rsvpUrl: string) {
  const { rsvpDeadline, invitationEmail } = wedding;
  const site = siteUrl();
  return `<!doctype html>
<html lang="fr">
  <head><meta charset="utf-8" /></head>
  <body bgcolor="#faf4e8" style="margin:0;padding:0;background-color:#faf4e8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#faf4e8" style="background-color:#faf4e8;">
      <tr><td align="center" bgcolor="#faf4e8" style="background-color:#faf4e8;padding:0 12px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 22px;">
          <tr>
            <td bgcolor="#f0e4cc" width="96" height="54" align="center" valign="middle" style="background-color:#f0e4cc;border-radius:48px 48px 0 0;font-size:26px;line-height:1;color:#bd8f58;">&#9788;</td>
          </tr>
        </table>
        <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:22px;color:#55402c;">${firstName}, une enveloppe vous attend&hellip;</p>
        <p style="margin:0 0 18px;font-size:15px;letter-spacing:3px;line-height:1;color:#bd8f58;">&#12316;&#12316;&#12316;</p>
        <p style="margin:0 auto 24px;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#6b543a;">${invitationEmail.intro}</p>
        <a href="${rsvpUrl}" style="text-decoration:none;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="330" bgcolor="#9a9159" style="width:330px;max-width:92%;background-color:#9a9159;border-radius:6px;">
            <tr><td style="padding:10px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e6dcba;">
                <tr><td style="border:1px solid #bdb586;margin:0;padding:24px 14px 26px;" align="center">
                  <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;color:#f2ead6;">C&Eacute;L&Eacute;BREZ AVEC NOUS AU MAROC</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 18px;">
                    <tr>
                      <td width="88" height="106" align="center" valign="middle" style="border:1.5px solid #d9b878;border-radius:46px 46px 0 0;line-height:1.3;">
                        <span style="font-size:15px;color:#d9b878;">&#10022;&nbsp;&nbsp;&#9790;</span><br />
                        <span style="font-size:30px;line-height:1.2;">&#127796;</span><br />
                        <span style="font-size:10px;color:#d9b878;">&#10022;</span>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:19px;letter-spacing:2px;color:#f7f1e1;">MAUREEN <span style="font-style:italic;color:#d9b878;">&amp;</span> AKAN</p>
                  <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3.5px;color:#f2ead6;">SE MARIENT&nbsp;!</p>
                  <p style="margin:0 0 8px;font-size:19px;line-height:1;color:#d9b878;">&#9901;</p>
                  <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:23px;letter-spacing:4px;color:#faf4e8;">29&#8202;<span style="color:#d9b878;">&middot;</span>&#8202;05&#8202;<span style="color:#d9b878;">&middot;</span>&#8202;27</p>
                  <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:2.5px;line-height:1.8;color:#f2ead6;">&Agrave; L'H&Ocirc;TEL LA KASBAH D'EAU<br />SIDI KAOUKI &middot; MAROC<br />S&Eacute;JOUR DU 27 AU 30 MAI 2027</p>
                  <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#d9b878;">sous le soleil de Sidi Kaouki</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </a>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
          <tr>
            <td bgcolor="#a85b3b" style="background-color:#a85b3b;border-radius:999px;">
              <a href="${rsvpUrl}" style="display:inline-block;color:#faf4e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 36px;">${invitationEmail.linkLabel}</a>
            </td>
          </tr>
        </table>
        <p style="margin:18px auto 0;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#7a6449;">${invitationEmail.outro}</p>
        <p style="margin:24px 0 0;font-family:Georgia,serif;font-size:13px;letter-spacing:6px;color:#b26d36;">&#9670;&nbsp;&#9671;&nbsp;&#9670;</p>
        <p style="margin:20px auto 0;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#7a6449;">${invitationEmail.sitePitch}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:14px auto 0;">
          <tr>
            <td bgcolor="#7c7448" style="background-color:#7c7448;border-radius:999px;">
              <a href="${site}" style="display:inline-block;color:#faf4e8;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 30px;">Notre site de mariage</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a6f4d;">Réponse souhaitée avant le <strong style="color:#55402c;">${rsvpDeadline}</strong></p>
        <p style="margin:26px 0 0;font-size:22px;line-height:1;color:#96603f;">&#9901;</p>
        <p style="margin:12px 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a6449;">${invitationEmail.signature}</p>
        <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:20px;color:#96603f;">${wedding.couple.partner1} &amp; ${wedding.couple.partner2}</p>
        <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-style:italic;color:#8a6f4d;">${invitationEmail.ps}</p>
        <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#a08a68;">
          Si le bouton ne fonctionne pas, copiez ce lien : <a href="${rsvpUrl}" style="color:#96603f;">${rsvpUrl}</a>
        </p>
      </td></tr>
    </table>
  </body>
</html>`;
}

/** Envoie l'invitation. Lève une erreur avec un message lisible en cas d'échec. */
export async function sendInvitationEmail(
  to: string,
  firstName: string,
  rsvpUrl: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY manquante — ajoutez-la dans .env (et sur Vercel)."
    );
  }
  const from =
    process.env.EMAIL_FROM ??
    `${wedding.couple.partner1} & ${wedding.couple.partner2} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: wedding.invitationEmail.subject,
    html: renderInvitationEmail(firstName, rsvpUrl),
  });
  if (error) throw new Error(error.message);
}
