import prisma from "@/lib/prisma";
import UserActions from "@/components/admin/UserActions";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Customer Management</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Users</h1>
      </div>

      <div className="border border-[#e7e5e0] bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0] font-semibold">
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Email</th>
              <th className="text-center p-4">Role</th>
              <th className="text-center p-4">Orders</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#e7e5e0] last:border-0 hover:bg-[#fafaf8]">
                <td className="p-4">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-[10px] text-[#8a8a8a]">@{user.username}</p>
                </td>
                <td className="p-4 text-[#3a3a3a]">{user.email}</td>
                <td className="p-4 text-center">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                    user.role === "admin" ? "text-[#b8953a]" : "text-[#3a3a3a]"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center">{user._count.orders}</td>
                <td className="p-4 text-center">
                  {user.isActive ? (
                    <span className="text-green-700 text-[10px] uppercase tracking-wider font-semibold">Active</span>
                  ) : (
                    <span className="text-[#c23232] text-[10px] uppercase tracking-wider font-semibold">Disabled</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <UserActions userId={user.id} isActive={user.isActive} role={user.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
