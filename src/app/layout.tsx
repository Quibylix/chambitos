import Footer from "@/features/ui/components/footer.component";
import NextUIProvider from "@/features/ui/components/next-ui-provider.component";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chambitos | El lugar donde los chambistas se encuentran",
  description:
    "Chambitos es una plataforma para encontrar y ofrecer servicios de todo tipo. Desde un plomero hasta un programador, Chambitos es el lugar donde puedes encontrar a la persona que necesitas para tu proyecto. Registrate para ofrecer tus servicios o para hacer una solicitud",
  icons: [
    {
      rel: "icon",
      url: "/chambitos-logo.webp",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${roboto.className} min-h-screen bg-background text-foreground`}
      >
        <NextUIProvider>
          <main>{children}</main>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
