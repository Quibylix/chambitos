import StarRating from "@/features/ui/components/star-rating.component";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Roberto Carlos",
    role: "Ingeniero Civil",
    avatar: "https://picsum.photos/200/200?ts=1",
    rating: 5,
    comment:
      "Gracias a chambitos pude encontrar a un profesional para mi proyecto de remodelación de mi casa. ¡Excelente servicio!",
  },
  {
    name: "Juan Pérez",
    role: "Plomero",
    avatar: "https://picsum.photos/200/200?ts=2",
    rating: 4,
    comment:
      "¡Con chambitos encontré mis primeros clientes para mi negocio de plomería! ¡Gracias!",
  },
  {
    name: "María González",
    role: "Jardinera",
    avatar: "https://picsum.photos/200/200",
    rating: 5,
    comment:
      "¡Excelente servicio! ¡Gracias a chambitos encontré a un profesional para mi proyecto de jardinería!",
  },
];

export default function Reviews() {
  return (
    <section className="max-w-4xl m-auto text-center p-4 md:pt-16 w-full">
      <h2 className="text-primary font-bold text-3xl md:text-5xl mb-8">
        Reseñas
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {REVIEWS.map(({ name, role, avatar, rating, comment }, index) => (
          <Card className="p-3" shadow="sm" key={index}>
            <CardHeader className="flex flex-col gap-1">
              <span className="bg-secondary-50 text-secondary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
                {role}
              </span>
              <h3 className="text-xl font-bold flex gap-4 justify-center items-center w-full">
                <Avatar
                  src={avatar}
                  ImgComponent={Image}
                  imgProps={{
                    className: "opacity-100",
                    width: 40,
                    height: 40,
                    alt: "avatar",
                  }}
                />
                {name}
              </h3>
              <StarRating rating={rating} />
            </CardHeader>
            <CardBody>
              <p>{comment}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
