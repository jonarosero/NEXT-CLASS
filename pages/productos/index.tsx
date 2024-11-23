/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import { Product } from "@/data/Products";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Product[]>([]); // Almacena los productos
  const [total, setTotal] = useState(0); // Total de productos disponibles en la API
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [limit] = useState(12); // Cantidad de productos por página
  const [loading, setLoading] = useState(false); // Controla el estado de carga

  // Fetch de productos desde la API
  const fetchProductos = async (page: any) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit; // Calcular el desplazamiento
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      setProductos(data);

      // Obtener el total de productos una sola vez
      if (!total) {
        const totalResponse = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const totalData = await totalResponse.json();
        setTotal(totalData.length);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al inicializar o cuando cambie la página actual
  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage]);

  // Manejar el cambio de página
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <DefaultLayout>
      <h1 className="pb-8 text-center text-3xl font-bold">
        Lista de Productos
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3">
        {productos.map((producto) => {
          const cleanImageUrl = producto.images[0].replace(
            /^["[\]]+|["[\]]+$/g,
            ""
          );

          return (
            <div key={producto.id}>
              <Link href={`/productos/${producto.id}`}>
                <Card shadow="sm">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      as={NextImage}
                      shadow="sm"
                      radius="lg"
                      width="200"
                      height="200"
                      alt={producto.title}
                      className="w-full object-fill h-[140px]"
                      src={cleanImageUrl}
                      unoptimized={true}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{producto.title}</b>
                    <p className="text-default-500">${producto.price}</p>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <Pagination
          total={Math.ceil(total / limit)} // Total de páginas
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
          showControls
        />
      </div>

      {loading && <p className="text-center mt-8">Cargando...</p>}
    </DefaultLayout>
  );
};

export default ListaProductos;
