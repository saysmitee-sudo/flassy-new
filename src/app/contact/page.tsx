import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faqItems } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} to start a visual AI content project.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="container-site pb-16 pt-12 text-center md:pb-20 md:pt-20 md:text-left">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollReveal>
              <h1 className="text-[48px] font-medium leading-none tracking-tight md:text-[84px]">
                Contact
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-foreground-muted md:mx-0 md:text-[20px]">
                Tell us about your next campaign, content system, or social launch. We reply with a
                clear production plan.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="mt-8 text-[16px] md:text-[18px]">
                Or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline underline-offset-4 hover:opacity-70"
                >
                  {site.email}
                </a>
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      <section className="container-site pb-20 text-center md:pb-28 md:text-left">
        <ScrollReveal>
          <h2 className="mb-10 text-[32px] font-medium md:mb-14 md:text-[48px]">FAQ</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <FaqList items={faqItems} />
        </ScrollReveal>
      </section>
    </>
  );
}
