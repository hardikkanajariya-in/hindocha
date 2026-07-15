import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Vinod Season Shop.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <h1 className="mb-8 text-3xl font-bold">Terms &amp; Conditions</h1>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>Last updated: July 2026</p>

        <h2>About This Website</h2>
        <p>
          This website serves as a product catalogue for Vinod Season Shop. It is not an
          e-commerce platform. Products displayed are for browsing and inquiry purposes only.
          Purchases are made through direct communication with our team via WhatsApp or phone.
        </p>

        <h2>Product Information</h2>
        <p>
          We make every effort to display accurate product information including images,
          descriptions, and pricing. However, colors may vary slightly from actual products
          due to screen display differences. Prices listed are approximate and subject to
          change without notice.
        </p>

        <h2>Pricing</h2>
        <p>
          All prices are listed in Indian Rupees (INR) and may be subject to change.
          Final pricing will be confirmed during direct communication. Bulk order pricing
          may differ from displayed prices.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website including images, text, logos, and design elements
          are the property of Vinod Season Shop and may not be reproduced without permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Vinod Season Shop shall not be liable for any indirect, incidental, or consequential
          damages arising from the use of this website or the purchase of products.
        </p>

        <h2>Contact</h2>
        <p>
          For any questions regarding these terms, please contact us:
        </p>
        <ul>
          <li>Phone: +91 94275 73299</li>
          <li>WhatsApp: +91 94272 40241</li>
        </ul>
      </div>
    </div>
  );
}
