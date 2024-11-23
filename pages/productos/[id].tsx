/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/default';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import NextImage from "next/image";
import { Button } from '@nextui-org/button';
import { useCart } from '@/config/hooks/CarContext';
import { useEffect, useState } from 'react';
import { Product } from '@/data/Products';

const ProductoDetalle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [producto, setProducto] =  useState<Product | null>(null);

  // Obtener el producto desde la API
  const fetchProducto = async (productId: string) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  // Llamar a la API cuando el id cambie
  useEffect(() => {
    if (id) {
      fetchProducto(id as string);
    }
  }, [id]);

  // Si el producto no existe, mostrar un mensaje de error
  if (!producto) {
    return <DefaultLayout>
      <div className='text-center'>Producto no encontrado</div>
    </DefaultLayout>
  }

  const handleAddToCart = () => {
    addToCart(producto); // Añadir producto al carrito
    alert("Producto añadido al carrito");
  };

  const cleanImageUrl = producto.images[0].replace(/^["[\]]+|["[\]]+$/g, '');


  return (
    <DefaultLayout>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              {/* Mostrar solo la primera imagen */}
              <Image
                as={NextImage}
                alt={producto.title}
                className="object-cover"
                height={400}
                shadow="md"
                src={cleanImageUrl}
                unoptimized={true}  // Usar la primera imagen de la lista
                width={300}
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="text-xl font-bold mt-2 pb-4">{producto.title}</h1>
                  <h3 className="font-semibold text-foreground/90">Precio Unitario: ${producto.price}</h3>
                  <p className="text-small text-foreground/80">{producto.description}</p>
                  <p className="text-small text-foreground/80 pt-4"><strong>Categoría: </strong>{producto.category.name}</p>

                  <Button className='mt-8' color="secondary" variant="shadow" onPress={handleAddToCart}>
                    Añadir al Carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </DefaultLayout>
  );
};

export default ProductoDetalle;