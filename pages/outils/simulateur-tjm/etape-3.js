import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../components/ui/Button";
import { sessionStore, localStore } from "../../../utils/storage";

export default function SimulateurTJMEtape3Page() {
  const router = useRouter();
  const [contactData, setContactData] = useState(null);

  // Récupérer les données de contact au chargement de la page
  useEffect(() => {
    const data = sessionStore.getItem("contactData");
    if (data) {
      setContactData(data);
    } else {
      // Rediriger vers l'étape 1 si aucune donnée n'est trouvée
      router.push("/outils/simulateur-tjm");
    }

    // Nettoyer le localStorage après confirmation
    localStore.removeItem('incomplete_simulation');
  }, [router]);

  // Fonction pour suivre les clics sur le bouton de prise de rendez-vous
  const handleRdvClick = () => {
    // Ici vous pourriez ajouter un tracking d'événement
    console.log("Prise de rendez-vous", contactData?.email);
  };

  return (
    <div className="pt-8 pb-16">
      <div className="bg-blue-700 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Simulateur TJM
          </h1>
          <p className="text-white/90 text-center mt-4 max-w-2xl mx-auto">
            Demande enregistrée
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" legacyBehavior>
            <Button variant="ghost" className="mb-8">
              Retour à l'accueil
            </Button>
          </Link>

          {/* Étape 3 : Confirmation */}
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-8 h-1 bg-blue-600"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-8 h-1 bg-blue-600"></div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
            </div>

            <svg className="h-20 w-20 text-green-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Votre demande a été enregistrée !</h2>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Merci pour votre intérêt{contactData?.nom ? `, ${contactData.nom}` : ''}. Vos informations ont été transmises à notre équipe. Nous vous contacterons très
              prochainement pour discuter de votre situation et vous proposer un accompagnement personnalisé.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
                href="https://calendly.com/votre-lien-calendly"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRdvClick}
              >
                <Button>
                  Prendre rendez-vous directement
                </Button>
              </a>

              <Link href="/" legacyBehavior>
                <Button variant="outline">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
