import Head from "next/head";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { faDev } from "@fortawesome/free-brands-svg-icons";
import Navigation from "@/components/navigation";
import Social from "@/components/social";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

const personName = process.env.NEXT_PUBLIC_PERSON_NAME;
const pageTitle = "Blog - " + personName;
const pageDescription = "Latest dev blog posts of " + personName;

export const getServerSideProps = async () => {
  const devToResponse = await fetch(
    "https://dev.to/api/articles?username=" + process.env.DEVTO_API
  );

  const devPosts = await devToResponse.json();

  return {
    props: { devPosts },
  };
};

function DevBlogPosts({ devPosts }: { devPosts: any }) {
  return (
    <div className="row">
      {devPosts.length > 0 ? (
        <>
          {devPosts.map(
            (
              post: {
                canonical_url: string;
                title: string;
                description: string;
                readable_publish_date: string;
                reading_time_minutes: string;
                tag_list: string[];
              },
              index: string
            ) => (
              <div className="col-lg-4 col-md-6 col-sm-12" id={"post-" + index}>
                <BlogPost
                  url={post.canonical_url}
                  title={post.title}
                  description={post.description}
                  publishDate={post.readable_publish_date}
                  readingTimeMin={post.reading_time_minutes}
                  tags={post.tag_list}
                />
              </div>
            )
          )}
        </>
      ) : (
        <div className="col-lg-12 mt-3">
          <p className="fst-italic">
            There isn't any post right now that i can show you, sorry :|
          </p>
        </div>
      )}
    </div>
  );
}

function BlogPost(props: {
  url: string;
  title: string;
  description: string;
  tags: string[];
  publishDate: string;
  readingTimeMin: string;
}) {
  return (
    <>
      <a className="card" href={props.url}>
        <div className="card-title">
          <h3>{props.title}</h3>
          <span className="post-blog">
            <FontAwesomeIcon icon={faDev} />
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="mb-auto">{props.description}</div>
          <div className="mt-3 post-tags">
            <BlogPostTags tags={props.tags} />
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex">
            <div className="flex-grow-1">
              <FontAwesomeIcon icon={faCalendar} /> {props.publishDate}
            </div>
            <div className="flex-grow-1 text-end">
              <FontAwesomeIcon icon={faClock} /> {props.readingTimeMin} min
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

function BlogPostTags({ tags }: { tags: string[] }) {
  if (tags.length > 0) {
    return (
      <>
        <div className="mt-3 post-tags">
          <FontAwesomeIcon icon={faTag} />{" "}
          {tags.map(function (tag: string) {
            return (
              <>
                <span>{tag}</span>{" "}
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default function Blog({ devPosts }: { devPosts: any }) {
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
                  Recent <span className="text-danger">&lt;Dev /&gt;</span>{" "}
                  Posts
                </h2>
              </div>
              <DevBlogPosts devPosts={devPosts} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
