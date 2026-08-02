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
  const { rsvpDeadline, invitationEmail } = wedding;
  const cardImg = `${siteUrl()}/images/invitation-card.jpg`;
  return `<!doctype html>
<html lang="fr">
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;background-color:#e6d9ba;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e6d9ba;padding:40px 12px;">
      <tr><td align="center">
        <p style="margin:0 0 22px;font-family:Georgia,serif;font-size:21px;color:#5a4632;">${firstName}, une enveloppe vous attend&hellip;</p>
        <a href="${rsvpUrl}" style="text-decoration:none;">
          <img src="${cardImg}" alt="Faire-part — ouvrez votre invitation" width="330" style="display:block;width:330px;max-width:88%;height:auto;border:0;border-radius:6px;" />
        </a>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
          <tr>
            <td style="background-color:#a85b3b;border-radius:999px;">
              <a href="${rsvpUrl}" style="display:inline-block;color:#faf4e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 36px;">Ouvrir votre invitation</a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a6f4d;">Réponse souhaitée avant le <strong>${rsvpDeadline}</strong></p>
        <p style="margin:26px auto 0;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#7a6449;">${invitationEmail.outro}</p>
        <p style="margin:22px 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a6449;">${invitationEmail.signature}</p>
        <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:20px;color:#96603f;">${wedding.couple.partner1} &amp; ${wedding.couple.partner2}</p>
        <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#a08a68;">
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
