import Head from "next/head";
import { Montserrat } from "next/font/google";
import Bio from "@/components/bio";
import Social from "@/components/social";
import Skills from "@/components/skills";
import Navigation from "@/components/navigation";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const ageCalc = (birthday: string | Date | number) => {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

const age = ageCalc(process.env.NEXT_PUBLIC_PERSON_BIRTHDAY ?? "");

// SEO
const pageTitle = process.env.NEXT_PUBLIC_PERSON_NAME ?? "An another Developer";
const pageDescription =
  process.env.NEXT_PUBLIC_PERSON_PROFESSION +
  " based in " +
  process.env.NEXT_PUBLIC_PERSON_LOCATION +
  ". Level " +
  age +
  " - Hooman.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={montserrat.className}>
        <nav id="nav">
          <div id="navLeft">
            <div id="navLeftContainer">
              <Navigation />
            </div>
          </div>
          <div id="navRight">
            <div id="navRightContainer">
              <Social />
            </div>
          </div>
        </nav>
        <section id="home">
          <div className="container">
            <Bio />
            <Skills />
          </div>
        </section>
      </main>
    </>
  );
}
