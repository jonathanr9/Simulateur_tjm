import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/outils/simulateur-tjm')
  }, [router])
  
  return <div>Redirection...</div>
}
