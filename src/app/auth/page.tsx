import GoogleAuthButton from "@/features/auth/components/google-auth-button.component";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 md:py-16 mx-auto">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-auto h-10 mr-2"
            src="/chambitos-logo.webp"
            alt="logo"
          />
          Chambitos
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Autenticación
            </h1>
            <p>
              Inicie sesión con su cuenta de Google para acceder a la plataforma
            </p>
            <GoogleAuthButton />
            <small className="block">
              Al autenticarse, acepta los{" "}
              <Link href="#" className="text-primary">
                Términos de servicio
              </Link>{" "}
              y la{" "}
              <Link href="#" className="text-primary">
                Política de privacidad
              </Link>
              .
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
