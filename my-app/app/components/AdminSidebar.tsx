"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { MdUpload, MdAutoStories } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";

const navItems = [
  { label: "Upload Stories", href: "/admin", icon: MdUpload },
  { label: "Manage Stories", href: "/admin/manage-stories", icon: MdAutoStories },
  { label: "A", href: "/admin/a", icon: HiOutlineDocumentText },
  { label: "B", href: "/admin/b", icon: HiOutlineDocumentText },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const getLinkClass = (href: string) =>
    isActive(href)
      ? "bg-purple-600 text-white shadow-purple-400 shadow-md"
      : "text-black hover:text-purple-600 hover:bg-purple-50";

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-purple-100">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-purple-600 leading-tight"
        >
          Prokriti Sebashram Sangha
        </Link>
        <p className="text-gray-500 text-sm font-medium mt-1">Admin Panel</p>
      </div>

      <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition duration-300 ${getLinkClass(href)}`}
          >
            <Icon className="text-xl shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg shadow-black/20 flex justify-between items-center px-4 py-3">
        <span className="font-bold text-purple-600">Admin Panel</span>
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-2xl text-black hover:text-purple-600 transition duration-300"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <IoMdClose /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-purple-300 shadow-lg z-[70] transform transition-transform duration-300 md:translate-x-0 flex flex-col shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
