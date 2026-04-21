import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

type SearchParams = Promise<{ order?: string }>;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { order } = await searchParams;

  return (
    <div className="bg-white min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-[#b8953a]/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-[#b8953a]" strokeWidth={1.5} />
        </div>
        <p className="text-kicker text-[#b8953a] mb-4">Order Placed</p>
        <h1 className="font-editorial text-5xl md:text-6xl font-bold leading-[1] mb-6">
          Thank you
        </h1>
        <p className="text-[#3a3a3a] mb-2">
          Your order has been received and is being processed.
        </p>
        {order && (
          <p className="text-sm text-[#8a8a8a] mb-10">
            Order Number: <span className="font-mono font-semibold text-[#0a0a0a]">{order}</span>
          </p>
        )}
        <div className="bg-[#fafaf8] p-6 md:p-8 mb-10 text-left border-l-2 border-[#b8953a]">
          <h3 className="text-ui-small text-[#0a0a0a] mb-4">What happens next</h3>
          <ol className="text-sm text-[#3a3a3a] space-y-3 list-decimal list-inside leading-relaxed">
            <li>We&apos;ll verify your MoMo payment within 24 hours</li>
            <li>You&apos;ll receive a confirmation email once approved</li>
            <li>Your items will be prepared and shipped</li>
            <li>Track your order status in your account</li>
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account/orders">
            <Button size="lg">View My Orders</Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="secondary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
