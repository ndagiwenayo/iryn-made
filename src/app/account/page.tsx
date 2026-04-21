import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import ProfileForm from "@/components/account/ProfileForm";

export default async function AccountPage() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
  });

  if (!user) return null;

  return (
    <div>
      <h2 className="font-editorial text-3xl font-bold mb-3">Profile Information</h2>
      <p className="text-[#8a8a8a] mb-8">
        Update your personal details and delivery address
      </p>
      <ProfileForm
        user={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          postalCode: user.postalCode || "",
        }}
      />
    </div>
  );
}
