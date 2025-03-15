import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { localStore, sessionStore } from "../../../utils/storage";
import { captureUtmParams } from "../../../utils/tracking";

export default function SimulateurTJMPage() {
  const router = useRouter();

  // États pour les entrées du simulateur
  const [tjm, setTjm] = useState(500);
  const [joursParSemaine, setJoursParSemaine] = useState(5);
  const [semainesParAn, setSemainesParAn] = useState(47);
  const [chargesFixes, setChargesFixes] = useState(500);
  const [isLoading, setIsLoading] = useState(false);

  // États pour les résultats
  const [caAnnuel, setCaAnnuel] = useState(0);
  
  // État pour stocker les paramètres UTM
  const [utmParams, setUtmParams] = useState(null);

  // Capturer les paramètres UTM au chargement
  useEffect(() => {
    const params = captureUtmParams();
    if (params) {
      setUtmParams(params);
    }

    // Vérifier si une simulation a été abandonnée
    const savedSimulation = localStore.getItem('incomplete_simulation');
    if (savedSimulation) {
      if (confirm('Voulez-vous reprendre votre simulation précédente?')) {
        setTjm(savedSimulation.tjm || 500);
        setJoursParSemaine(savedSimulation.joursParSemaine || 5);
        setSemainesParAn(savedSimulation.semainesParAn || 47);
        setChargesFixes(savedSimulation.chargesFixes || 500);
      } else {
        localStore.removeItem('incomplete_simulation');
      }
    }
  }, []);

  // Calculer les résultats
  useEffect(() => {
    // Nombre de jours travaillés par an
    const joursParAn = joursParSemaine * semainesParAn;

    // Chiffre d'affaires annuel
    const ca = tjm * joursParAn;
    setCaAnnuel(ca);
    
    // Sauvegarder l'état actuel uniquement si l'utilisateur a modifié au moins un paramètre
    if (tjm !== 500 || joursParSemaine !== 5 || semainesParAn !== 47 || chargesFixes !== 500) {
      const simulationData = {
        tjm,
        joursParSemaine,
        semainesParAn,
        chargesFixes,
        timestamp: new Date().toISOString()
      };
      localStore.setItem('incomplete_simulation', simulationData);
    }
  }, [tjm, joursParSemaine, semainesParAn, chargesFixes]);

  const handleNext = async () => {
    setIsLoading(true);
    
    try {
      // Stocker les données dans sessionStorage pour les récupérer à l'étape suivante
      sessionStore.setItem("simulateurData", {
        tjm,
        joursParSemaine,
        semainesParAn,
        chargesFixes,
        caAnnuel,
        utmSource: utmParams?.source || null,
        utmMedium: utmParams?.medium || null,
        utmCampaign: utmParams?.campaign || null
      });
      
      // Rediriger vers l'étape 2
      router.push("/outils/simulateur-tjm/etape-2");
    } catch (error) {
      console.error("Erreur:", error);
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
          <p>Calculez votre Taux Journalier Moyen et estimez vos revenus</p>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/">
            <a className="btn btn-outline" style={{ marginBottom: "20px", display: "inline-block" }}>
              Retour à l'accueil
            </a>
          </Link>

          {/* Étape 1 : Simulateur */}
          <div className="simulator-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h2 style={{ color: "#0F4C5C", fontSize: "1.5rem", fontWeight: "600" }}>
                Étape 1 : Paramètres
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="step-number step-active">1</div>
                <div className="step-line"></div>
                <div className="step-number step-inactive">2</div>
                <div className="step-line"></div>
                <div className="step-number step-inactive">3</div>
              </div>
            </div>

            <div>
              {/* TJM */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Taux Journalier Moyen (€ HT)</label>
                  <input
                    type="number"
                    value={tjm}
                    onChange={(e) => setTjm(Number(e.target.value))}
                    className="form-input"
                    style={{ width: "80px", textAlign: "right" }}
                  />
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min={300}
                    max={1500}
                    step={10}
                    value={tjm}
                    onChange={(e) => setTjm(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                  <div className="slider-values">
                    <span>300 €</span>
                    <span>1500 €</span>
                  </div>
                </div>
              </div>

              {/* Jours par semaine */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Jours travaillés par semaine</label>
                  <input
                    type="number"
                    value={joursParSemaine}
                    onChange={(e) => setJoursParSemaine(Number(e.target.value))}
                    min={1}
                    max={7}
                    className="form-input"
                    style={{ width: "80px", textAlign: "right" }}
                  />
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min={1}
                    max={7}
                    step={0.5}
                    value={joursParSemaine}
                    onChange={(e) => setJoursParSemaine(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                  <div className="slider-values">
                    <span>1 jour</span>
                    <span>7 jours</span>
                  </div>
                </div>
              </div>

              {/* Semaines par an */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Semaines travaillées par an</label>
                  <input
                    type="number"
                    value={semainesParAn}
                    onChange={(e) => setSemainesParAn(Number(e.target.value))}
                    min={20}
                    max={52}
                    className="form-input"
                    style={{ width: "80px", textAlign: "right" }}
                  />
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min={20}
                    max={52}
                    step={1}
                    value={semainesParAn}
                    onChange={(e) => setSemainesParAn(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                  <div className="slider-values">
                    <span>20 semaines</span>
                    <span>52 semaines</span>
                  </div>
                </div>
              </div>

              {/* Charges fixes mensuelles */}
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Charges fixes mensuelles (€)</label>
                  <input
                    type="number"
                    value={chargesFixes}
                    onChange={(e) => setChargesFixes(Number(e.target.value))}
                    className="form-input"
                    style={{ width: "80px", textAlign: "right" }}
                  />
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    step={50}
                    value={chargesFixes}
                    onChange={(e) => setChargesFixes(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                  <div className="slider-values">
                    <span>0 €</span>
                    <span>2000 €</span>
                  </div>
                </div>
              </div>

              {/* Résultat */}
              <div className="result-box">
                <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Résultat</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1rem" }}>Chiffre d'affaires annuel estimé :</span>
                  <span className="result-amount">{caAnnuel.toLocaleString("fr-FR")} € HT</span>
                </div>
              </div>

              {/* Bouton suivant */}
              <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  onClick={handleNext} 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Chargement..." : "Suivant"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
