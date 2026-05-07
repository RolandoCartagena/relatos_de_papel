import type { Book } from '../context/CartContext';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    price: 25.99,
    type: 'physical',
    stock: 15,
    isbn: '978-0307474728',
    pages: 417,
    description: 'Una obra maestra del realismo mágico que narra la historia de la familia Buendía.'
  },
  {
    id: '2',
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    price: 12.99,
    type: 'digital',
    stock: 999,
    isbn: '978-0156012195',
    pages: 96,
    description: 'Un cuento poético que explora temas de amor, pérdida y soledad.'
  },
  {
    id: '3',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 35.50,
    type: 'physical',
    stock: 8,
    isbn: '978-8491050353',
    pages: 1072,
    description: 'La obra cumbre de la literatura española y una de las más importantes de la literatura universal.'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    price: 15.99,
    type: 'digital',
    stock: 999,
    isbn: '978-0451524935',
    pages: 328,
    description: 'Una distopía sobre un régimen totalitario que controla cada aspecto de la vida.'
  },
  {
    id: '5',
    title: 'Rayuela',
    author: 'Julio Cortázar',
    price: 22.00,
    type: 'physical',
    stock: 0,
    isbn: '978-8420471648',
    pages: 600,
    description: 'Una novela experimental que puede leerse en múltiples órdenes.'
  },
  {
    id: '6',
    title: 'La sombra del viento',
    author: 'Carlos Ruiz Zafón',
    price: 18.99,
    type: 'physical',
    stock: 20,
    isbn: '978-8408163381',
    pages: 576,
    description: 'Un joven descubre un libro misterioso en el Cementerio de los Libros Olvidados.'
  },
  {
    id: '7',
    title: 'El amor en los tiempos del cólera',
    author: 'Gabriel García Márquez',
    price: 19.99,
    type: 'digital',
    stock: 999,
    isbn: '978-0307389732',
    pages: 368,
    description: 'Una historia de amor que perdura a través de los años y las circunstancias.'
  },
  {
    id: '8',
    title: 'Ficciones',
    author: 'Jorge Luis Borges',
    price: 16.50,
    type: 'physical',
    stock: 12,
    isbn: '978-0802130303',
    pages: 174,
    description: 'Colección de cuentos que exploran conceptos filosóficos y metafísicos.'
  }
];
