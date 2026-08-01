import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { faqs } from "@/content/services";

export function Faq() {
  return (
    <section className="section-y bg-surface-muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Before you write"
          title={"Questions we get a lot"}
          align="center"
        />

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-12 w-full max-w-3xl"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border-border bg-card mb-3 rounded-2xl border px-5 last:mb-0"
              >
                <AccordionTrigger className="font-display text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
