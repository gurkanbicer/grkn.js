import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDev,
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function SocialLinks(props: {
  devTo: string;
  medium: string;
  github: string;
  linkedin: string;
  discord: string;
  spotify: string;
  instagram: string;
  email: string;
}) {
  return (
    <>
      <div>
        <a href={props.devTo ?? "#"}>
          <FontAwesomeIcon icon={faDev} />
        </a>
      </div>
      <div>
        <a href={props.medium ?? "#"}>
          <FontAwesomeIcon icon={faMedium} />
        </a>
      </div>
      <div>
        <a href={props.github ?? "#"}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div>
        <a href={props.linkedin ?? "#"}>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div>
        <a href={props.discord ?? "#"}>
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </div>
      <div>
        <a href={props.spotify ?? "#"}>
          <FontAwesomeIcon icon={faSpotify} />
        </a>
      </div>
      <div>
        <a href={props.instagram ?? "#"}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <div>
        <a href={props.email ?? "#"}>
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </>
  );
}
