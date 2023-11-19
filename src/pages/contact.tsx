import { FormEvent, useState } from "react";
import Head from "next/head";
import Navigation from "@/components/navigation";
import Social from "@/components/social";
import Logo from "@/components/logo";
import { Montserrat, Source_Code_Pro } from "next/font/google";

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

export default function Contact() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);
  const [formVisible, setFormVisibility] = useState(true);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: inputName,
        email: inputEmail,
        subject: inputSubject,
        message: inputMessage,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          setAlertStatus("alert-success");
          setAlertMessage(response.message);
          setFormVisibility(false);
          setSent(true);
        } else {
          setAlertStatus("alert-warning");
          setAlertMessage(response.message);
          setFormVisibility(false);
          setSent(false);
        }

        setLoading(false);
      });
  };

  const handleReset = () => {
    setInputName("");
    setInputEmail("");
    setInputSubject("");
    setInputMessage("");
    setAlertMessage("");
    setAlertStatus("");
    setFormVisibility(true);
    setSent(false);
  };

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
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Navigation />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Logo />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Social />
            </div>
          </div>
        </nav>
        <section id="contact" className={source_code_pro.className}>
          <div className="container">
            <form id="contactForm" onSubmit={(e) => handleSubmit(e)}>
              <div className="row">
                <div className="col-lg-12">
                  <h1 className={source_code_pro.className}>
                    {isSent && !formVisible ? (
                      <>
                        Hi, <span className="text-success">{inputName}!</span>
                      </>
                    ) : (
                      <>
                        say <span className="text-danger">hello.</span>
                      </>
                    )}
                  </h1>
                </div>
              </div>
              <div
                className={formVisible ? "d-block row mt-4" : "d-none row mt-4"}
              >
                <div className="col-lg-12">
                  <div className="row mt-3">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <label className="fw-light mb-2">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={inputName}
                        required
                        onChange={(e) => setInputName(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <label className="fw-light mb-2">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={inputEmail}
                        required
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <label className="fw-light mb-2">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={inputSubject}
                        required
                        onChange={(e) => setInputSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <label className="fw-light mb-2">Message</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        required
                        onChange={(e) => setInputMessage(e.target.value)}
                        value={inputMessage}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={formVisible ? "d-none row mt-3" : "d-block row mt-3"}
              >
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className={"alert text-center " + alertStatus}>
                    {alertMessage}
                  </div>
                  {isSent ? (
                    ""
                  ) : (
                    <>
                      <button className="btn btn-primary"></button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
