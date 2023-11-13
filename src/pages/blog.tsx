import Head from "next/head";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const pageTitle = "Blog - " + process.env.NEXT_PUBLIC_PERSON_NAME;
const pageDescription =
  "Latest dev blog posts of " + process.env.NEXT_PUBLIC_PERSON_NAME;

export const getServerSideProps = async (ctx) => {
  const apiUrl =
    "https://dev.to/api/articles?username=" + process.env.DEVTO_API;
  const response = await fetch(apiUrl);
  const posts = await response.json();

  return {
    props: { posts },
  };
};

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={montserrat.className}>
        <div id="posts">
          <div className="container">
            {posts.map(function (post) {
              return (
                <>
                  <div className="card">
                    <div className="card-title">{post.title}</div>
                    <div className="card-body">
                      <p>{post.description}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
