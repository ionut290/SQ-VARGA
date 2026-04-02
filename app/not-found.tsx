import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card">
      <h2>Pagina non trovata</h2>
      <p>Il percorso richiesto non esiste o la risorsa è stata rimossa.</p>
      <Link href="/">Torna alla Home</Link>
    </div>
  );
}
