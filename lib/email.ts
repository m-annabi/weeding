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
      <tr><td align="center" bgcolor="#faf4e8" style="background-color:#faf4e8;padding:34px 12px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 22px;">
          <tr>
            <td bgcolor="#f0e4cc" width="96" height="54" align="center" valign="middle" style="background-color:#f0e4cc;border-radius:48px 48px 0 0;font-size:26px;line-height:1;color:#bd8f58;">&#9788;</td>
          </tr>
        </table>
        <p style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#55402c;">${firstName}, une enveloppe vous attend&hellip;</p>
        <p style="margin:0 auto 26px;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#6b543a;">${invitationEmail.intro}</p>
        <p style="margin:0 0 10px;font-size:26px;line-height:1;color:#96603f;">&#9901;</p>
        <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:32px;letter-spacing:5px;color:#55402c;">29&#8202;<span style="color:#bd8f58;">&middot;</span>&#8202;05&#8202;<span style="color:#bd8f58;">&middot;</span>&#8202;27</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;color:#8a6f4d;">SIDI KAOUKI &middot; MAROC</p>
        <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;color:#8a6f4d;">S&Eacute;JOUR DU 27 AU 30 MAI 2027</p>
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
        <p style="margin:26px 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a6449;">${invitationEmail.signature}</p>
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
