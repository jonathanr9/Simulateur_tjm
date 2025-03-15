import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router"; // Changé de "next/navigation" à "next/router" pour Next.js 12
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { localStorage, sessionStorage } from "@/utils/storage";
import { captureUtmParams } from "@/utils/tracking";

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
    const savedSimulation = localStorage.getItem('incomplete_simulation');
    if (savedSimulation) {
      if (confirm('Voulez-vous reprendre votre simulation précédente?')) {
        setTjm(savedSimulation.tjm || 500);
        setJoursParSemaine(savedSimulation.joursParSemaine || 5);
        setSemainesParAn(savedSimulation.semainesParAn || 47);
        setChargesFixes(savedSimulation.chargesFixes || 500);
      } else {
        localStorage.removeItem('incomplete_simulation');
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
      localStorage.setItem('incomplete_simulation', simulationData);
    }
  }, [tjm, joursParSemaine, semainesParAn, chargesFixes]);

  const handleNext = async () => {
    setIsLoading(true);
    
    try {
      // Stocker les données dans sessionStorage pour les récupérer à l'étape suivante
      sessionStorage.setItem(
        "simulateurData",
        {
          tjm,
          joursParSemaine,
          semainesParAn,
          chargesFixes,
          caAnnuel,
          utmSource: utmParams?.source || null,
          utmMedium: utmParams?.medium || null,
          utmCampaign: utmParams?.campaign || null
        }
      );
      
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
    <div className="pt-24 pb-16">
      {/* En-tête de la page avec fond complètement opaque */}
      <div className="bg-primary py-16 mb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center"
          >
            Simulateur TJM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/90 text-center mt-3 sm:mt-4 max-w-2xl mx-auto px-4 sm:px-0"
          >
            Calculez votre Taux Journalier Moyen et estimez vos revenus
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/outils">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux outils
            </Button>
          </Link>

          {/* Étape 1 : Simulateur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-5 sm:p-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-primary flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Étape 1 : Paramètres
              </h2>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* TJM */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="tjm" className="text-gray-700 font-medium">
                    Taux Journalier Moyen (€ HT)
                  </Label>
                  <Input
                    id="tjm-value"
                    type="number"
                    value={tjm}
                    onChange={(e) => setTjm(Number(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  id="tjm"
                  min={300}
                  max={1500}
                  step={10}
                  value={[tjm]}
                  onValueChange={(value) => setTjm(value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>300 €</span>
                  <span>1500 €</span>
                </div>
              </div>

              {/* Jours par semaine */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="jours-semaine" className="text-gray-700 font-medium">
                    Jours travaillés par semaine
                  </Label>
                  <Input
                    id="jours-semaine-value"
                    type="number"
                    value={joursParSemaine}
                    onChange={(e) => setJoursParSemaine(Number(e.target.value))}
                    min={1}
                    max={7}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  id="jours-semaine"
                  min={1}
                  max={7}
                  step={0.5}
                  value={[joursParSemaine]}
                  onValueChange={(value) => setJoursParSemaine(value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 jour</span>
                  <span>7 jours</span>
                </div>
              </div>

              {/* Semaines par an */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="semaines-an" className="text-gray-700 font-medium">
                    Semaines travaillées par an
                  </Label>
                  <Input
                    id="semaines-an-value"
                    type="number"
                    value={semainesParAn}
                    onChange={(e) => setSemainesParAn(Number(e.target.value))}
                    min={20}
                    max={52}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  id="semaines-an"
                  min={20}
                  max={52}
                  step={1}
                  value={[semainesParAn]}
                  onValueChange={(value) => setSemainesParAn(value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>20 semaines</span>
                  <span>52 semaines</span>
                </div>
              </div>

              {/* Charges fixes mensuelles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="charges-fixes" className="text-gray-700 font-medium">
                    Charges fixes mensuelles (€)
                  </Label>
                  <Input
                    id="charges-fixes-value"
                    type="number"
                    value={chargesFixes}
                    onChange={(e) => setChargesFixes(Number(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  id="charges-fixes"
                  min={0}
                  max={2000}
                  step={50}
                  value={[chargesFixes]}
                  onValueChange={(value) => setChargesFixes(value[0])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 €</span>
                  <span>2000 €</span>
                </div>
              </div>

              {/* Résultat */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Résultat</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Chiffre d'affaires annuel estimé :</span>
                  <span className="text-2xl font-bold text-primary">{caAnnuel.toLocaleString("fr-FR")} € HT</span>
                </div>
              </div>

              {/* Bouton suivant */}
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleNext} 
                  className="bg-gradient-to-r from-primary to-primary-light text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Chargement..." : "Suivant"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
