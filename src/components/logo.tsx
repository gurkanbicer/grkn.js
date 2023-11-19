import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  const img = process.env.NEXT_PUBLIC_PERSON_PROFILE_IMAGE ?? null;
  const alt = process.env.NEXT_PUBLIC_PERSON_NAME ?? "";

  return img !== undefined && img != null ? (
    <>
      <div id="navImage">
        <Link href="/">
          <Image
            src={img}
            width={96}
            height={96}
            alt={alt}
            className="img-thumbnail rounded-circle shadow-lg"
          />
        </Link>
      </div>
    </>
  ) : (
    ""
  );
}
