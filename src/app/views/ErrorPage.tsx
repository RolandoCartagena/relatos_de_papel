import { useNavigate, useParams } from 'react-router';
import { AlertCircle, XCircle, PackageX } from 'lucide-react';

export default function ErrorPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const errorConfig = {
    'payment-failed': {
      icon: XCircle,
      title: 'Error en el pago',
      message: 'No se pudo procesar tu pago. Por favor, verifica los datos de tu tarjeta e inténtalo de nuevo.',
      details: [
        'Verifica que el número de tarjeta sea correcto',
        'Asegúrate de que tu tarjeta tenga fondos suficientes',
        'Confirma que la fecha de expiración sea válida',
        'Contacta con tu banco si el problema persiste'
      ],
      primaryAction: {
        label: 'INTENTAR DE NUEVO',
        path: '/payment'
      },
      secondaryAction: {
        label: 'CAMBIAR MÉTODO DE PAGO',
        path: '/checkout'
      }
    },
    'out-of-stock': {
      icon: PackageX,
      title: 'Producto sin stock',
      message: 'Lo sentimos, este producto ya no está disponible.',
      details: [
        'El producto se agotó recientemente',
        'Puedes explorar productos similares en nuestro catálogo',
        'Regístrate para recibir notificaciones cuando vuelva a estar disponible',
        'Nuestro inventario se actualiza constantemente'
      ],
      primaryAction: {
        label: 'VER PRODUCTOS SIMILARES',
        path: '/catalog'
      },
      secondaryAction: {
        label: 'VOLVER AL CARRITO',
        path: '/cart'
      }
    },
    'cancelled': {
      icon: AlertCircle,
      title: 'Pedido cancelado',
      message: 'Has cancelado el proceso de compra.',
      details: [
        'No se ha realizado ningún cargo',
        'Tus productos siguen en el carrito',
        'Puedes continuar comprando cuando quieras',
        'El carrito se guardará durante 24 horas'
      ],
      primaryAction: {
        label: 'VOLVER AL CARRITO',
        path: '/cart'
      },
      secondaryAction: {
        label: 'SEGUIR COMPRANDO',
        path: '/catalog'
      }
    }
  };

  const config = errorConfig[type as keyof typeof errorConfig] || {
    icon: AlertCircle,
    title: 'Error',
    message: 'Ha ocurrido un error inesperado.',
    details: ['Por favor, inténtalo de nuevo más tarde'],
    primaryAction: {
      label: 'VOLVER AL INICIO',
      path: '/catalog'
    },
    secondaryAction: null
  };

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border-2 border-red-500 p-8 mb-6">
          <div className="text-center mb-6">
            <IconComponent size={64} className="mx-auto mb-4 text-red-600" />
            <h1 className="text-3xl font-medium mb-3">{config.title}</h1>
            <p className="text-lg text-neutral-600">{config.message}</p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 p-6">
            <h2 className="text-sm mb-3 text-red-900">INFORMACIÓN ADICIONAL:</h2>
            <ul className="space-y-2 text-sm text-red-800">
              {config.details.map((detail, index) => (
                <li key={index}>• {detail}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-neutral-300 p-6 mb-6">
          <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">¿QUÉ PUEDES HACER?</h2>

          <div className="space-y-4">
            <button
              onClick={() => navigate(config.primaryAction.path)}
              className="w-full px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700"
            >
              {config.primaryAction.label}
            </button>

            {config.secondaryAction && (
              <button
                onClick={() => navigate(config.secondaryAction.path)}
                className="w-full px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100"
              >
                {config.secondaryAction.label}
              </button>
            )}

            <button
              onClick={() => navigate('/catalog')}
              className="w-full px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100"
            >
              VOLVER AL CATÁLOGO
            </button>
          </div>
        </div>

        <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
          <p className="text-sm text-neutral-600 mb-3">
            <strong>¿Necesitas ayuda?</strong>
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Si el problema persiste, no dudes en contactarnos
          </p>
          <div className="space-y-2 text-sm">
            <p>📧 Email: <strong>soporte@libros.com</strong></p>
            <p>📞 Teléfono: <strong>+34 900 123 456</strong></p>
            <p>💬 Chat en vivo: <strong>Disponible 9:00 - 21:00</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
