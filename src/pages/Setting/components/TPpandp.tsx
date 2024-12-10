import React from "react";
import { Link } from "react-router-dom";

const TPpandp = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg text-gray-900 font-sans">
     
     <div className="flex justify-between">

     <h1 className="text-3xl font-bold mb-6 text-zinc-700">
  Latzio Privacy Policy
</h1>

      <p className="text-sm text-gray-500 mb-10">
        Effective Date: <span className="font-semibold">10/12/2025</span>
      </p>
     </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Introduction
        </h2>
        <p className="leading-7">
          Welcome to Latzio! Your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you use
          our social media application.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Information We Collect
        </h2>
        <p className="leading-7 mb-4">We may collect the following types of information:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, profile picture, and other account details you provide.
          </li>
          <li>
            <strong>Usage Information:</strong> Data about your interactions with
            the app, including posts, likes, comments, and connections.
          </li>
          <li>
            <strong>Device Information:</strong> Information about the device you
            use to access Latzio, such as IP address, browser type, and operating
            system.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          How We Use Your Information
        </h2>
        <p className="leading-7 mb-4">We use your information for the following purposes:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>To provide and improve the Latzio app and its features.</li>
          <li>To personalize your experience and show relevant content.</li>
          <li>To communicate with you about updates, promotions, and support.</li>
          <li>To monitor usage patterns and ensure platform security.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Sharing Your Information
        </h2>
        <p className="leading-7 mb-4">
          We do not sell your personal information. However, we may share your
          data with trusted third parties for the following reasons:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>To provide app functionality (e.g., hosting, analytics).</li>
          <li>To comply with legal obligations or protect our rights.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Your Privacy Choices
        </h2>
        <p className="leading-7 mb-4">You have control over your information. You can:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>Update or delete your account information.</li>
          <li>Control privacy settings for posts and profile visibility.</li>
          <li>Opt-out of marketing communications.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Data Security
        </h2>
        <p className="leading-7">
          We implement appropriate technical and organizational measures to
          protect your data. However, no system can be completely secure, so we
          cannot guarantee the absolute security of your information.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Children's Privacy
        </h2>
        <p className="leading-7">
          Latzio is not intended for users under the age of 13. We do not
          knowingly collect personal information from children.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="leading-7">
          We may update this Privacy Policy from time to time. We will notify you
          of significant changes by posting an update within the app or through
          other communication methods.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
          Contact Us
        </h2>
        <p className="leading-7">
          If you have questions or concerns about this Privacy Policy, please
          contact us at{" "}
          <Link to="/settings/help" className="text-blue-600 underline">
            support@latzio.com
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default TPpandp;
