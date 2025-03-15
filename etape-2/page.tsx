"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SimulateurTJMEtape2Page() {
  const router = useRouter()

  // États pour les informations de contact
  const [nom, setNom] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telephone, setTelephone] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [statut, setStatut] = useState<string>("auto-entrepreneur")
  const [simulateurData, setSimulateurData] = useState<any>(null)

  // Récupérer les données de l'étape 1
  useEffect(() => {
    const data = sessionStorage.getItem("simulateurData")
    if (data) {
      setSimulateurData(JSON.parse(data))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Stocker les données du formulaire
    sessionStorage.setItem(
      "contactData",
      JSON.stringify({
        nom,
        email,
        telephone,
        message,
        statut,
      }),
    )

    // Rediriger vers l'étape 3
    router.push("/outils/simulateur-tjm/etape-3")
  }

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
            Vos informations de contact
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/outils/simulateur-tjm">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'étape 1
            </Button>
          </Link>

          {/* Étape 2 : Informations de contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[#0F4C5C] flex items-center">
                <User className="mr-2 h-5 w-5" />
                Étape 2 : Vos informations
              </h2>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-8 h-1 bg-[#0F4C5C]"></div>
                <div className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold">
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
                  rendez-vous gratuit. Nous vous proposons une solution sur mesure adaptée à votre situation, avec un
                  devis transparent et sans surprise.
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
                <RadioGroup value={statut} onValueChange={setStatut} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto-entrepreneur" id="auto-entrepreneur" />
                    <Label htmlFor="auto-entrepreneur">Auto-entrepreneur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eurl-sarl" id="eurl-sarl" />
                    <Label htmlFor="eurl-sarl">EURL / SARL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sasu-sas" id="sasu-sas" />
                    <Label htmlFor="sasu-sas">SASU / SAS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="salarie" id="salarie" />
                    <Label htmlFor="salarie">Salarié</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="autre" id="autre" />
                    <Label htmlFor="autre">Autre</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message (facultatif)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Précisez votre demande ou vos questions..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {/* Bouton suivant */}
              <div className="mt-8 flex justify-end">
                <Button type="submit" className="bg-gradient-to-r from-[#0F4C5C] to-[#0EA5E9] text-white">
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

