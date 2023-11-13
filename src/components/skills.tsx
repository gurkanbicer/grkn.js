import { Source_Code_Pro } from "next/font/google";
import Image from "next/image";

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export default function Skills() {
  return (
    <>
      <div id="skills">
        <div className="skill-row mt-5">
          <p className={source_code_pro.className}>
            What's inside in this{" "}
            <span className="text-danger">&lt;Head /&gt;</span>
          </p>
        </div>
        <div className="skill-row mt-3">
          <div id="skill-icons">
            <Image src="/php.svg" width={50} height={50} alt="PHP" />
            <Image src="/laravel.svg" width={50} height={30} alt="Laravel" />
            <Image src="/nodejs.svg" width={50} height={50} alt="NodeJS" />
            <Image src="/linux.svg" width={50} height={30} alt="Linux" />
            <Image src="/bash.svg" width={50} height={30} alt="Bash" />
            <Image src="/html5.svg" width={50} height={30} alt="HTML5" />
            <Image src="/css3.svg" width={50} height={30} alt="CSS3" />
            <Image src="/js.svg" width={50} height={30} alt="Javascript" />
            <Image src="/reactjs.svg" width={50} height={30} alt="Linux" />
            <Image src="/scss.svg" width={50} height={30} alt="SCSS" />
            and more . . .
          </div>
        </div>
      </div>
    </>
  );
}
