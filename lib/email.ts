import { Resend } from "resend";
import { wedding } from "@/content/wedding";

/** URL publique du site (liens dans les emails). */
export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://weeding-three-phi.vercel.app"
  );
}

/**
 * Email d'invitation aux couleurs du site (HTML « table » compatible
 * clients mail, tout en styles inline).
 */
export function renderInvitationEmail(firstName: string, rsvpUrl: string) {
  const { couple, displayRange, venue, rsvpDeadline, invitationEmail } = wedding;
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#faf4e8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf4e8;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#fffdf8;border:1px solid #e4d3b3;border-radius:18px;overflow:hidden;">
          <tr>
            <td style="background-color:#55402c;padding:36px 24px;text-align:center;">
              <p style="margin:0 0 10px;font-family:Georgia,serif;font-style:italic;font-size:30px;color:#faf4e8;">${couple.partner1} &amp; ${couple.partner2}</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#e4d3b3;">${displayRange}</p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#e4d3b3;">${venue.name} · Sidi Kaouki · Maroc</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 8px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#96603f;">${firstName}, on vous invite !</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 36px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#55402c;text-align:center;">
              <p style="margin:0 0 16px;">${invitationEmail.intro}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;" align="center">
              <a href="${rsvpUrl}" style="display:inline-block;background-color:#c07a52;color:#faf4e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 34px;border-radius:999px;">${invitationEmail.linkLabel}</a>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#96603f;">Réponse souhaitée avant le <strong>${rsvpDeadline}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#7a6449;text-align:center;">
              <p style="margin:0;">${invitationEmail.outro}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 34px;text-align:center;">
              <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a6449;">${invitationEmail.signature}</p>
              <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:20px;color:#96603f;">${couple.partner1} &amp; ${couple.partner2}</p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#b09a7e;">
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
