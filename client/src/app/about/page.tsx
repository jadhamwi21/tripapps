import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import About from "@/modules/About/About";

const page = async () => {
  return (
    <PageWrapper>
      <About
        content={
          "Welcome to our website! We are a team of individuals passionate about technology and its impact on our daily lives. Our mission is to provide you with the most accurate and up-to-date information on the latest apps and software available on your location.\n" +
          "\n" +
          "Our team consists of experts in various fields, including software development, marketing, and content creation. Each of us brings a unique set of skills and experience to the table, allowing us to work collaboratively to deliver top-notch content and services to our users.\n" +
          "\n" +
          "Our goal is to help you make informed decisions when it comes to choosing the best apps for your needs. We understand that the world of technology can be overwhelming, which is why we strive to provide you with clear and concise information that you can rely on.\n" +
          "\n" +
          "We are committed to providing you with a user-friendly experience on our website, and we welcome any feedback or suggestions you may have. Our team is dedicated to continuously improving our platform to ensure that you have access to the most comprehensive information available.\n" +
          "\n" +
          "Thank you for choosing our website, and we look forward to helping you discover the latest and greatest apps!"
        }
      />
    </PageWrapper>
  );
};

export default page;
