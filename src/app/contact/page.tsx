import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/settings";

export const metadata = {
  title: "Contact | IRYN Made",
  description:
    "Get in touch with IRYN Made. We're here for design consultations, custom orders, and any questions about our fashion collection.",
};

export default async function ContactPage() {
  const s = await getSettings();
  const phone = s.contact_phone || "+250 780 000 000";
  const whatsapp = s.contact_whatsapp || "250780000000";
  const email = s.contact_email || "hello@irynmade.com";
  const instagram = s.contact_instagram || "irynmade";
  const location = s.business_location || "Kigali, Rwanda";

  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="text-kicker text-[#b8953a] mb-4">Get in Touch</p>
          <h1 className="font-editorial text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
            Let&apos;s <em className="italic">create</em>
            <br />
            together
          </h1>
          <p className="text-[#3a3a3a] max-w-2xl mx-auto text-lg">
            Custom orders, design consultations, or questions about an order —
            we&apos;re here for all of it. Reach out and let&apos;s make
            something beautiful.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10">
          <aside className="space-y-4">
            <div className="border-t border-[#0a0a0a] pt-6">
              <h2 className="text-ui-small mb-4">Visit Us</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#b8953a] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="text-sm">
                  <p>{location}</p>
                  <p className="text-xs text-[#8a8a8a] mt-1">
                    Studio visits by appointment
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e7e5e0] pt-6">
              <h2 className="text-ui-small mb-4">Call or WhatsApp</h2>
              <div className="space-y-3">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm hover:text-[#b8953a]">
                  <Phone className="w-5 h-5 text-[#b8953a]" strokeWidth={1.5} />
                  {phone}
                </a>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="flex items-center gap-3 text-sm hover:text-[#b8953a]">
                  <MessageCircle className="w-5 h-5 text-[#b8953a]" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="border-t border-[#e7e5e0] pt-6">
              <h2 className="text-ui-small mb-4">Email</h2>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm hover:text-[#b8953a]">
                <Mail className="w-5 h-5 text-[#b8953a]" strokeWidth={1.5} />
                {email}
              </a>
            </div>

            <div className="border-t border-[#e7e5e0] pt-6">
              <h2 className="text-ui-small mb-4">Follow</h2>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#b8953a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener"
                  className="text-sm hover:text-[#b8953a]"
                >
                  @{instagram}
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#faf6f0] to-[#e8dcc8] p-6 mt-6">
              <p className="text-kicker text-[#8a6a3a] mb-3">Custom Orders</p>
              <p className="text-sm text-[#3a3a3a]">
                Need a custom design? Share your vision and we&apos;ll bring it
                to life. Consultations are always free.
              </p>
            </div>
          </aside>

          <ContactForm whatsappNumber={whatsapp} />
        </div>
      </div>
    </div>
  );
}
