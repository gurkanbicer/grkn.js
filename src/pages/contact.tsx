import { FormEvent, useState, useEffect } from "react";
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
const pageTitle = "Contact - " + (personName ?? "An another Developer");
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
  const [isFormHasErrors, setFormHasErrors] = useState(0);
  const [formErrors, setFormErrors] = useState({
    inputName: "",
    inputEmail: "",
    inputSubject: "",
    inputMessage: "",
  });
  const [inputMessageLength, setInputMessageLength] = useState(2500);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isFormHasErrors > 0) {
      return;
    }

    setLoading(true);

    fetch("/api/contact", {
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

  const handleTryAgain = () => {
    setAlertMessage("");
    setAlertStatus("");
    setFormVisibility(true);
    setSent(false);
  };

  useEffect(() => {
    let countErrors = 0;

    let newFormErrors = {
      inputName: "",
      inputSubject: "",
      inputEmail: "",
      inputMessage: "",
    };

    if (inputName.length < 3 || inputName.length > 30) {
      newFormErrors.inputName =
        "The name field length should be between 3-30 chars.";
      countErrors++;
    }

    const emailValid = inputEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (!emailValid) {
      newFormErrors.inputEmail = "The email field should be correct format.";
      countErrors++;
    }

    if (inputSubject.length < 3 || inputSubject.length > 100) {
      newFormErrors.inputSubject =
        "The subject field length should be between 3-100 chars.";
      countErrors++;
    }

    if (inputMessage.length < 20 || inputMessage.length > 2500) {
      newFormErrors.inputMessage =
        "The message field length should be between 20-2500 chars.";
      countErrors++;
    }

    if (inputName === "") {
      newFormErrors.inputName = "This field is required";
      countErrors++;
    }

    if (inputSubject === "") {
      newFormErrors.inputSubject = "This field is required";
      countErrors++;
    }

    if (inputEmail === "") {
      newFormErrors.inputEmail = "This field is required";
      countErrors++;
    }

    if (inputMessage === "") {
      newFormErrors.inputMessage = "This field is required";
      countErrors++;
    }

    // for avoid blank form errors but still need to disable send button
    if (
      inputName === "" &&
      inputEmail === "" &&
      inputMessage === "" &&
      inputSubject === ""
    ) {
      newFormErrors = {
        inputName: "",
        inputSubject: "",
        inputEmail: "",
        inputMessage: "",
      };

      countErrors++;
    }

    setFormErrors(newFormErrors);
    setFormHasErrors(countErrors);

  }, [inputName, inputEmail, inputSubject, inputMessage]);

  useEffect(() => {
    let maxChars = 2500;
    let calcRemainChars = maxChars - Number(inputMessage.length);
    setInputMessageLength(calcRemainChars);
  }, [inputMessage]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href={process.env.NEXT_PUBLIC_PERSON_PROFILE_IMAGE} as="image" />
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
                        className={
                          formErrors.inputName.length > 1
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        value={inputName}
                        required
                        onChange={(e) => setInputName(e.target.value)}
                      />
                      {formErrors.inputName.length > 1 ? (
                        <>
                          <span className="text-danger">
                            {formErrors.inputName}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <label className="fw-light mb-2">Email</label>
                      <input
                        type="email"
                        className={
                          formErrors.inputEmail.length > 1
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        value={inputEmail}
                        required
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                      {formErrors.inputEmail.length > 1 ? (
                        <>
                          <span className="text-danger">
                            {formErrors.inputEmail}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <label className="fw-light mb-2">Subject</label>
                      <input
                        type="text"
                        className={
                          formErrors.inputSubject.length > 1
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        value={inputSubject}
                        required
                        onChange={(e) => setInputSubject(e.target.value)}
                      />
                      {formErrors.inputSubject.length > 1 ? (
                        <>
                          <span className="text-danger">
                            {formErrors.inputSubject}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <label className="fw-light mb-2">Message</label>
                      <textarea
                        className={
                          formErrors.inputMessage.length > 1
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        rows={5}
                        required
                        onChange={(e) => setInputMessage(e.target.value)}
                        value={inputMessage}
                      />
                      {formErrors.inputMessage.length > 1 ? (
                        <>
                          <span className="text-danger">
                            {formErrors.inputMessage}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                      <span className="d-block text-muted">
                        {inputMessageLength} characters remain.
                      </span>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isLoading || isFormHasErrors ? true : false}
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

                    {isSent ? (
                      ""
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-warning ms-3"
                          onClick={handleTryAgain}
                        >
                          Try again
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
