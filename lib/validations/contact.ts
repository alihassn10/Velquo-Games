import { z } from "zod";

/**
 * Contact form shape and rules.
 *
 * Kept separate from the component so the same schema can validate on the
 * server the moment a real backend is wired in — client-side validation is a
 * convenience, never a guarantee.
 */

export const inquiryTopics = [
  { value: "publishing", label: "Publishing — I have a game to pitch" },
  { value: "partnership", label: "Partnership or IP collaboration" },
  { value: "careers", label: "Careers — I'd like to work here" },
  { value: "press", label: "Press or media enquiry" },
  { value: "general", label: "Something else" },
] as const;

export const topicValues = inquiryTopics.map((t) => t.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .email("That doesn't look like a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "That studio name is a little too long.")
    .optional()
    .or(z.literal("")),
  topic: z.enum(topicValues, {
    message: "Pick the option that fits best.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a bit more — at least 20 characters.")
    .max(2000, "Please keep it under 2000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  topic: "general",
  message: "",
};
