import { useNavigate } from 'react-router';
import { ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b-2 border-neutral-300 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-4 block">
            Bienvenidos a Relatos de Papel
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-neutral-900 mb-6">
            Donde cada página <br /> es un nuevo destino.
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Explora nuestra magnífica selección de literatura clásica y contemporánea. 
            Desde ediciones físicas de colección hasta los últimos lanzamientos digitales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/catalog')}
              className="px-10 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              EXPLORAR CATÁLOGO <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-4 border-2 border-neutral-300 hover:bg-neutral-100 transition-colors font-medium"
            >
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-neutral-300 p-8 shadow-sm">
            <div className="bg-neutral-100 w-12 h-12 flex items-center justify-center mb-6">
              <Truck className="text-neutral-800" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">Envío Global</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Llevamos tus historias favoritas hasta la puerta de tu casa en El Salvador, Bolivia y todo el mundo.
            </p>
          </div>

          <div className="bg-white border-2 border-neutral-300 p-8 shadow-sm">
            <div className="bg-neutral-100 w-12 h-12 flex items-center justify-center mb-6">
              <ShieldCheck className="text-neutral-800" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">Compra Segura</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Protegemos tus datos con los más altos estándares de seguridad para que solo te preocupes por leer.
            </p>
          </div>

          <div className="bg-white border-2 border-neutral-300 p-8 shadow-sm">
            <div className="bg-neutral-100 w-12 h-12 flex items-center justify-center mb-6">
              <Star className="text-neutral-800" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">Calidad Garantizada</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Cada libro en nuestro catálogo ha sido seleccionado por nuestro equipo de expertos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}