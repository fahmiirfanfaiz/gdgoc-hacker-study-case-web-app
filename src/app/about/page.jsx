"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { BookOpen, Users, Target, Award, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Books Available", value: "10,000+", icon: BookOpen },
    { label: "Happy Readers", value: "50,000+", icon: Users },
    { label: "Years of Service", value: "5+", icon: Award },
    { label: "Countries Served", value: "20+", icon: Globe },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Passionate about books and building communities",
    },
    {
      name: "Michael Chen",
      role: "Head of Curation",
      description: "Expert in literary trends and recommendations",
    },
    {
      name: "Emma Williams",
      role: "Customer Experience",
      description: "Ensuring every reader finds their perfect book",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#252B42] to-[#3E4A6B] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter mb-4 sm:mb-6">
              About Bookstar
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              Your trusted destination for discovering amazing books. We&apos;re
              passionate about bringing readers and books together, creating a
              community of book lovers who share the joy of reading.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#252B42] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-inter text-[#252B42] mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm sm:text-base text-[#737373] font-inter">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              <div className="bg-linear-to-br from-[#252B42] to-[#3E4A6B] p-8 sm:p-10 md:p-12 rounded-xl text-white">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-inter mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  To inspire and nurture the love of reading by providing access
                  to diverse and quality books for everyone. We believe that
                  every book has the power to change lives, and we&apos;re
                  committed to making that transformation accessible to all.
                </p>
              </div>

              <div className="bg-linear-to-br from-[#3E4A6B] to-[#252B42] p-8 sm:p-10 md:p-12 rounded-xl text-white">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-inter mb-4 sm:mb-6">
                  Our Vision
                </h2>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  To become the leading online bookstore that connects readers
                  with their perfect books. We envision a world where reading is
                  celebrated, knowledge is shared, and stories bring people
                  together across cultures and generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-[#252B42] mb-3 sm:mb-4">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-[#737373] font-inter max-w-2xl mx-auto">
              Dedicated professionals working to bring you the best book
              shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-[#252B42] to-[#3E4A6B] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-[#737373] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm sm:text-base text-[#737373] font-inter">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-[#252B42] mb-3 sm:mb-4">
                Our Values
              </h2>
              <p className="text-base sm:text-lg text-[#737373] font-inter">
                The principles that guide everything we do
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#252B42] rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                    Quality First
                  </h3>
                  <p className="text-sm sm:text-base text-[#737373] font-inter">
                    We carefully curate every book in our collection to ensure
                    we offer only the best to our readers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#252B42] rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                    Community Focused
                  </h3>
                  <p className="text-sm sm:text-base text-[#737373] font-inter">
                    Building a vibrant community of readers who share, discuss,
                    and celebrate the written word together.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#252B42] rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                    Passion for Reading
                  </h3>
                  <p className="text-sm sm:text-base text-[#737373] font-inter">
                    Our love for books drives everything we do, from selection
                    to customer service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
