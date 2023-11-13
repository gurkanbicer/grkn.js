import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";
import { ReactElement } from "react";

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export default function Bio(props: {name: string, profession: string }) {
  return (
    <>
      <div id="bio">
        <div>
          <Image
            src="/who.webp"
            width={150}
            height={150}
            className="img-thumbnail rounded-circle shadow-lg"
            alt={props.name}
          />
          <div>
            <h1>{props.name}</h1>
            <p className={source_code_pro.className}>
              {props.profession}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
