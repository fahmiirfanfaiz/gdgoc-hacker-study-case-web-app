import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Home Page Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-[#252B42] mb-3 sm:mb-4">
            Welcome to Bookstar
          </h1>
          <p className="text-base sm:text-lg font-inter text-[#737373] mb-6 sm:mb-8">
            Your one-stop shop for amazing books
          </p>

          {/* Featured Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
            <div className="p-4 sm:p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                Latest Arrivals
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Discover our newest collection of books
              </p>
            </div>
            <div className="p-4 sm:p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                Best Sellers
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Check out what everyone is reading
              </p>
            </div>
            <div className="p-4 sm:p-6 border rounded-lg hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                Special Offers
              </h3>
              <p className="text-sm sm:text-base text-[#737373] font-inter">
                Great deals on selected titles
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
