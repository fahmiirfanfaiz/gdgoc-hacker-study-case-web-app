"use client";
import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "(225) 555-0118",
      color: "bg-[#252B42]",
      description: "Mon-Fri 9am-6pm",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@bookstar.com",
      color: "bg-[#252B42]",
      description: "We reply within 24h",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jakarta, Indonesia",
      color: "bg-[#252B42]",
      description: "Visit our office",
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
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${info.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <info.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-2">
                  {info.title}
                </h3>
                <p className="text-base sm:text-lg text-[#252B42] font-inter font-semibold mb-1">
                  {info.value}
                </p>
                <p className="text-sm text-[#737373] font-inter">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Form */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 bg-[#252B42] rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-inter text-[#252B42]">
                    Send a Message
                  </h2>
                </div>

                {submitStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-inter text-sm sm:text-base">
                      Message sent successfully! We&apos;ll get back to you
                      soon.
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#252B42] focus:border-transparent font-inter text-sm sm:text-base"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#252B42] focus:border-transparent font-inter text-sm sm:text-base"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#252B42] focus:border-transparent font-inter text-sm sm:text-base"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold font-inter text-[#252B42] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#252B42] focus:border-transparent font-inter text-sm sm:text-base resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#252B42] text-white hover:bg-[#3E4A6B] px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <div className="bg-linear-to-br from-[#252B42] to-[#3E4A6B] p-6 sm:p-8 rounded-xl text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-inter mb-3 sm:mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-gray-200">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold font-inter text-[#252B42] mb-4">
                    Frequently Asked
                  </h3>
                  <div className="space-y-4 text-sm sm:text-base">
                    <div>
                      <p className="font-semibold text-[#252B42] mb-1">
                        How long does shipping take?
                      </p>
                      <p className="text-[#737373]">
                        Standard shipping takes 3-5 business days.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#252B42] mb-1">
                        Can I track my order?
                      </p>
                      <p className="text-[#737373]">
                        Yes, you&apos;ll receive a tracking number via email.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#252B42] mb-1">
                        What&apos;s your return policy?
                      </p>
                      <p className="text-[#737373]">
                        30-day money-back guarantee on all purchases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
