import Head from "next/head";
import { Montserrat } from "next/font/google";
import Bio from "@/components/bio";
import Job from "@/components/job";
import SocialLinks from "@/components/social-links";
import Skills from "@/components/skills";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const ageCalc = (birthday: string | Date | number ) => {
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
const pageTitle = process.env.NEXT_PUBLIC_PERSON_NAME;
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
              <Job
                jobTitle={process.env.NEXT_PUBLIC_PERSON_JOB_TITLE ?? "Human"}
                companyName={process.env.NEXT_PUBLIC_PERSON_COMPANY ?? "World"}
                companyLink={process.env.NEXT_PUBLIC_PERSON_COMPANY_WEBSITE ?? "#"}
              />
            </div>
          </div>
          <div id="navRight">
            <div id="navRightContainer">
              <SocialLinks
                devTo={process.env.NEXT_PUBLIC_SOCIAL_DEVTO ?? "#"}
                medium={process.env.NEXT_PUBLIC_SOCIAL_MEDIUM ?? "#"}
                github={process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "#"}
                linkedin={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "#"}
                discord={process.env.NEXT_PUBLIC_SOCIAL_DISCORD ?? "#"}
                spotify={process.env.NEXT_PUBLIC_SOCIAL_SPOTIFY ?? "#"}
                instagram={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#"}
                email={"mailto:" + process.env.NEXT_PUBLIC_PERSON_EMAIL ?? "#"}
              />
            </div>
          </div>
        </nav>
        <section id="home">
          <div className="container">
            <Bio
              name={process.env.NEXT_PUBLIC_PERSON_NAME ?? "John Doe"}
              profession={process.env.NEXT_PUBLIC_PERSON_PROFESSION_VISUAL ?? "Human"}
            />
            <Skills />
          </div>
        </section>
      </main>
    </>
  );
}
