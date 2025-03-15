import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import { localStore, sessionStore } from "../../../utils/storage";

export default function SimulateurTJMEtape2Page() {
  const router = useRouter();

  // États pour les informations de contact
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [statut, setStatut] = useState("auto-entrepreneur");
  const [simulateurData, setSimulateurData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [consentRGPD, setConsentRGPD] = useState(false);

  // Récupérer les données de l'étape 1
  useEffect(() => {
    const data = sessionStore.getItem("simulateurData");
    if (data) {
      setSimulateurData(data);
    } else {
      // Rediriger vers l'étape 1 si aucune donnée n'est trouvée
      router.push("/outils/simulateur-tjm");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consentRGPD) {
      alert("Veuillez accepter les conditions d'utilisation et la politique de confidentialité.");
      return;
    }

    setIsLoading(true);

    try {
      // Récupérer les paramètres UTM stockés
      const utmParams = localStore.getItem('utm_params');

      // Préparer les données de contact
      const contactData = {
        nom,
        email,
        telephone,
        message,
        statut,
        simulateurData,
        utm: utmParams
      };

      // Envoyer les données à l'API
      const response = await fetch("/api/saveToSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'enregistrement");
      }

      // Stocker les données du formulaire
      sessionStore.setItem("contactData", contactData);

      // Nettoyer les données incomplètes de la simulation
      localStore.removeItem('incomplete_simulation');

      // Rediriger vers l'étape 3
      router.push("/outils/simulateur-tjm/etape-3");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du contact:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-16">
      <div className="bg-blue-700 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Simulateur TJM
          </h1>
          <p className="text-white/90 text-center mt-4 max-w-2xl mx-auto">
            Vos informations de contact
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/outils/simulateur-tjm" legacyBehavior>
            <Button variant="ghost" className="mb-8">
              Retour à l'étape 1
            </Button>
          </Link>

          {/* Étape 2 : Informations de contact */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 flex items-center">
                Étape 2 : Vos informations
              </h2>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-8 h-1 bg-blue-600"></div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
            </div>

            {simulateurData && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Récapitulatif</h3>
                <p className="text-gray-600">
                  Avec un TJM de <span className="font-semibold">{simulateurData.tjm} €</span>,
                  <span className="font-semibold"> {simulateurData.joursParSemaine} jours</span> par semaine et
                  <span className="font-semibold"> {simulateurData.semainesParAn} semaines</span> par an, votre chiffre
                  d'affaires annuel estimé est de
                  <span className="font-semibold"> {simulateurData.caAnnuel.toLocaleString("fr-FR")} € HT</span>.
                </p>
                <p className="text-gray-600 mt-4">
                  <span className="font-semibold">Rendez-vous de découverte</span>
                  <br />
                  Nous prenons le temps de comprendre votre activité, vos besoins et vos objectifs lors d'un premier
                  rendez-vous gratuit. Nous vous proposons une solution sur mesure adaptée à votre situation.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <Label htmlFor="nom" className="text-gray-700 font-medium">
                  Nom complet *
                </Label>
                <Input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  required
                  className="mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: jean.dupont@example.com"
                  required
                  className="mt-1"
                />
              </div>

              {/* Téléphone */}
              <div>
                <Label htmlFor="telephone" className="text-gray-700 font-medium">
                  Téléphone *
                </Label>
                <Input
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Ex: 0612345678"
                  required
                  className="mt-1"
                />
              </div>

              {/* Statut actuel */}
              <div>
                <Label className="text-gray-700 font-medium block mb-2">Votre statut actuel *</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="auto-entrepreneur"
                      name="statut"
                      value="auto-entrepreneur"
                      checked={statut === "auto-entrepreneur"}
                      onChange={() => setStatut("auto-entrepreneur")}
                      className="mr-2"
                    />
                    <label htmlFor="auto-entrepreneur">Auto-entrepreneur</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="eurl-sarl"
                      name="statut"
                      value="eurl-sarl"
                      checked={statut === "eurl-sarl"}
                      onChange={() => setStatut("eurl-sarl")}
                      className="mr-2"
                    />
                    <label htmlFor="eurl-sarl">EURL / SARL</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sasu-sas"
                      name="statut"
                      value="sasu-sas"
                      checked={statut === "sasu-sas"}
                      onChange={() => setStatut("sasu-sas")}
                      className="mr-2"
                    />
                    <label htmlFor="sasu-sas">SASU / SAS</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="salarie"
                      name="statut"
                      value="salarie"
                      checked={statut === "salarie"}
                      onChange={() => setStatut("salarie")}
                      className="mr-2"
                    />
                    <label htmlFor="salarie">Salarié</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="autre"
                      name="statut"
                      value="autre"
                      checked={statut === "autre"}
                      onChange={() => setStatut("autre")}
                      className="mr-2"
                    />
                    <label htmlFor="autre">Autre</label>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message (facultatif)
                </Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Précisez votre demande ou vos questions..."
                  className="mt-1 min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Consentement RGPD */}
              <div className="mt-6">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="rgpd"
                    checked={consentRGPD}
                    onChange={(e) => setConsentRGPD(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="rgpd" className="text-sm text-gray-600">
                    J'accepte que mes données soient utilisées pour me recontacter. Ces données ne seront jamais vendues à des tiers.
                    En soumettant ce formulaire, j'accepte la politique de confidentialité du site. *
                  </label>
                </div>
              </div>

              {/* Bouton suivant */}
              <div className="mt-8 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
