import Features from "@/features/ui/components/features.component";
import Footer from "@/features/ui/components/footer.component";
import Hero from "@/features/ui/components/hero.component";
import Reviews from "@/features/ui/components/reviews.component";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
