"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SimulateurTJMEtape3Page() {
  // Simuler l'envoi d'email au chargement de la page
  useEffect(() => {
    const simulateurData = sessionStorage.getItem("simulateurData")
    const contactData = sessionStorage.getItem("contactData")

    if (simulateurData && contactData) {
      // Dans un environnement réel, vous enverriez ces données à votre backend
      console.log("Données à envoyer à contact@linx-expertise.fr:", {
        simulateur: JSON.parse(simulateurData),
        contact: JSON.parse(contactData),
      })

      // Nettoyer le sessionStorage après envoi
      // sessionStorage.removeItem('simulateurData')
      // sessionStorage.removeItem('contactData')
    }
  }, [])

  return (
    <div className="pt-24 pb-16">
      {/* En-tête de la page avec fond complètement opaque */}
      <div className="bg-[#0F4C5C] py-16 mb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Simulateur TJM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/90 text-center mt-4 max-w-2xl mx-auto"
          >
            Demande enregistrée
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

          {/* Étape 3 : Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-8 h-1 bg-[#0F4C5C]"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-8 h-1 bg-[#0F4C5C]"></div>
                <div className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
            </div>

            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />

            <h2 className="text-2xl font-semibold text-[#0F4C5C] mb-4">Votre demande a été enregistrée !</h2>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Merci pour votre intérêt. Vos informations ont été transmises à notre équipe. Nous vous contacterons très
              prochainement pour discuter de votre situation et vous proposer un accompagnement personnalisé.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/celine-atienza/prise-de-rendez-vous?month=2025-03"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-[#0F4C5C] to-[#0EA5E9] text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous directement
                </Button>
              </a>

              <Link href="/">
                <Button variant="outline" className="border-[#0F4C5C] text-[#0F4C5C]">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

