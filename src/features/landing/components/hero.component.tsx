import heroImage from "@/assets/hero.png";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Hero() {
  return (
    <header className="max-w-4xl m-auto text-center p-4 md:pt-16 w-full">
      <Image
        className="max-h-96 w-auto m-auto"
        src={heroImage}
        alt="Hero image"
        width={828}
        height={571}
        priority
      />
      <h1 className="text-4xl text-black-100 font-bold h-max md:text-6xl text-balance mt-3">
        <span className="text-primary">Encuentre</span> y{" "}
        <span className="text-secondary">conecte</span> con profesionales de{" "}
        <span className="text-warning">confianza</span> hoy.
      </h1>
      <p className="text-lg leading-tight mt-4 md:text-xl text-slate-600 text-pretty">
        Con <span className="text-primary font-bold">Chambitos</span> puedes
        encontrar a las personas adecuadas para tus tareas. Desde plomeros hasta
        abogados, estamos aquí para ayudarte a encontrar a los mejores
        profesionales. ¡Comienza hoy y empieza a trabajar con los mejores! 🚀
      </p>
      <div className="flex justify-center mt-6 gap-4">
        <Button
          className="md:text-lg md:p-6"
          color="primary"
          as={NextLink}
          href="/"
        >
          Quiero contratar
        </Button>
        <Button
          className="md:text-lg md:p-6"
          color="primary"
          variant="bordered"
          as={NextLink}
          href="/"
        >
          Soy profesional
        </Button>
      </div>
    </header>
  );
}
