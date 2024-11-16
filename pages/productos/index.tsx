/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import DefaultLayout from "@/layouts/default";
import productos from "@/data/productos";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";

const ListaProductos = () => {
  return (
    <DefaultLayout>
      <h1 className="pb-8 text-center text-3xl font-bold">Lista Productos</h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3">
        {productos.map((producto) => (
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
                    alt={producto.name}
                    className="w-full object-fill h-[140px]"
                    src={producto.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{producto.name}</b>
                  <p className="text-default-500">${producto.price}</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default ListaProductos;
