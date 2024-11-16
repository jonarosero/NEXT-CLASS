/* eslint-disable prettier/prettier */
import {useRouter} from 'next/router'
import DefaultLayout from '@/layouts/default'
import productos from '@/data/productos';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import NextImage from "next/image";
import { Button } from '@nextui-org/button';


const ProductoDetalle = () => {
    const router = useRouter();

    const {id} = router.query;

    const producto = productos.find((p)=>p.id===parseInt(id));

    if (!producto) {
        return <DefaultLayout>
            <div className='text-center'>Producto no encontrado</div>
        </DefaultLayout>
    }

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
            <Image
            as={NextImage}
              alt={producto.name}
              className="object-cover"
              height={400}
              shadow="md"
              src={producto.image}
              width={300}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="text-xl font-bold mt-2 pb-4">{producto.name}</h1>
                <h3 className="font-semibold text-foreground/90">Precio Unitario:${producto.price}</h3>
                <p className="text-small text-foreground/80"> {producto.description}</p>
                <p className="text-small text-foreground/80 pt-4"><strong>Categoría: </strong>{producto.category}</p>

                <Button className='mt-8' color="secondary" variant="shadow">Añadir al Carrito</Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </DefaultLayout>
  )
}

export default ProductoDetalle