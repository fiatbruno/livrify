import UploadForm from "@/components/UploadForm";
import React from "react";

const page = () => {
  return (
    <main className="wrapper container">
      <div className="mx-auto max-w-180 space-y-10">
        <section className="flex flex-col gap-5">
          <h1 className="page-title-xl">Add a New Book </h1>
          <p className="subtitle">
            Upload your pdf to generate your interactive AI conversation
          </p>
        </section>
        <UploadForm />
      </div>
    </main>
  );
};

export default page;
