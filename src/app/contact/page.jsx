"use client";
import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumbs />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-inter text-[#252B42] mb-4">
              Contact Us
            </h1>
            <p className="text-lg font-inter text-[#737373]">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#23A6F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold font-inter text-[#252B42] mb-2">
                Phone
              </h3>
              <p className="text-[#737373] font-inter">(225) 555-0118</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#23856D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold font-inter text-[#252B42] mb-2">
                Email
              </h3>
              <p className="text-[#737373] font-inter">contact@bookstar.com</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#E77C40] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold font-inter text-[#252B42] mb-2">
                Location
              </h3>
              <p className="text-[#737373] font-inter">Jakarta, Indonesia</p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-8">
            <h2 className="text-2xl font-bold font-inter text-[#252B42] mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-inter"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-inter"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-inter"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-inter resize-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-[#23A6F0] text-white font-semibold font-inter rounded-md hover:bg-[#1a8cd8] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
