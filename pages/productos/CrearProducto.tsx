/* eslint-disable */
import React, { useState } from "react";
import { useRouter } from "next/router";
import productos from "@/data/productos"; // Importa la lista de productos existentes
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import DefaultLayout from "@/layouts/default";

// Categorías disponibles
const categorias = [
  { label: "Ropa", value: "Ropa" },
  { label: "Electrónica", value: "Electrónica" },
  { label: "Calzado", value: "Calzado" },
  { label: "Tecnología", value: "Tecnología" },
  { label: "Muebles", value: "Muebles" },
  { label: "Hogar", value: "Hogar" },
  { label: "Electrodomésticos", value: "Electrodomésticos" },
];

const CrearProducto = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleCreateProduct = () => {
    // Validar los campos requeridos
    console.log(name, description, price, category, image)
    if (!name || !description || !price || !category || !image) {
      
       alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear el nuevo producto
    const newProduct = {
      id: productos.length + 1, // Generar un ID incremental
      name,
      description,
      price: parseFloat(price),
      category,
      image,
    };

    // Agregar el nuevo producto a la lista (esto sería un backend o un estado global)
    productos.push(newProduct);

    // Redirigir a la página principal de productos
    alert("Producto creado con éxito.");
    router.push("/productos");
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Crear Nuevo Producto</h1>

        <Input
          label="Nombre del Producto"
          placeholder="Ej: Camiseta de Algodón"
          value={name}
          onValueChange={setName}
        />

        <p className="text-sm text-gray-700">Descripción del producto:</p>
        <textarea
          placeholder="Ej: Camiseta suave y cómoda."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Input
          label="Precio"
          placeholder="Ej: 20.00"
          type="number"
          value={price}
          onValueChange={setPrice}
        />

        <Autocomplete
          label="Categoría"
          placeholder="Selecciona una categoría"
          className="max-w-xs"
          onSelectionChange={(value) => setCategory(value as string)}
          onInputChange={setCategory}
          defaultItems={categorias}
        >
          {categorias.map((categoria) => (
            <AutocompleteItem key={categoria.value} value={categoria.value}>
              {categoria.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Input
          label="URL de la Imagen"
          placeholder="Ej: https://images.unsplash.com/photo..."
          value={image}
          onValueChange={setImage}
        />

        <Button color="primary" onPress={handleCreateProduct}>
          Crear Producto
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default CrearProducto;
