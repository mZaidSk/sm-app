import React from "react";
import { Link } from "react-router-dom";

const TPtandc = () => {
    return (
        <div className="terms-and-conditions-container max-w-4xl min-h-screen mx-auto p-6 bg-gray-50 shadow-lg rounded-lg overflow-y-auto pb-32">
                 <h1 className="text-3xl font-bold mb-6 text-left text-zinc-700">
                 Terms and Conditions
</h1>

            <section className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                    Welcome to <strong className="text-blue-600">Latzio</strong>! By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Definitions</h2>
                <p className="text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">"Platform"</strong>: Refers to the Latzio website or mobile application. <br />
                    <strong className="text-blue-600">"User"</strong>: Refers to anyone using the platform. <br />
                    <strong className="text-blue-600">"Content"</strong>: Refers to posts, comments, photos, and other materials shared by users.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                    <li>Provide accurate and up-to-date information during registration.</li>
                    <li>Refrain from posting illegal, harmful, or offensive content.</li>
                    <li>Avoid engaging in spamming, phishing, or other malicious activities.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                    Your use of the platform is governed by our Privacy Policy, which outlines how your data is collected, used, and protected. Please review our Privacy Policy for more details.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                    Latzio owns all rights to its design, logo, and software. Users retain ownership of the content they create but grant Latzio a license to display and share it on the platform.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Limitations of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                    Latzio is not liable for any damages resulting from the use or inability to use the platform, including user-generated content.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                    Latzio reserves the right to terminate or suspend accounts that violate these terms. Users may deactivate their accounts at any time via the settings menu.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                    Latzio may update these Terms and Conditions at any time. Users are encouraged to review this page periodically for changes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                    If you have any questions or concerns about these Terms and Conditions, please contact us at{" "}
                    <Link to="/settings/help" className="text-blue-600 underline">
                        support@latzio.com
                    </Link>.
                </p>
            </section>
        </div>
    );
};

export default TPtandc;
