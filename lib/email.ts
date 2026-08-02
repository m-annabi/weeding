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
  const site = siteUrl();
  return `<!doctype html>
<html lang="fr">
  <head><meta charset="utf-8" /></head>
  <body bgcolor="#7c7448" style="margin:0;padding:0;background-color:#7c7448;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#7c7448" style="background-color:#7c7448;">
      <tr><td align="center" bgcolor="#7c7448" style="background-color:#7c7448;padding:40px 12px;">
        <img src="${site}/images/email-sun-cream.png" alt="" width="34" height="34" style="display:block;margin:0 auto 14px;border:0;" />
        <p style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#faf4e8;">${firstName}, une enveloppe vous attend&hellip;</p>
        <p style="margin:0 auto 24px;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#efe6cc;">${invitationEmail.intro}</p>
        <a href="${rsvpUrl}" style="text-decoration:none;">
          <img src="${site}/images/invitation-card-green.jpg" alt="Faire-part — ouvrez votre invitation" width="330" style="display:block;width:330px;max-width:88%;height:auto;border:0;border-radius:6px;" />
        </a>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
          <tr>
            <td bgcolor="#efe6cc" style="background-color:#efe6cc;border-radius:999px;">
              <a href="${rsvpUrl}" style="display:inline-block;color:#5c4a33;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 36px;">${invitationEmail.linkLabel}</a>
            </td>
          </tr>
        </table>
        <p style="margin:18px auto 0;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#e6dcbd;">${invitationEmail.outro}</p>
        <p style="margin:24px 0 0;font-family:Georgia,serif;font-size:13px;letter-spacing:6px;color:#d9b878;">&#9670;&nbsp;&#9671;&nbsp;&#9670;</p>
        <p style="margin:20px auto 0;max-width:430px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#e6dcbd;">${invitationEmail.sitePitch}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:14px auto 0;">
          <tr>
            <td bgcolor="#a85b3b" style="background-color:#a85b3b;border-radius:999px;">
              <a href="${site}" style="display:inline-block;color:#faf4e8;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 30px;">Notre site de mariage</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#e6dcbd;">Réponse souhaitée avant le <strong style="color:#faf4e8;">${rsvpDeadline}</strong></p>
        <img src="${site}/images/email-khatam.png" alt="" width="22" height="22" style="display:block;margin:26px auto 0;border:0;" />
        <p style="margin:12px 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#e6dcbd;">${invitationEmail.signature}</p>
        <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:20px;color:#faf4e8;">${wedding.couple.partner1} &amp; ${wedding.couple.partner2}</p>
        <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-style:italic;color:#e6dcbd;">${invitationEmail.ps}</p>
        <img src="${site}/images/email-tongs-cream.png" alt="" width="30" height="30" style="display:block;margin:6px auto 0;border:0;" />
        <p style="margin:22px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d5c9a4;">
          Si le bouton ne fonctionne pas, copiez ce lien : <a href="${rsvpUrl}" style="color:#faf4e8;">${rsvpUrl}</a>
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
