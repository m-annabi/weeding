"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "./actions";

const DIET_OPTIONS = [
  { value: "NONE", label: "Aucun régime particulier" },
  { value: "VEGETARIAN", label: "Végétarien" },
  { value: "VEGAN", label: "Vegan" },
  { value: "HALAL", label: "Halal" },
  { value: "GLUTEN_FREE", label: "Sans gluten" },
  { value: "OTHER", label: "Autre (préciser)" },
];

export type ExistingRsvp = {
  attending: boolean;
  email: string | null;
  phone: string | null;
  arrivalMode: string | null;
  arrivalAirport: string | null;
  arrivalDate: string | null;
  arrivalTime: string | null;
  arrivalFlight: string | null;
  departureDate: string | null;
  departureTime: string | null;
  departureFlight: string | null;
  needsTransfer: boolean;
  accommodation: string | null;
  accommodationOther: string | null;
  offersCarpool: boolean;
  comment: string | null;
  participants: {
    firstName: string;
    lastName: string;
    diet: string;
    dietOther: string | null;
    allergies: string | null;
    childMenu: boolean;
    specialNeeds: string | null;
  }[];
};

const inputCls =
  "w-full rounded-xl border border-linen bg-white/80 px-4 py-2.5 font-light text-cocoa placeholder:text-cocoa/35 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";
const labelCls = "block text-sm font-medium text-cocoa/80 mb-1";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl text-sienna mt-10 mb-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-linen" />
      {children}
      <span className="h-px flex-1 bg-linen" />
    </h2>
  );
}

function ParticipantFields({
  index,
  defaults,
}: {
  index: number;
  defaults?: ExistingRsvp["participants"][number];
}) {
  const [diet, setDiet] = useState(defaults?.diet ?? "NONE");
  return (
    <fieldset className="rounded-2xl border border-linen bg-white/60 p-5 space-y-4">
      <legend className="px-2 font-serif text-lg text-terracotta">
        Participant {index + 1}
      </legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`p${index}_firstName`}>
            Prénom *
          </label>
          <input
            id={`p${index}_firstName`}
            name={`p${index}_firstName`}
            required
            defaultValue={defaults?.firstName}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`p${index}_lastName`}>
            Nom *
          </label>
          <input
            id={`p${index}_lastName`}
            name={`p${index}_lastName`}
            required
            defaultValue={defaults?.lastName}
            className={inputCls}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`p${index}_diet`}>
            Régime alimentaire
          </label>
          <select
            id={`p${index}_diet`}
            name={`p${index}_diet`}
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className={inputCls}
          >
            {DIET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {diet === "OTHER" && (
          <div>
            <label className={labelCls} htmlFor={`p${index}_dietOther`}>
              Précisez le régime
            </label>
            <input
              id={`p${index}_dietOther`}
              name={`p${index}_dietOther`}
              defaultValue={defaults?.dietOther ?? ""}
              className={inputCls}
            />
          </div>
        )}
        <div>
          <label className={labelCls} htmlFor={`p${index}_allergies`}>
            Allergies ou intolérances
          </label>
          <input
            id={`p${index}_allergies`}
            name={`p${index}_allergies`}
            placeholder="Arachides, lactose…"
            defaultValue={defaults?.allergies ?? ""}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`p${index}_specialNeeds`}>
            Besoins particuliers
          </label>
          <input
            id={`p${index}_specialNeeds`}
            name={`p${index}_specialNeeds`}
            placeholder="PMR, poussette, chaise haute…"
            defaultValue={defaults?.specialNeeds ?? ""}
            className={inputCls}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 font-light">
        <input
          type="checkbox"
          name={`p${index}_childMenu`}
          defaultChecked={defaults?.childMenu}
          className="h-4 w-4 accent-terracotta"
        />
        Menu enfant
      </label>
    </fieldset>
  );
}

