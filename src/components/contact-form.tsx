"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (!values.message.trim()) errors.message = "Message is required";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          className="rounded-[32px] border border-success/40 bg-success/10 px-8 py-12 text-center"
          role="status"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[24px] font-medium md:text-[32px]">Message ready</p>
          <p className="mt-3 text-[16px] text-foreground-muted md:text-[18px]">
            Thanks — this form is UI-only for now. We’ll wire delivery when the site goes live.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-pill-border px-6 py-3 text-[16px] transition-colors hover:bg-foreground hover:text-background"
            onClick={() => {
              setSubmitted(false);
              setValues(initial);
            }}
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
          noValidate
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Field
            label="Name"
            id="name"
            value={values.name}
            error={errors.name}
            onChange={(v) => setValues((s) => ({ ...s, name: v }))}
            placeholder="Your name"
          />
          <Field
            label="Email"
            id="email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(v) => setValues((s) => ({ ...s, email: v }))}
            placeholder="you@company.com"
          />
          <Field
            label="Company"
            id="company"
            value={values.company}
            onChange={(v) => setValues((s) => ({ ...s, company: v }))}
            placeholder="Optional"
          />
          <div>
            <label htmlFor="message" className="mb-2 block text-[14px] text-foreground-muted">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={values.message}
              onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
              placeholder="Tell us about your project"
              className={cn(
                "w-full resize-y rounded-[20px] border bg-input-bg px-5 py-4 text-[16px] outline-none transition-colors placeholder:text-input-placeholder focus:border-foreground",
                errors.message ? "border-error" : "border-input-border",
              )}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <p className="mt-2 text-[14px] text-error">{errors.message}</p>}
          </div>
          <Magnetic strength={0.22} className="mt-2 self-start">
            <motion.button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-5 text-[18px] text-background"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              Send message
            </motion.button>
          </Magnetic>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] text-foreground-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-14 w-full rounded-full border bg-input-bg px-5 text-[16px] outline-none transition-colors placeholder:text-input-placeholder focus:border-foreground",
          error ? "border-error" : "border-input-border",
        )}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="mt-2 text-[14px] text-error">{error}</p>}
    </div>
  );
}
