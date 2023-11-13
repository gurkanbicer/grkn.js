import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Source_Code_Pro } from "next/font/google";

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export default function Job(props: {jobTitle: string, companyName: string, companyLink: string }) {
  return (
    <>
      <p className={source_code_pro.className}>
        <FontAwesomeIcon icon={faLaptopCode} />
        Currently {props.jobTitle ?? "Human"} at{" "}
        <a href={props.companyLink ?? "#"} title={props.companyName ?? "World"}>
          {props.companyName ?? "World"}
        </a>
      </p>
    </>
  );
}
