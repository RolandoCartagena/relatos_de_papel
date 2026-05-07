import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { formData, finalTotal } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  if (!formData || !finalTotal) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    const cardNumber = paymentData.cardNumber.replace(/\s/g, '');
    if (!cardNumber || cardNumber.length !== 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Nombre requerido';
    }
    if (!paymentData.expiryDate || paymentData.expiryDate.length !== 5) {
      newErrors.expiryDate = 'Fecha inválida (MM/AA)';
    }
    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePayment()) {
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Simulate 10% failure rate
      const success = Math.random() > 0.1;

      if (success) {
        clearCart();
        navigate('/confirmation', {
          state: {
            orderData: formData,
            total: finalTotal,
            orderNumber: `ORD-${Date.now()}`
          }
        });
      } else {
        setProcessing(false);
        navigate('/error/payment-failed');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/checkout')}
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
            disabled={processing}
          >
            <ArrowLeft size={20} />
            <span>Volver a datos del pedido</span>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium mb-8">PAGO SEGURO</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white border-2 border-neutral-300 p-6">
            <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">MÉTODO DE PAGO</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-neutral-500 bg-neutral-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked
                  readOnly
                  className="w-5 h-5"
                />
                <CreditCard size={24} />
                <span className="font-medium">Tarjeta de crédito/débito</span>
              </label>

              <div className="flex items-center gap-3 p-4 border-2 border-neutral-300 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  disabled
                  className="w-5 h-5"
                />
                <span>PayPal (No disponible en wireframe)</span>
              </div>

              <div className="flex items-center gap-3 p-4 border-2 border-neutral-300 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  disabled
                  className="w-5 h-5"
                />
                <span>Transferencia bancaria (No disponible en wireframe)</span>
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="bg-white border-2 border-neutral-300 p-6">
            <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">DATOS DE LA TARJETA</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-neutral-700">Número de tarjeta *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className={`w-full px-4 py-3 border-2 ${errors.cardNumber ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:border-neutral-500`}
                  placeholder="1234 5678 9012 3456"
                  disabled={processing}
                />
                {errors.cardNumber && <p className="text-red-600 text-xs mt-1">{errors.cardNumber}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-neutral-700">Nombre en la tarjeta *</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 ${errors.cardName ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:border-neutral-500`}
                  placeholder="NOMBRE APELLIDOS"
                  disabled={processing}
                />
                {errors.cardName && <p className="text-red-600 text-xs mt-1">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700">Fecha de expiración *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    maxLength={5}
                    className={`w-full px-4 py-3 border-2 ${errors.expiryDate ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:border-neutral-500`}
                    placeholder="MM/AA"
                    disabled={processing}
                  />
                  {errors.expiryDate && <p className="text-red-600 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-2 text-neutral-700">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    maxLength={3}
                    className={`w-full px-4 py-3 border-2 ${errors.cvv ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:border-neutral-500`}
                    placeholder="123"
                    disabled={processing}
                  />
                  {errors.cvv && <p className="text-red-600 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={paymentData.saveCard}
                  onChange={handleChange}
                  className="w-4 h-4"
                  disabled={processing}
                />
                <span>Guardar tarjeta para futuras compras</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border-2 border-neutral-300 p-6">
            <h2 className="text-sm mb-4 text-neutral-700">RESUMEN DEL PAGO</h2>

            <div className="space-y-2 mb-4 pb-4 border-b-2 border-neutral-200 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Destinatario:</span>
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Email:</span>
                <span>{formData.email}</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-medium">
              <span>Total a pagar:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border-2 border-green-300 p-4 flex items-start gap-3">
            <Lock className="text-green-700 shrink-0 mt-1" size={20} />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Pago 100% seguro</p>
              <p>Tu información está protegida con encriptación SSL de nivel bancario</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'PROCESANDO PAGO...' : `PAGAR $${finalTotal.toFixed(2)}`}
          </button>

          <p className="text-xs text-center text-neutral-600">
            Al hacer clic en "Pagar", aceptas nuestros términos y condiciones y política de privacidad
          </p>
        </form>
      </div>
    </div>
  );
}
