import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { Faq } from "@/components/sections/contact/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Pitch a game, talk partnerships, ask about careers, or just say hello. We reply to every message.",
};

/** Matches the real form's footprint so the swap doesn't shift the layout. */
function FormSkeleton() {
  return (
    <div className="border-border bg-card space-y-5 rounded-3xl border p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-11 w-44 rounded-full" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={"Tell us what you're\nworking on."}
        description="Pitching a game, exploring a partnership, chasing a role, or writing for press — it all lands in the same inbox, and we read all of it."
      />

      <section className="section-y pt-4">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
            {/*
              The form reads ?topic= from the URL to preselect a subject, which
              requires useSearchParams — hence the Suspense boundary, so the
              rest of the page can still be statically prerendered.
            */}
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>

            <ContactInfo />
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
