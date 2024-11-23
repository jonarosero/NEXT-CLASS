/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useCart } from "@/config/hooks/CarContext";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";

const Carrito = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const IVA = subtotal * 0.15;
  const totalConIVA = subtotal + IVA;

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            <ul className="divide-y divide-gray-200">
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-sm text-gray-500">
                      Precio Unitario: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <p className="text-lg font-semibold">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
              <p className="text-lg font-semibold">
                IVA (15%): ${IVA.toFixed(2)}
              </p>
              <p className="text-lg font-bold">
                Total con IVA: ${totalConIVA.toFixed(2)}
              </p>
            </div>

            <Button className="w-full mt-4" color="primary" variant="shadow">
              Proceder al Pago
            </Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Carrito;
