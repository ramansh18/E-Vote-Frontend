"use client";

import { Link } from "react-router-dom";
import { IconButton, Tooltip, Divider } from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
  HowToVote,
  Security,
  Speed,
  Verified,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", href: "#" },
    { icon: <Twitter />, label: "Twitter", href: "#" },
    { icon: <LinkedIn />, label: "LinkedIn", href: "#" },
    { icon: <Instagram />, label: "Instagram", href: "#" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Elections", href: "/elections" },
    { label: "How to Vote", href: "/guide" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ];

  const features = [
    { icon: <Security />, text: "256-bit Encryption" },
    { icon: <Verified />, text: "Verified Secure" },
    { icon: <HowToVote />, text: "Easy Voting" },
    { icon: <Speed />, text: "Instant Results" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-indigo-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <HowToVote className="text-4xl text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    E-Vote
                  </h3>
                  <p className="text-sm text-gray-300">
                    Secure Digital Democracy
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering democracy through secure, transparent, and accessible
                digital voting solutions. Your voice matters, and we make sure
                it's heard.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:evote2025@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  <Email className="text-lg" />
                  <span className="text-sm">evote2025@gmail.com</span>
                </a>

                <a
  href="tel:+91818XXX75241"
  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
>
  <Phone className="text-lg" />
  <span className="text-sm">+91 818XXX75241</span>
</a>

                <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  <LocationOn className="text-lg" />
                  <span className="text-sm">Lucknow,Uttar Pradesh</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-purple-400 transition-colors duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-purple-400 transition-colors duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Features */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">
                Security Features
              </h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          {/* <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-3 text-white">Stay Updated</h4>
              <p className="text-gray-300 mb-6">Get the latest news about elections and voting updates</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                &copy; {currentYear} E-Voting System. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Powered by blockchain technology for secure and transparent
                elections.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm mr-4">Follow us:</span>
              {socialLinks.map((social, index) => (
                <Tooltip key={index} title={social.label} arrow>
                  <IconButton
                    href={social.href}
                    className="group transition-all duration-300 hover:scale-110"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "rgba(59, 130, 246, 0.3)",
                        borderColor: "rgba(59, 130, 246, 0.5)",
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-5 border-t border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Security className="text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Verified className="text-blue-400" />
                <span>Verified Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <HowToVote className="text-purple-400" />
                <span>Trusted by 1M+ Voters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
