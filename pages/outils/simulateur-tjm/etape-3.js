import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { sessionStore, localStore } from "../../../utils/storage";

export default function SimulateurTJMEtape3Page() {
  const router = useRouter();
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const data = sessionStore.getItem("contactData");
    if (data) {
      setContactData(data);
    } else {
      router.push("/outils/simulateur-tjm");
    }
    localStore.removeItem('incomplete_simulation');
  }, [router]);

  function handleRdvClick() {
    console.log("Prise de rendez-vous", contactData?.email);
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <h1>Simulateur TJM</h1>
          <p>Demande enregistrée</p>
        </div>
      </div>

      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/" legacyBehavior>
            <a className="btn btn-outline" style={{ marginBottom: "20px", display: "inline-block" }}>
              Retour à l&apos;accueil
            </a>
          </Link>

          <div className="simulator-card" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="step-number step-inactive">1</div>
                <div className="step-line step-line-active"></div>
                <div className="step-number step-inactive">2</div>
                <div className="step-line step-line-active"></div>
                <div className="step-number step-active">3</div>
              </div>
            </div>

            <div style={{ color: "#28a745", fontSize: "60px", marginBottom: "20px" }}>
              ✓
            </div>

            <h2 style={{ color: "#0F4C5C", fontSize: "1.5rem", fontWeight: "600", marginBottom: "20px" }}>
              Votre demande a été enregistrée !
            </h2>

            <p style={{ maxWidth: "600px", margin: "0 auto 30px", fontSize: "1.1rem" }}>
              Merci pour votre intérêt
              {contactData?.nom ? `, ${contactData.nom}` : ''}. 
              Vos informations ont été transmises à notre équipe.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
              <a 
                href="https://calendly.com/votre-lien-calendly"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRdvClick}
                className="btn btn-primary"
              >
                Prendre rendez-vous directement
              </a>

              <Link href="/" legacyBehavior>
                <a className="btn btn-outline">
                  Retour à l&apos;accueil
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}