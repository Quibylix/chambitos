import SignInForm from "@/features/auth/components/sign-in-form/sign-in-form.component";

export default function SignInPage() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-16 lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-auto h-8 mr-2"
            src="/chambitos-logo.webp"
            alt="logo"
          />
          Chambitos
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión
            </h1>
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
}