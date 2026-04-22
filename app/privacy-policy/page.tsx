import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Tax App",
  description: "Privacy Policy for Tax App",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            ← Back to Tax App
          </Link>
        </div>

        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-500 mb-10">
          Last updated: April 22, 2026
        </p>

        <div className="space-y-10 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              1. Overview
            </h2>
            <p>
              Tax App (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard information when you
              use our service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="font-medium">Account information</span> — name
                and email address when you sign up.
              </li>
              <li>
                <span className="font-medium">Usage data</span> — pages visited,
                features used, and session duration, collected via Google
                Analytics.
              </li>
              <li>
                <span className="font-medium">Content you provide</span> — any
                tax-related queries or documents you submit through the app.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To provide and improve the Tax App service.</li>
              <li>To respond to your questions and support requests.</li>
              <li>
                To understand how the app is used and identify areas for
                improvement.
              </li>
              <li>
                To send important service-related communications (no marketing
                without your consent).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              4. Data Sharing
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share data with trusted service providers (e.g., hosting,
              analytics) solely to operate and improve the service, under strict
              confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              5. Data Retention
            </h2>
            <p>
              We retain your information for as long as your account is active
              or as needed to provide the service. You may request deletion of
              your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              6. Security
            </h2>
            <p>
              We use industry-standard security measures to protect your data.
              However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              7. Your Rights
            </h2>
            <p>
              Depending on your location, you may have the right to access,
              correct, or delete your personal data. To exercise any of these
              rights, please contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the new policy on this
              page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@taxapp.com"
                className="text-neutral-900 underline underline-offset-2 hover:text-neutral-600 transition-colors"
              >
                hector@taxapp.dev
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
