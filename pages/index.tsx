/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";


export default function IndexPage() {
  return (
    <DefaultLayout>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            Bienvenido a Nuestra Tienda
          </p>
          <small className="text-default-500">Tenemos varios productos</small>
          <h4 className="font-bold text-large">Quieres ver más</h4>
          <Link href="/productos">
            <Button className="text-white" color="warning" startContent={<FaBoxOpen />}>Productos</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            height={500}
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={500}
          />
        </CardBody>
      </Card>
    </DefaultLayout>
  );
}
