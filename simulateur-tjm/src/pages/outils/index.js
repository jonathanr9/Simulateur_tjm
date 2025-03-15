import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OutilsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8">Nos outils</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Simulateur de TJM</h2>
            <p className="text-gray-600 mb-4">
              Calculez votre Taux Journalier Moyen et estimez vos revenus annuels.
            </p>
            <Link href="/outils/simulateur-tjm">
              <Button>Accéder au simulateur</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
