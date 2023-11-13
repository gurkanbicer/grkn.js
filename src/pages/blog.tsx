import Head from "next/head";

import { Montserrat, Source_Code_Pro } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { faDev } from "@fortawesome/free-brands-svg-icons";
import Social from "@/components/social";
import Navigation from "@/components/navigation";
import Post from "@/components/post";

import Link from "next/link";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

const pageTitle = "Blog - " + process.env.NEXT_PUBLIC_PERSON_NAME;
const pageDescription = "Latest dev blog posts of " + process.env.NEXT_PUBLIC_PERSON_NAME;

export const getServerSideProps = async (ctx) => {
  const apiUrl = "https://dev.to/api/articles?username=" + process.env.DEVTO_API;
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
        <div id="posts">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mt-5">
                <h2 className={source_code_pro.className}>
                  Recent <span className="text-danger">&lt;Dev /&gt;</span>{" "} Posts
                </h2>
              </div>
              {posts.map(function (post) {
                return (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <Post
                        url={post.canonical_url}
                        title={post.title}
                        description={post.description}
                        publishDate={post.readable_publish_date}
                        readingTimeMin={post.reading_time_minutes}
                        tags={post.tag_list}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
