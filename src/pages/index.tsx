import Head from "next/head";
import Navigation from "@/components/navigation";
import Social from "@/components/social";
import Bio from "@/components/bio";
import Skills from "@/components/skills";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

function calcAge(birthday: string | Date | number) {
  let today = new Date();
  let birthDate = new Date(birthday);
  let age_now = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
}

const age = calcAge(process.env.NEXT_PUBLIC_PERSON_BIRTHDAY ?? "");

const personName = process.env.NEXT_PUBLIC_PERSON_NAME;
const profession = process.env.NEXT_PUBLIC_PERSON_PROFESSION;
const location = process.env.NEXT_PUBLIC_PERSON_LOCATION;

const pageTitle = personName ?? "An another Developer";
const pageDescription =
  profession + " based in " + location + ". Level " + age + " - Hooman.";

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
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Navigation />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
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
