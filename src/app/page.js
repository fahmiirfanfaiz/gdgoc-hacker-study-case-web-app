import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Home Page Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-inter text-[#252B42] mb-4">
            Welcome to Bookstar
          </h1>
          <p className="text-lg font-inter text-[#737373] mb-8">
            Your one-stop shop for amazing books
          </p>

          {/* Featured Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold font-inter text-[#252B42] mb-2">
                Latest Arrivals
              </h3>
              <p className="text-[#737373] font-inter">
                Discover our newest collection of books
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold font-inter text-[#252B42] mb-2">
                Best Sellers
              </h3>
              <p className="text-[#737373] font-inter">
                Check out what everyone is reading
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold font-inter text-[#252B42] mb-2">
                Special Offers
              </h3>
              <p className="text-[#737373] font-inter">
                Great deals on selected titles
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
