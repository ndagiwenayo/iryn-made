"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactForm({ whatsappNumber = "250780000000" }: { whatsappNumber?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `Hi IRYN Made! I'm ${form.name} (${form.email}).\n\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#faf6f0] to-[#e8dcc8] p-10 text-center">
        <h3 className="font-editorial text-3xl font-bold mb-3">Thanks for reaching out!</h3>
        <p className="text-[#3a3a3a] mb-6">
          We&apos;ve opened WhatsApp with your message. If it didn&apos;t open,
          please try messaging us directly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          variant="secondary"
        >
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#fafaf8] p-8 md:p-10 space-y-5">
      <h2 className="font-editorial text-3xl font-bold mb-2">Send a Message</h2>
      <p className="text-sm text-[#8a8a8a] mb-4">
        We typically respond within a few hours during business days
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Your Name" value={form.name} onChange={handleChange("name")} required />
        <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
      </div>
      <Input
        label="Subject"
        value={form.subject}
        onChange={handleChange("subject")}
        required
        placeholder="Custom order, consultation, question..."
      />
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={handleChange("message")}
          rows={6}
          required
          className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
          placeholder="Tell us what you're looking for..."
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Send via WhatsApp
      </Button>
      <p className="text-[11px] text-[#8a8a8a] text-center">
        Clicking send opens WhatsApp with your message pre-filled
      </p>
    </form>
  );
}
