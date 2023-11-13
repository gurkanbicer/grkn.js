import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { faDev } from "@fortawesome/free-brands-svg-icons";

function Tags({ tags }: { tags: string[] }) {
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

export default function Post(props: {
  url: string | undefined;
  description: string | undefined;
  title: string | undefined;
  publishDate: string | undefined;
  readingTimeMin: string | undefined;
  tags: string[];
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
            <Tags tags={props.tags} />
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
