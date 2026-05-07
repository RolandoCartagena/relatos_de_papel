import { Book } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-neutral-300 bg-white text-center">
      <div className="flex justify-center items-center gap-2 mb-4 text-neutral-400">
        <Book size={20} />
        <span className="font-serif font-bold text-neutral-800">Relatos de Papel</span>
      </div>
      <p className="text-xs text-neutral-500 uppercase tracking-widest">
        © 2026 Relatos de Papel - Todos los derechos reservados.
      </p>
      <p className="text-[10px] text-neutral-400 mt-2">
        San Salvador, El Salvador
      </p>
    </footer>
  );
}