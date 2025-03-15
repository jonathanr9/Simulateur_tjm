import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Rediriger vers le simulateur TJM
    router.push('/outils/simulateur-tjm');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirection vers le simulateur TJM...</p>
    </div>
  );
}
