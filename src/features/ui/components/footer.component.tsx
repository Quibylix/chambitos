import { Link } from "@nextui-org/react";
import Image from "next/image";

const FOOTER_LINKS = [
  {
    title: "Sobre Nosotros",
    url: "#",
  },
  {
    title: "Política de Privacidad",
    url: "#",
  },
  {
    title: "Legal",
    url: "#",
  },
  {
    title: "Contacto",
    url: "#",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="w-full max-w-screen-lg mx-auto p-4 md:py-8">
        <div className="flex items-center justify-center gap-4 sm:justify-between flex-wrap">
          <Link
            href="/"
            color="foreground"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/chambitos-logo.webp"
              width={80}
              height={80}
              className="h-8 w-auto"
              alt="Chambitos Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Chambitos
            </span>
          </Link>
          <ul className="flex flex-wrap items-center gap-4 justify-center sm:justify-normal text-sm font-medium text-gray-500 dark:text-gray-400">
            {FOOTER_LINKS.map(link => (
              <li key={link.title}>
                <Link href={link.url} size="sm" className="hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <Link
            href="https://flowbite.com/"
            className="hover:underline text-gray-500 dark:text-gray-400"
          >
            Chambitos™
          </Link>
          . Todos los izquierdos reservados.
        </span>
      </div>
    </footer>
  );
}
