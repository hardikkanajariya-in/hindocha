import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { SectionHeader } from "@/components/public/section-header";
import { Sparkles, Heart, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vinod Season Shop — your trusted partner for artificial flowers, wedding decorations, and festive items in Gujarat, India.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Sparkles,
    title: "Quality Products",
    description: "We source only the finest artificial flowers and decorations that look and feel premium.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every customer is treated like family. Your satisfaction is our top priority.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Our experienced team helps you choose the perfect decorations for any occasion.",
  },
  {
    icon: Award,
    title: "Trusted Name",
    description: "Years of serving the community with integrity and dedication to excellence.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <SectionHeader
        title="About Vinod Season Shop"
        subtitle="Bringing celebrations to life since years"
      />

      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Vinod Season Shop is a premier destination for artificial flowers, wedding decorations,
          pooja items, seasonal decorations, decorative fabrics, garlands, torans, and festival
          decoration products. Based in Gujarat, India, we have been serving customers with
          dedication and passion for celebrations.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Our mission is simple — to help you make every occasion special. Whether it&apos;s a grand
          wedding, a festive Diwali celebration, a daily pooja setup, or a seasonal decoration
          refresh, we have the perfect products to transform any space.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          We take pride in our extensive collection, competitive pricing, and the personal touch
          we bring to every interaction. From individual customers to event planners and temples,
          we serve a diverse clientele who trust us for quality and reliability.
        </p>
      </div>

      <section className="mt-16">
        <SectionHeader
          title="Our Values"
          subtitle="What drives us every day"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
