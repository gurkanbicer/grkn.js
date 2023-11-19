import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDev,
  faDiscord,
  faInstagram,
  faLinkedin,
  faMedium,
  faSkype,
  faSpotify,
  faTelegram,
  faTwitch,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGit } from "@fortawesome/free-brands-svg-icons/faGit";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function SocialItem({
  icon,
  link,
}: {
  icon: IconProp;
  link: string | undefined;
}) {
  if (link !== undefined && link != "") {
    return (
      <>
        <li>
          <a href={link}>
            <FontAwesomeIcon icon={icon} />
          </a>
        </li>
      </>
    );
  }
}

export default function Social() {
  return (
    <>
      <ul id="navSocial">
        <SocialItem icon={faDev} link={process.env.NEXT_PUBLIC_SOCIAL_DEVTO} />
        <SocialItem icon={faGit} link={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} />
        <SocialItem
          icon={faLinkedin}
          link={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN}
        />
        <SocialItem
          icon={faInstagram}
          link={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM}
        />
        <SocialItem
          icon={faSpotify}
          link={process.env.NEXT_PUBLIC_SOCIAL_SPOTIFY}
        />
        <SocialItem
          icon={faMedium}
          link={process.env.NEXT_PUBLIC_SOCIAL_MEDIUM}
        />
        <SocialItem
          icon={faWhatsapp}
          link={process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP}
        />
        <SocialItem
          icon={faDiscord}
          link={process.env.NEXT_PUBLIC_SOCIAL_DISCORD}
        />
        <SocialItem
          icon={faTelegram}
          link={process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM}
        />
        <SocialItem
          icon={faSkype}
          link={process.env.NEXT_PUBLIC_SOCIAL_SKYPE}
        />
        <SocialItem
          icon={faTwitter}
          link={process.env.NEXT_PUBLIC_SOCIAL_TWITTER}
        />
        <SocialItem
          icon={faTwitch}
          link={process.env.NEXT_PUBLIC_SOCIAL_TWITCH}
        />
        <SocialItem
          icon={faEnvelope}
          link={
            process.env.NEXT_PUBLIC_PERSON_EMAIL
              ? "mailto:" + process.env.NEXT_PUBLIC_PERSON_EMAIL
              : undefined
          }
        />
      </ul>
    </>
  );
}
