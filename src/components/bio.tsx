import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

function BioImageItem({
  image,
  name,
}: {
  image: string | undefined;
  name: string | undefined;
}) {
  if (image !== undefined && image != "" && name !== undefined && name != "") {
    return (
      <>
        <Image
          src={image}
          width={150}
          height={150}
          className="img-thumbnail rounded-circle shadow-lg"
          alt={name}
        />
      </>
    );
  }
}

function BioNameItem({ name }: { name: string | undefined }) {
  if (name !== undefined && name !== "") {
    return (
      <>
        <h1>{name}</h1>
      </>
    );
  }
}

function BioProfessionItem({ profession }: { profession: string | undefined }) {
  if (profession !== undefined && profession != "") {
    const professionSplit = profession.split(" ");

    if (professionSplit.length === 3) {
      return (
        <>
          <p className={source_code_pro.className}>
            {professionSplit[0]}{" "}
            <span className="fst-italic">{professionSplit[1]}</span>{" "}
            {professionSplit[2]}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className={source_code_pro.className}>{profession}</p>
        </>
      );
    }
  }
}

export default function Bio() {
  return (
    <>
      <div id="bio">
        <div>
          <BioImageItem
            image={process.env.NEXT_PUBLIC_PERSON_PROFILE_IMAGE}
            name={process.env.NEXT_PUBLIC_PERSON_NAME}
          />
          <div>
            <BioNameItem name={process.env.NEXT_PUBLIC_PERSON_NAME} />
            <BioProfessionItem
              profession={process.env.NEXT_PUBLIC_PERSON_PROFESSION_VISUAL}
            />
          </div>
        </div>
      </div>
    </>
  );
}
