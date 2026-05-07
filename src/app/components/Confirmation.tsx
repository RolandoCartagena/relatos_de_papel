import { useNavigate, useLocation } from 'react-router';
import { CheckCircle2, Download, Mail, Package } from 'lucide-react';
import { useEffect } from 'react';

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, total, orderNumber } = location.state || {};

  useEffect(() => {
    if (!orderData || !total || !orderNumber) {
      navigate('/cart');
    }
  }, [orderData, total, orderNumber, navigate]);

  if (!orderData || !total || !orderNumber) {
    return null;
  }

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Message */}
        <div className="bg-white border-2 border-green-500 p-8 mb-6 text-center">
          <CheckCircle2 size={64} className="mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-medium mb-2">¡Pedido confirmado!</h1>
          <p className="text-neutral-600 mb-6">
            Gracias por tu compra. Hemos recibido tu pedido correctamente.
          </p>

          <div className="bg-neutral-50 border-2 border-neutral-300 p-4 inline-block">
            <p className="text-sm text-neutral-600 mb-1">Número de pedido</p>
            <p className="text-2xl font-medium">{orderNumber}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white border-2 border-neutral-300 p-6 mb-6">
          <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">DETALLES DEL PEDIDO</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Fecha del pedido:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total pagado:</span>
              <span className="font-medium text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Método de pago:</span>
              <span>Tarjeta •••• 3456</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white border-2 border-neutral-300 p-6 mb-6">
          <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">INFORMACIÓN DEL CLIENTE</h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-neutral-600 mb-2">Datos de contacto:</p>
              <p className="font-medium">{orderData.firstName} {orderData.lastName}</p>
              <p>{orderData.email}</p>
              <p>{orderData.phone}</p>
            </div>

            {orderData.address && (
              <div>
                <p className="text-neutral-600 mb-2">Dirección de envío:</p>
                <p>{orderData.address}</p>
                <p>{orderData.city}, {orderData.state}</p>
                <p>{orderData.zipCode}, {orderData.country}</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border-2 border-neutral-300 p-6 mb-6">
          <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">PRÓXIMOS PASOS</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Mail size={24} className="text-neutral-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Confirmación por email</p>
                <p className="text-neutral-600">
                  Te hemos enviado un email de confirmación a <strong>{orderData.email}</strong> con todos los detalles de tu pedido.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Download size={24} className="text-neutral-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Libros digitales</p>
                <p className="text-neutral-600">
                  Los enlaces de descarga para tus libros digitales estarán disponibles en el email de confirmación.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Package size={24} className="text-neutral-500 shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Envío de libros físicos</p>
                <p className="text-neutral-600">
                  Tus libros físicos serán enviados en 24-48 horas. Recibirás un código de seguimiento por email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border-2 border-blue-300 p-6 mb-6 text-sm">
          <p className="text-blue-800 mb-3">
            <strong>Información adicional:</strong>
          </p>
          <ul className="space-y-2 text-blue-700">
            <li>• Puedes consultar el estado de tu pedido en tu cuenta</li>
            <li>• Tienes 30 días para devoluciones (libros físicos)</li>
            <li>• Política de reembolso completo si no estás satisfecho</li>
            <li>• Soporte disponible en soporte@libros.com</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/catalog')}
            className="px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700"
          >
            SEGUIR COMPRANDO
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100"
          >
            IMPRIMIR CONFIRMACIÓN
          </button>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-center text-sm text-neutral-600">
          <p>¿Necesitas ayuda? Contáctanos en <strong>soporte@relatosdepapel.com.sv</strong></p>
          <p className="mt-2">Referencia del pedido: {orderNumber}</p>
        </div>
      </div>
    </div>
  );
}
