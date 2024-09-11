import React from "react";
import Layout from "../component/Layout";

const About = () => {
  return (
  <Layout>

<div className="min-h-screen flex flex-col items-center pt-[90px] justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in-down">
          Welcome to Belal-Shop
        </h1>
        <p className="text-lg sm:text-xl mb-8 leading-relaxed animate-fade-in-up">
          At Belal-Shop, we believe that shopping should be an experience, not a
          task. Our platform is designed with one goal in mind: to provide you
          with the best online shopping experience imaginable. Whether you're
          browsing for the latest fashion trends, the newest tech gadgets, or
          unique home decor, we have something for everyone.
        </p>

        <p className="text-lg sm:text-xl mb-8 leading-relaxed animate-fade-in-up delay-100">
          Our team is passionate about curating a diverse collection of
          high-quality products that cater to all tastes and preferences. We
          work tirelessly to ensure that every item listed on our platform meets
          the highest standards of quality, style, and functionality. We
          partner with trusted brands and artisans from around the world to
          bring you the best of the best.
        </p>

        <p className="text-lg sm:text-xl mb-8 leading-relaxed animate-fade-in-up delay-200">
          But we don't stop at just offering great products. Customer
          satisfaction is at the heart of everything we do. From our
          user-friendly interface to our dedicated customer support team, we're
          here to make sure that your shopping journey is seamless, enjoyable,
          and rewarding. We're constantly innovating and improving to meet your
          needs and exceed your expectations.
        </p>

        <p className="text-lg sm:text-xl mb-8 leading-relaxed animate-fade-in-up delay-300">
          Join our community of shoppers who trust Belal-Shop for their online
          purchases. We invite you to explore our collections, take advantage of
          our exclusive deals, and enjoy the convenience of shopping from the
          comfort of your home. Thank you for choosing Belal-Shop, where
          quality meets convenience, and where your satisfaction is our top
          priority.
        </p>

        <p className="text-lg sm:text-xl leading-relaxed animate-fade-in-up delay-400">
          We’re more than just a shop; we’re your partner in discovering the
          products you love. Welcome to the future of e-commerce. Welcome to
          Belal-Shop.
        </p>
      </div>
    </div>
  </Layout>
  );
};

export default About;
