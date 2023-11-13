import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Source_Code_Pro } from "next/font/google";

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

function JobItem({
  jobTitle,
  companyName,
  companyLink,
}: {
  jobTitle: string | undefined;
  companyName: string | undefined;
  companyLink: string | undefined;
}) {
  if (
    jobTitle !== undefined &&
    jobTitle != "" &&
    companyName !== undefined &&
    companyName != "" &&
    companyLink !== undefined &&
    companyLink != ""
  ) {
    return (
      <>
        <div id="job">
          <p className={source_code_pro.className}>
            <FontAwesomeIcon icon={faLaptopCode} />
            Currently {jobTitle} at{" "}
            <a href={companyLink} title={companyName}>
              {companyName}
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default function Job() {
  return (
    <>
      <JobItem
        jobTitle={process.env.NEXT_PUBLIC_PERSON_JOB_TITLE}
        companyName={process.env.NEXT_PUBLIC_PERSON_COMPANY}
        companyLink={process.env.NEXT_PUBLIC_PERSON_COMPANY_WEBSITE}
      />
    </>
  );
}
