// src/app/views/Checkout.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.fullName?.split(" ")[0] || "",
    lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
    phone: "",
    address: user?.address || "",
    city: user?.city || "",
    state: "",
    zipCode: "",
    country: user?.countryName || "El Salvador",
    shippingMethod: "standard",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const hasPhysicalBooks = cart.some(
    (item) => item.type === "Físico" || item.type === "physical",
  );
  const shippingCost = hasPhysicalBooks
    ? formData.shippingMethod === "express"
      ? 9.99
      : 4.99
    : 0;
  const taxes = total * 0.21;
  const finalTotal = total + shippingCost + taxes;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Email inválido";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Campo requerido";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Campo requerido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Campo requerido";
    }

    if (hasPhysicalBooks) {
      if (!formData.address.trim()) newErrors.address = "Campo requerido";
      if (!formData.city.trim()) newErrors.city = "Campo requerido";
      if (!formData.state.trim()) newErrors.state = "Campo requerido";
      if (!formData.zipCode.trim()) newErrors.zipCode = "Campo requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ handleSubmit solo navega a Payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // ← Usar setLoading
    if (!validateForm()) return;

      setError('Error'); // ← Usar setError
  setLoading(false);
    // ✅ Navegar a Payment con los datos del formulario
    navigate("/payment", {
      state: {
        formData,
        finalTotal,
        userEmail: formData.email,
        userId: user?.id || "anonymous",
      },
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white border-b-2 border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
            disabled={loading}
          >
            <ArrowLeft size={20} />
            <span>Volver al carrito</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-medium mb-8">DATOS DEL PEDIDO</h1>

        {error && (
          <div className="bg-red-50 border-2 border-red-500 p-4 mb-6 text-red-800">
            <p>{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">
                1. INFORMACIÓN DE CONTACTO
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${errors.email ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                    placeholder="tu@email.com"
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-neutral-700">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.firstName ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                      disabled={loading}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-neutral-700">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.lastName ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                      disabled={loading}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-700">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${errors.phone ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                    placeholder="+503 0000 0000"
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {hasPhysicalBooks && (
              <div className="bg-white border-2 border-neutral-300 p-6">
                <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">
                  2. DIRECCIÓN DE ENVÍO
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-neutral-700">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.address ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                      placeholder="Calle y número"
                      disabled={loading}
                    />
                    {errors.address && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-neutral-700">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 ${errors.city ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                        disabled={loading}
                      />
                      {errors.city && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-neutral-700">
                        Departamento *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 ${errors.state ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                        disabled={loading}
                      />
                      {errors.state && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-neutral-700">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 ${errors.zipCode ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-500`}
                        disabled={loading}
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-neutral-700">
                        País *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 bg-white"
                        disabled={loading}
                      >
                        <option>El Salvador</option>
                        <option>México</option>
                        <option>Argentina</option>
                        <option>Colombia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasPhysicalBooks && (
              <div className="bg-white border-2 border-neutral-300 p-6">
                <h2 className="text-sm mb-4 pb-4 border-b-2 border-neutral-200">
                  3. MÉTODO DE ENVÍO
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-300 cursor-pointer hover:bg-neutral-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleChange}
                      className="w-5 h-5"
                      disabled={loading}
                    />
                    <div className="grow">
                      <div className="font-medium">
                        Envío estándar (5-7 días)
                      </div>
                      <div className="text-sm text-neutral-600">
                        Entrega en horario laboral
                      </div>
                    </div>
                    <div className="font-medium">$4.99</div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-300 cursor-pointer hover:bg-neutral-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleChange}
                      className="w-5 h-5"
                      disabled={loading}
                    />
                    <div className="grow">
                      <div className="font-medium">
                        Envío express (2-3 días)
                      </div>
                      <div className="text-sm text-neutral-600">
                        Entrega prioritaria
                      </div>
                    </div>
                    <div className="font-medium">$9.99</div>
                  </label>
                </div>
              </div>
            )}

            {!hasPhysicalBooks && (
              <div className="bg-blue-50 border-2 border-blue-300 p-4">
                <p className="text-blue-800">
                  ℹ️ Tu pedido contiene solo libros digitales. Recibirás los
                  enlaces de descarga por email tras la confirmación del pago.
                </p>
              </div>
            )}

            {/* ✅ Botón dentro del formulario con type="submit" */}
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    PROCESANDO...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    CONTINUAR AL PAGO
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white border-2 border-neutral-300 p-6 sticky top-4">
              <h2 className="text-sm mb-4 text-neutral-700">
                RESUMEN DEL PEDIDO
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b-2 border-neutral-200 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="grow pr-2 truncate">
                      {item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b-2 border-neutral-200 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Envío:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">IVA (21%):</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-medium mb-6">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
