"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  contactDefaults,
  contactSchema,
  inquiryTopics,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 *  SUBMIT HANDLER IS A STUB — NOTHING IS SENT ANYWHERE.
 * ----------------------------------------------------------------------------
 *  Validation, loading state, success and error handling are all real; only
 *  the transport is missing. To wire this up for real, replace the body of
 *  `submitEnquiry` with a call to a Next.js Server Action (or a POST to an API
 *  route) and re-validate `contactSchema` on the server before sending mail.
 *  Everything else on this page can stay exactly as it is.
 * ============================================================================
 */
async function submitEnquiry(values: ContactFormValues): Promise<void> {
  // Stand-in for network latency so the loading state is exercised.
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("[contact form] captured but not sent:", values);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const formId = useId();

  // Links across the site deep-link a subject in, e.g. /contact?topic=careers.
  // Seeding defaultValues (rather than writing it from an effect on mount)
  // means the Select is correctly populated on its very first render.
  const topicParam = searchParams.get("topic");
  const initialTopic = inquiryTopics.some((t) => t.value === topicParam)
    ? (topicParam as string)
    : contactDefaults.topic;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...contactDefaults, topic: initialTopic },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitEnquiry(values);
      toast.success("Message received", {
        description: "We reply to everything — usually within two working days.",
      });
      reset(contactDefaults);
    } catch {
      toast.error("That didn't go through", {
        description: `Please try again, or email us directly.`,
      });
    }
  };

  const fieldError = "text-destructive mt-1.5 text-sm";
  const invalid = "border-destructive focus-visible:ring-destructive/30";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-border bg-card rounded-3xl border p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${formId}-name`}>
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${formId}-name`}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={cn("mt-2", errors.name && invalid)}
            {...register("name")}
          />
          {errors.name && (
            <p id={`${formId}-name-error`} className={fieldError}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor={`${formId}-email`}>
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@studio.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={cn("mt-2", errors.email && invalid)}
            {...register("email")}
          />
          {errors.email && (
            <p id={`${formId}-email-error`} className={fieldError}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor={`${formId}-company`}>
          Studio or company{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id={`${formId}-company`}
          autoComplete="organization"
          placeholder="Where you're writing from"
          className="mt-2"
          {...register("company")}
        />
      </div>

      <div className="mt-5">
        <Label htmlFor={`${formId}-topic`}>What&apos;s this about?</Label>
        {/*
          Radix Select is not a native input, so it cannot be `register`ed.
          Controller is the supported bridge: it hands the field a defined
          value from the first render, which keeps Select controlled
          throughout. (Driving it from useWatch instead leaves the value
          undefined on render one, so Radix mounts uncontrolled and emits a
          spurious empty change that trips validation before the user has
          touched anything.)
        */}
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={`${formId}-topic`}
                ref={field.ref}
                onBlur={field.onBlur}
                aria-invalid={!!errors.topic}
                className="mt-2 w-full"
              >
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTopics.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.topic && <p className={fieldError}>{errors.topic.message}</p>}
      </div>

      <div className="mt-5">
        <Label htmlFor={`${formId}-message`}>
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={`${formId}-message`}
          rows={6}
          placeholder="Tell us about your game, your studio, or what you need. If you have a build or a deck, mention it and we'll ask for a link."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={cn("mt-2 resize-y", errors.message && invalid)}
          {...register("message")}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className={fieldError}>
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-brand text-brand-ink hover:bg-brand-bright rounded-full px-7 font-semibold disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-1 size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-1 size-4" />
              Send message
            </>
          )}
        </Button>
        <p className="text-muted-foreground text-xs">
          We reply to every message, usually within two working days.
        </p>
      </div>
    </form>
  );
}
