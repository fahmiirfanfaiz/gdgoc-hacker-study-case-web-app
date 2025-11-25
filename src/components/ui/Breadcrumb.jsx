"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split pathname into segments
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Create breadcrumb items
  const breadcrumbs = [
    { name: "Home", href: "/", active: pathname === "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      const active = pathname === href;

      return { name, href, active };
    }),
  ];

  return (
    <nav className="w-full bg-white py-6">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm font-inter">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center gap-2">
              <Link
                href={breadcrumb.href}
                className={`transition-colors ${
                  breadcrumb.active
                    ? "text-[#252B42] font-semibold"
                    : "text-[#737373] font-normal hover:text-[#23856D]"
                }`}
                style={{ fontWeight: breadcrumb.active ? 600 : 400 }}
              >
                {breadcrumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;