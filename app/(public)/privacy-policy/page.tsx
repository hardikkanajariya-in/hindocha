import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Vinod Season Shop website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>Last updated: July 2026</p>

        <h2>Information We Collect</h2>
        <p>
          Vinod Season Shop (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates a product catalogue website.
          We do not collect personal information through this website. When you contact us via
          WhatsApp, phone, or Instagram, any information you provide is used solely for the
          purpose of responding to your inquiry.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Any information shared during communication (such as your name or phone number)
          is used only to assist you with product inquiries, provide quotes, and process
          orders. We do not sell, trade, or share your personal information with third parties.
        </p>

        <h2>Cookies</h2>
        <p>
          This website may use essential cookies to ensure proper functionality. We do not
          use tracking or advertising cookies.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Product images are hosted on Cloudinary. The website uses standard web technologies
          that may involve third-party content delivery networks. These services have their
          own privacy policies.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not directed at children under 13 years of age. We do not knowingly
          collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on
          this page with an updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:
        </p>
        <ul>
          <li>Phone: +91 94275 73299</li>
          <li>WhatsApp: +91 94272 40241</li>
        </ul>
      </div>
    </div>
  );
}
