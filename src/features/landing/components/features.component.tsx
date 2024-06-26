import Feature from "@/features/ui/components/feature.component";

const FEATURES = [
  {
    title: "Profesionales verificados",
    description:
      "Todos nuestros profesionales son verificados mediante documentos oficiales y referencias. Además, han completado su perfil y cuentan con calificaciones de otros clientes. ¡Trabaja con los mejores!",
    category: "Confianza y seguridad",
  },
  {
    title: "Robusto sistema de búsqueda",
    description:
      "Nuestro sistema de búsqueda te permite encontrar a los profesionales que necesitas de forma rápida y sencilla. Filtra por categoría, precio, calificación, lugar y más.",
    category: "Búsqueda avanzada",
  },
  {
    title: "Conexión directa",
    description:
      "Con Chambitos puedes contactar directamente con el profesional que necesitas. ¡Sin intermediarios! Habla con ellos, acuerda el trabajo y comienza a trabajar.",
    category: "Mensajería instantánea",
  },
];

export default function Features() {
  return (
    <section className="max-w-4xl m-auto text-center p-4 md:pt-16 w-full">
      <h2 className="text-primary font-bold text-3xl md:text-5xl mb-8">
        Características
      </h2>
      <Feature {...FEATURES[0]} />
      <div className="mt-3 grid md:grid-cols-2 gap-1 md:gap-8">
        <Feature {...FEATURES[1]} />
        <Feature {...FEATURES[2]} />
      </div>
    </section>
  );
}
