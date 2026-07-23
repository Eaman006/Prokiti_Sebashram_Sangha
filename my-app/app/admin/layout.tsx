import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-6 mt-14 md:mt-0 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
