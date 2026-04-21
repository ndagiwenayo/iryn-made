"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-kicker text-[#b8953a] mb-6">Stay Connected</p>
        <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1] mb-6">
          Join the <em className="italic text-[#b8953a]">IRYN</em> Family
        </h2>
        <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl mx-auto">
          Be the first to receive new arrivals, styling inspiration, and
          exclusive access to designer collections.
        </p>
        {submitted ? (
          <div className="inline-flex items-center gap-3 text-[#b8953a] text-base">
            <span className="w-8 h-8 rounded-full bg-[#b8953a]/20 flex items-center justify-center">
              ✓
            </span>
            Welcome to the family
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border-b border-white/20 focus-within:border-white transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent px-2 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-semibold text-white hover:text-[#b8953a] transition-colors px-2 py-4"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
        <p className="text-xs text-white/30 mt-6">
          By subscribing, you agree to receive marketing emails. Unsubscribe
          anytime.
        </p>
      </div>
    </section>
  );
}
