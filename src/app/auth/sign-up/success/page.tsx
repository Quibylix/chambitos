import mailSent from "@/assets/mail-sent.png";

export default function SignUpSuccess() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 mt-8">
      <h1 className="text-3xl font-bold text-center">
        ¡Gracias por registrarte!
      </h1>
      {/* Decorative image */}
      <img src={mailSent.src} alt="Correo enviado" className="w-auto h-64" />
      <p className="text-center">
        Revisa tu correo electrónico para confirmar tu cuenta.
      </p>
    </div>
  );
}
