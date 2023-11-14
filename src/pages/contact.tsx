import Head from "next/head";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import Navigation from "@/components/navigation";
import Social from "@/components/social";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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

export function ContactSendEmail(data: ContactFormData) {
  const apiEndpoint = "/api/send-email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      
    })
    .catch((err) => {
      
    });
}

export default function Contact() {
  const { register, handleSubmit } = useForm<ContactFormData>();

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
            <form onSubmit={handleSubmit(ContactSendEmail)}>
              <div className="row mb-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h1 className={source_code_pro.className}>Say <span className="text-danger">hello.</span></h1>
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
                      {...register("name", { required: true })}
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
                      {...register("email", { required: true })}
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
                      {...register("subject", { required: true })}
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
                      {...register("message", { required: true })}
                    ></textarea>
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
