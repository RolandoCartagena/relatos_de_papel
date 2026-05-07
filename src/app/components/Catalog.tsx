import { useState } from 'react';
import { useNavigate } from 'react-router';
//import { Search, ShoppingCart, Filter, ShoppingBag } from 'lucide-react';
import { Search, Filter} from 'lucide-react';
import { mockBooks } from '../data/books';
//import { useCart } from '../context/CartContext';

export default function Catalog() {
  const navigate = useNavigate();
  //const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'physical' | 'digital'>('all');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || book.type === filterType;
    return matchesSearch && matchesFilter;
  });

  //const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-card border-2 border-border p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-neutral-700">BÚSQUEDA</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título o autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-neutral-700">FILTRO POR TIPO</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'physical' | 'digital')}
                  className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="physical">Físico</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-600">
            {filteredBooks.length} resultado(s) encontrado(s)
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map(book => (
            <button
              key={book.id}
              onClick={() => navigate(`/product/${book.id}`)}
              className="bg-white border-2 border-neutral-300 p-4 hover:border-neutral-500 transition-colors text-left"
            >
              {/* Book Cover Placeholder */}
              <div className="w-full aspect-2/3 bg-neutral-200 mb-4 overflow-hidden shadow-sm">
                <div className="text-6xl text-neutral-400">
                  <img src={book.coverImage} alt={book.title}className="w-full aspect-[2/3] object-cover mb-4 shadow-md"/>
                </div>
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <h3 className="font-medium line-clamp-2 min-h-12">{book.title}</h3>
                <p className="text-sm text-neutral-600">{book.author}</p>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs border border-neutral-300 bg-neutral-50">
                    {book.type === 'physical' ? 'FÍSICO' : 'DIGITAL'}
                  </span>
                  {book.stock === 0 && (
                    <span className="px-2 py-1 text-xs border border-red-600 bg-red-50 text-red-700">
                      SIN STOCK
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-xl font-medium">${book.price.toFixed(2)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="bg-white border-2 border-neutral-300 p-12 text-center">
            <div className="text-neutral-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-neutral-600">No se encontraron libros que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
