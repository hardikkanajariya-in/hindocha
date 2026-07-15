import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { SectionHeader } from "@/components/public/section-header";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vinod Season Shop. Call, WhatsApp, or visit us for artificial flowers, wedding decorations, and festive items.",
  alternates: { canonical: "/contact" },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 94275 73299",
    href: "tel:+919427573299",
    color: "text-primary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 94272 40241",
    href: "https://wa.me/919427240241?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products.",
    color: "text-[#25D366]",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@vinod_season_shop12",
    href: "https://www.instagram.com/vinod_season_shop12/",
    color: "text-pink-500",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Gujarat, India",
    href: undefined,
    color: "text-primary",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <SectionHeader
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out anytime!"
      />

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted`}>
                  <info.icon className={`h-6 w-6 ${info.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`mt-1 block text-sm transition-colors hover:${info.color} text-muted-foreground`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{info.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Business Hours</h3>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between rounded-lg bg-muted px-4 py-2">
              <span>Monday - Saturday</span>
              <span className="font-medium">9:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between rounded-lg bg-muted px-4 py-2">
              <span>Sunday</span>
              <span className="font-medium">10:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-8 rounded-2xl bg-[#25D366]/10 p-8 text-center">
          <MessageCircle className="mx-auto mb-3 h-10 w-10 text-[#25D366]" />
          <h3 className="text-xl font-bold">Fastest Way to Reach Us</h3>
          <p className="mt-2 text-muted-foreground">
            Send us a WhatsApp message and get a response within minutes.
          </p>
          <a
            href="https://wa.me/919427240241?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
