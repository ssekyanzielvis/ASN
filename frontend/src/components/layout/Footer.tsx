import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray-1 text-off-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Studio Info */}
          <div>
            <h3 className="text-xl font-display font-bold text-pure-white mb-4">
              Atelier Spaces Nate
            </h3>
            <p className="text-dark-gray-3 mb-4">
              A research-led design studio working with form, systems, and cultural intelligence,
              rooted in African contexts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-bold text-pure-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/works"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  Our Works
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/collaborate"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  Collaborate
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-dark-gray-3 hover:text-pure-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-display font-bold text-pure-white mb-4">Connect</h3>
            <p className="text-dark-gray-3 mb-4">contact@atelierspacesnate.com</p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-gray-3 hover:text-pure-white transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-gray-3 hover:text-pure-white transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-gray-3 hover:text-pure-white transition-colors text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-gray-3 hover:text-pure-white transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-gray-3 border-opacity-30 mt-8 pt-8 text-center">
          <p className="text-dark-gray-3">
            © {currentYear} Atelier Spaces Nate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
