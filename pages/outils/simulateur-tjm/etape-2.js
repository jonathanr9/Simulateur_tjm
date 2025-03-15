import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
      alert("Veuillez accepter les conditions d'utilisation.");
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

      // API temporairement simulée pour développement
      // En production, faites un appel API réel ici
      console.log("Données à envoyer:", contactData);
      
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <div>
      <div className="header">
        <div className="container">
          <h1>Simulateur TJM</h1>
          <p>Vos informations de contact</p>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Utiliser legacyBehavior avec Link */}
          <Link href="/outils/simulateur-tjm" legacyBehavior>
            <a className="btn btn-outline" style={{ marginBottom: "20px", display: "inline-block" }}>
              Retour à l'étape 1
            </a>
          </Link>

          {/* Étape 2 : Informations de contact */}
          <div className="simulator-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h2 style={{ color: "#0F4C5C", fontSize: "1.5rem", fontWeight: "600" }}>
                Étape 2 : Vos informations
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="step-number step-inactive">1</div>
                <div className="step-line step-line-active"></div>
                <div className="step-number step-active">2</div>
                <div className="step-line"></div>
                <div className="step-number step-inactive">3</div>
              </div>
            </div>

            {simulateurData && (
              <div className="recap-box">
                <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Récapitulatif</h3>
                <p>
                  Avec un TJM de <strong>{simulateurData.tjm} €</strong>,
                  <strong> {simulateurData.joursParSemaine} jours</strong> par semaine et
                  <strong> {simulateurData.semainesParAn} semaines</strong> par an, votre chiffre
                  d'affaires annuel estimé est de
                  <strong> {simulateurData.caAnnuel.toLocaleString("fr-FR")} € HT</strong>.
                </p>
                <p style={{ marginTop: "15px" }}>
                  <strong>Rendez-vous de découverte</strong><br />
                  Nous prenons le temps de comprendre votre activité, vos besoins et vos objectifs lors d'un premier
                  rendez-vous gratuit. Nous vous proposons une solution sur mesure adaptée à votre situation.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Nom */}
              <div className="form-group">
                <label className="form-label">Nom complet *</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  required
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: jean.dupont@example.com"
                  required
                  className="form-input"
                />
              </div>

              {/* Téléphone */}
              <div className="form-group">
                <label className="form-label">Téléphone *</label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Ex: 0612345678"
                  required
                  className="form-input"
                />
              </div>

              {/* Statut actuel */}
              <div className="form-group">
                <label className="form-label">Votre statut actuel *</label>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <input
                      type="radio"
                      id="auto-entrepreneur"
                      name="statut"
                      value="auto-entrepreneur"
                      checked={statut === "auto-entrepreneur"}
                      onChange={() => setStatut("auto-entrepreneur")}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="auto-entrepreneur">Auto-entrepreneur</label>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <input
                      type="radio"
                      id="eurl-sarl"
                      name="statut"
                      value="eurl-sarl"
                      checked={statut === "eurl-sarl"}
                      onChange={() => setStatut("eurl-sarl")}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="eurl-sarl">EURL / SARL</label>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <input
                      type="radio"
                      id="sasu-sas"
                      name="statut"
                      value="sasu-sas"
                      checked={statut === "sasu-sas"}
                      onChange={() => setStatut("sasu-sas")}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="sasu-sas">SASU / SAS</label>
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <input
                      type="radio"
                      id="salarie"
                      name="statut"
                      value="salarie"
                      checked={statut === "salarie"}
                      onChange={() => setStatut("salarie")}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="salarie">Salarié</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="autre"
                      name="statut"
                      value="autre"
                      checked={statut === "autre"}
                      onChange={() => setStatut("autre")}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="autre">Autre</label>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">Message (facultatif)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Précisez votre demande ou vos questions..."
                  className="form-input"
                  style={{ minHeight: "100px" }}
                />
              </div>

              {/* Consentement RGPD */}
              <div className="form-group">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <input
                    type="checkbox"
                    id="rgpd"
                    checked={consentRGPD}
                    onChange={(e) => setConsentRGPD(e.target.checked)}
                    style={{ marginRight: "10px", marginTop: "3px" }}
                  />
                  <label htmlFor="rgpd" style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                    J'accepte que mes données soient utilisées pour me recontacter. Ces données ne seront jamais vendues à des tiers.
                    En soumettant ce formulaire, j'accepte la politique de confidentialité du site. *
                  </label>
                </div>
              </div>

              {/* Bouton suivant */}
              <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
