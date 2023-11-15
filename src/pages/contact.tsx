import Head from "next/head";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import Navigation from "@/components/navigation";
import Social from "@/components/social";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Bio from "@/components/bio";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

const personName = process.env.NEXT_PUBLIC_PERSON_NAME;
const pageTitle = personName ?? "An another Developer";
const pageDescription = "Contact with " + personName;

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit } = useForm<ContactFormData>();
  const [formHidden, setFormHidden] = useState("no");
  const [alertStatus, setAlertStatus] = useState("primary");
  const [alertMessage, setAlertMessage] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  function sendEmail(data: ContactFormData) {
    const apiEndpoint = "/api/send-email";

    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setFormHidden("yes");
          setAlertStatus(response.statusText);
          setAlertMessage(response.message);
        } else {
          setFormHidden("no");
          setAlertStatus(response.statusText);
          setAlertMessage(response.message);
        }
      })
      .catch((err) => {});
  }

  function clearForm() {
    setFormHidden("no");
    setAlertStatus("primary");
    setAlertMessage("");
    setInputName("");
    setInputEmail("");
    setInputSubject("");
    setInputMessage("");
  }

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
        <section id="contact" className={source_code_pro.className}>
          <div className="container">
            <Bio />
            <div
              className={
                formHidden == "yes"
                  ? "mt-3 d-block alert alert-" + alertStatus
                  : "mt-3 d-none"
              }
              role="alert"
            >
              <p>{alertMessage}</p>
              <button
                className={
                  formHidden == "yes" ? "d-block btn btn-success" : "d-none"
                }
                onClick={clearForm}
              >
                I need send another email
              </button>
            </div>

            <form
              onSubmit={handleSubmit(sendEmail)}
              id="contactForm"
              className={formHidden == "yes" ? "d-none" : "d-block mt-3"}
            >
              <div className="row mb-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h2 className={source_code_pro.className}>
                    Say <span className="text-danger">hello.</span>
                  </h2>
                  <hr className="border border-danger border-2" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className={source_code_pro.className + " mb-1"}>
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className={source_code_pro.className + " mb-1"}>
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className={source_code_pro.className + " mb-1"}>
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputSubject}
                      onChange={(e) => setInputSubject(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                  <div className="form-group">
                    <label className={source_code_pro.className + " mb-1"}>
                      Your message
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      onChange={(e) => setInputMessage(e.target.innerHTML)} 
                    >
                      {inputMessage}
                    </textarea>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                  <button className="btn btn-primary">
                    Send{" "}
                    <FontAwesomeIcon
                      icon={faArrowCircleRight}
                      style={{ marginLeft: 5 }}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
