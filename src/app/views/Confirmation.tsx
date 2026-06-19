import { useNavigate, useLocation } from "react-router";
import { CheckCircle2, Package, Home } from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, total, orderNumber } = location.state || {};

  if (!orderData || !total || !orderNumber) {
    navigate("/cart");
    return null;
  }

  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Mensaje de éxito */}
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

        {/* Detalles del pedido */}
        <div className="bg-white border-2 border-neutral-300 p-6 mb-6">
          <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">
            DETALLES DEL PEDIDO
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Fecha:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total:</span>
              <span className="font-medium text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Método de pago:</span>
              <span>Tarjeta •••• 3456</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            SEGUIR COMPRANDO
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100 flex items-center justify-center gap-2"
          >
            <Package size={20} />
            VER MIS PEDIDOS
          </button>
        </div>
      </div>
    </div>
  );
}