export default function RsvpForm({
  token,
  firstName,
  lastName,
  maxGuests,
  transferOffered,
  airports,
  existing,
}: {
  token: string;
  firstName: string;
  lastName: string;
  maxGuests: number;
  transferOffered: boolean;
  airports: readonly { code: string; name: string; drive: string }[];
  existing: ExistingRsvp | null;
}) {
  const [state, formAction, pending] = useActionState<RsvpState, FormData>(
    submitRsvp.bind(null, token),
    null
  );
  const [attending, setAttending] = useState<"yes" | "no" | "">(
    existing ? (existing.attending ? "yes" : "no") : ""
  );
  const [count, setCount] = useState(
    existing?.participants.length && existing.attending
      ? existing.participants.length
      : 1
  );
  const [arrivalMode, setArrivalMode] = useState(existing?.arrivalMode ?? "");
  const [accommodation, setAccommodation] = useState(
    existing?.accommodation ?? ""
  );

  if (state?.ok) {
    return (
      <div className="mt-8 rounded-3xl border border-nude/60 bg-white/70 px-6 py-14 text-center">
        <p className="text-6xl mb-5" aria-hidden>
          {attending === "yes" ? "🎉" : "🤍"}
        </p>
        <p className="script text-4xl text-terracotta mb-4">
          {attending === "yes" ? "Quelle joie !" : "Merci pour votre réponse"}
        </p>
        <p className="font-serif text-2xl text-sienna max-w-md mx-auto">
          {state.message}
        </p>
        {attending === "yes" && (
          <p className="mt-4 font-serif italic text-olive">
            Rendez-vous les pieds dans le sable à Sidi Kaouki ✨
          </p>
        )}
        <p className="mt-6 font-light text-cocoa/60">
          Vous pouvez revenir sur cette page à tout moment pour modifier votre
          réponse ou compléter vos informations de vol.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {existing && (
        <p className="rounded-xl bg-sage/20 border border-sage/50 px-4 py-3 text-sm text-olive">
          Vous avez déjà répondu — vous pouvez modifier votre réponse
          ci-dessous.
        </p>
      )}

      {/* Présence */}
      <SectionTitle>Votre réponse</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className={`cursor-pointer rounded-2xl border-2 p-5 text-center transition ${
            attending === "yes"
              ? "border-terracotta bg-terracotta/10"
              : "border-linen bg-white/60 hover:border-nude"
          }`}
        >
          <input
            type="radio"
            name="attending"
            value="yes"
            required
            checked={attending === "yes"}
            onChange={() => setAttending("yes")}
            className="sr-only"
          />
          <span className="text-3xl block mb-2">✅</span>
          <span className="font-serif text-xl text-cocoa">
            Je serai présent(e)
          </span>
        </label>
        <label
          className={`cursor-pointer rounded-2xl border-2 p-5 text-center transition ${
            attending === "no"
              ? "border-terracotta bg-terracotta/10"
              : "border-linen bg-white/60 hover:border-nude"
          }`}
        >
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === "no"}
            onChange={() => setAttending("no")}
            className="sr-only"
          />
          <span className="text-3xl block mb-2">❌</span>
          <span className="font-serif text-xl text-cocoa">
            Je ne pourrai malheureusement pas être présent(e)
          </span>
        </label>
      </div>

      {attending === "yes" && (
        <>
          {/* Participants */}
          <SectionTitle>Les participants</SectionTitle>
          <div>
            <label className={labelCls} htmlFor="count">
              Nombre de personnes présentes{" "}
              <span className="text-cocoa/50">
                (votre invitation couvre {maxGuests}{" "}
                {maxGuests > 1 ? "personnes" : "personne"})
              </span>
            </label>
            <select
              id="count"
              name="count"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className={`${inputCls} max-w-40`}
            >
              {Array.from({ length: maxGuests }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-6">
            {Array.from({ length: count }, (_, i) => (
              <ParticipantFields
                key={i}
                index={i}
                defaults={
                  existing?.participants[i] ??
                  (i === 0 ? { firstName, lastName, diet: "NONE", dietOther: null, allergies: null, childMenu: false, specialNeeds: null } : undefined)
                }
              />
            ))}
          </div>

          {/* Coordonnées */}
          <SectionTitle>Vos coordonnées</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="phone">
                Téléphone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={existing?.phone ?? ""}
                className={inputCls}
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={existing?.email ?? ""}
                className={inputCls}
                placeholder="vous@exemple.fr"
              />
            </div>
          </div>

          {/* Voyage */}
          <SectionTitle>Votre voyage</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["PLANE", "✈️", "J'arrive en avion"],
                ["CAR", "🚗", "Je viens en voiture"],
                ["ON_SITE", "🏠", "Je suis déjà sur place"],
              ] as const
            ).map(([value, icon, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-2xl border-2 p-4 text-center transition ${
                  arrivalMode === value
                    ? "border-terracotta bg-terracotta/10"
                    : "border-linen bg-white/60 hover:border-nude"
                }`}
              >
                <input
                  type="radio"
                  name="arrivalMode"
                  value={value}
                  checked={arrivalMode === value}
                  onChange={() => setArrivalMode(value)}
                  className="sr-only"
                />
                <span className="text-2xl block mb-1">{icon}</span>
                <span className="font-light text-cocoa">{label}</span>
              </label>
            ))}
          </div>

          {arrivalMode === "PLANE" && (
            <div className="space-y-4 rounded-2xl border border-linen bg-white/60 p-5">
              <div>
                <label className={labelCls} htmlFor="arrivalAirport">
                  Aéroport d&apos;arrivée
                </label>
                <select
                  id="arrivalAirport"
                  name="arrivalAirport"
                  defaultValue={existing?.arrivalAirport ?? "ESU"}
                  className={inputCls}
                >
                  {airports.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.name} ({a.drive})
                    </option>
                  ))}
                </select>
              </div>
              <fieldset>
                <legend className="font-serif text-lg text-terracotta mb-2">
                  🛬 Arrivée
                </legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelCls} htmlFor="arrivalDate">
                      Date
                    </label>
                    <input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      defaultValue={existing?.arrivalDate ?? ""}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="arrivalTime">
                      Heure d&apos;atterrissage
                    </label>
                    <input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      defaultValue={existing?.arrivalTime ?? ""}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="arrivalFlight">
                      N° de vol
                    </label>
                    <input
                      id="arrivalFlight"
                      name="arrivalFlight"
                      placeholder="AT 445"
                      defaultValue={existing?.arrivalFlight ?? ""}
                      className={inputCls}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="font-serif text-lg text-terracotta mb-2">
                  🛫 Retour
                </legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelCls} htmlFor="departureDate">
                      Date
                    </label>
                    <input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      defaultValue={existing?.departureDate ?? ""}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="departureTime">
                      Heure de décollage
                    </label>
                    <input
                      id="departureTime"
                      name="departureTime"
                      type="time"
                      defaultValue={existing?.departureTime ?? ""}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="departureFlight">
                      N° de vol
                    </label>
                    <input
                      id="departureFlight"
                      name="departureFlight"
                      placeholder="AT 446"
                      defaultValue={existing?.departureFlight ?? ""}
                      className={inputCls}
                    />
                  </div>
                </div>
              </fieldset>
              {transferOffered && (
                <label className="flex items-start gap-3 font-light rounded-xl bg-sage/15 border border-sage/40 p-3">
                  <input
                    type="checkbox"
                    name="needsTransfer"
                    defaultChecked={existing?.needsTransfer}
                    className="mt-1 h-4 w-4 accent-terracotta"
                  />
                  <span>
                    🚌 <strong className="font-medium">Navette offerte</strong> —
                    je souhaite être pris(e) en charge entre l&apos;aéroport et
                    la kasbah (aller et retour).
                  </span>
                </label>
              )}
              <p className="text-xs text-cocoa/50 font-light">
                Les billets d&apos;avion et le trajet jusqu&apos;à la kasbah
                sont à votre charge. Pas encore réservé ? Aucun souci :
                répondez dès maintenant et revenez compléter vos infos de vol
                sur cette même page plus tard — elles nous aident à organiser
                le covoiturage entre invités.
              </p>
            </div>
          )}

          {/* Hébergement */}
          <SectionTitle>Votre hébergement</SectionTitle>
          <p className="rounded-xl bg-sage/15 border border-sage/40 px-4 py-3 text-sm font-light text-cocoa/80">
            🏰 Nous privatisons la kasbah :{" "}
            <strong className="font-medium">l&apos;hébergement est offert</strong>.
            Les chambres étant limitées, certains invités seront logés dans des
            logements annexes à quelques minutes — nous nous occupons de la
            répartition.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["KASBAH", "🤍 Je souhaite être logé(e) sur place (offert)"],
                ["OTHER", "📍 Je m'organise par moi-même"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-2xl border-2 p-4 text-center transition ${
                  accommodation === value
                    ? "border-terracotta bg-terracotta/10"
                    : "border-linen bg-white/60 hover:border-nude"
                }`}
              >
                <input
                  type="radio"
                  name="accommodation"
                  value={value}
                  checked={accommodation === value}
                  onChange={() => setAccommodation(value)}
                  className="sr-only"
                />
                <span className="font-light text-cocoa">{label}</span>
              </label>
            ))}
          </div>
          {accommodation === "OTHER" && (
            <div>
              <label className={labelCls} htmlFor="accommodationOther">
                Où logerez-vous ? (utile pour l&apos;organisation)
              </label>
              <input
                id="accommodationOther"
                name="accommodationOther"
                placeholder="Riad à Essaouira, maison à Sidi Kaouki…"
                defaultValue={existing?.accommodationOther ?? ""}
                className={inputCls}
              />
            </div>
          )}

          {(arrivalMode === "PLANE" || arrivalMode === "CAR") && (
            <label className="flex items-center gap-3 font-light">
              <input
                type="checkbox"
                name="offersCarpool"
                defaultChecked={existing?.offersCarpool}
                className="h-4 w-4 accent-terracotta"
              />
              🤝 Je peux proposer du covoiturage (voiture de location, trajets
              depuis l&apos;aéroport…)
            </label>
          )}
        </>
      )}

      {attending !== "" && (
        <>
          {/* Commentaire */}
          <SectionTitle>Un petit mot ?</SectionTitle>
          <textarea
            name="comment"
            rows={4}
            defaultValue={existing?.comment ?? ""}
            className={inputCls}
            placeholder="Heure d'arrivée particulière, question, message pour les mariés…"
          />

          {state && !state.ok && (
            <p className="rounded-xl bg-terracotta/10 border border-terracotta px-4 py-3 text-sienna">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-terracotta py-4 font-medium tracking-wide text-cream text-lg shadow-lg shadow-terracotta/25 transition hover:bg-sienna disabled:opacity-60"
          >
            {pending ? "Envoi en cours…" : "Envoyer ma réponse"}
          </button>
        </>
      )}
    </form>
  );
}
