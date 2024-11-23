/* eslint-disable */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import DefaultLayout from "@/layouts/default";
import { Category } from "@/data/Category";

// URL de las APIs
const API_CATEGORIES_URL = "https://api.escuelajs.co/api/v1/categories";
const API_CREATE_PRODUCT_URL = "https://api.escuelajs.co/api/v1/products";

const CrearProducto = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] =  useState<string | null>(null);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(API_CATEGORIES_URL);
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleCreateProduct = async () => {
    // Validar los campos requeridos
    if (!name || !description || !price || !categoryId || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear el nuevo producto
    const newProduct = {
      title: name,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId), // El categoryId debe ser un número entero
      images: [image],
    };

    // Enviar el producto a la API
    try {
      const response = await fetch(API_CREATE_PRODUCT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      const createdProduct = await response.json(); // Obtener el producto recién creado
      alert("Producto creado con éxito.");
      
      // Redirigir a la página del producto recién creado
      router.push(`/productos/${createdProduct.id}`); // Redirigir al detalle del producto

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert("Hubo un problema al crear el producto: " + error.message);
          } else {
            alert("Hubo un problema al crear el producto: " + error);
          }
    }
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
          onSelectionChange={(value) => setCategoryId(value ? String(value) : null)}
        >
          {categories.map((category) => (
            <AutocompleteItem key={category.id} value={category.id}>
              {category.name}
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

