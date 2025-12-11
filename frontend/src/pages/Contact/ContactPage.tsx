import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { settingsService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ContactPage: React.FC = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsService.get(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-dark-gray-2">
              Have a question or want to discuss a project? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            <div className="bg-off-white p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pure-black text-pure-white rounded-full mb-4">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-pure-black mb-2">
                Email Us
              </h3>
              <a
                href={`mailto:${settings?.contact_email || 'contact@atelierspacesnate.com'}`}
                className="text-dark-gray-2 hover:text-pure-black font-body"
              >
                {settings?.contact_email || 'contact@atelierspacesnate.com'}
              </a>
            </div>

            {/* Phone */}
            {settings?.phone && (
              <div className="bg-off-white p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pure-black text-pure-white rounded-full mb-4">
                  <FaPhone className="text-2xl" />
                </div>
                <h3 className="text-xl font-display font-bold text-pure-black mb-2">
                  Call Us
                </h3>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-dark-gray-2 hover:text-pure-black font-body"
                >
                  {settings.phone}
                </a>
              </div>
            )}
          </div>

          {/* Address */}
          {settings?.address && (
            <div className="bg-off-white p-8 mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pure-black text-pure-white rounded-full mb-4">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-pure-black mb-2">
                Visit Us
              </h3>
              <p className="text-dark-gray-2 font-body whitespace-pre-line">
                {settings.address}
              </p>
            </div>
          )}

          {/* Social Media */}
          {settings?.social_links && (
            <div className="text-center">
              <h3 className="text-2xl font-display font-bold text-pure-black mb-6">
                Follow Us
              </h3>
              <div className="flex justify-center space-x-6">
                {settings.social_links.instagram && (
                  <a
                    href={settings.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-dark-gray-2 hover:text-pure-black transition-colors"
                    aria-label="Instagram"
                  >
                    <FaEnvelope />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center pt-12 border-t border-dark-gray-3 border-opacity-20">
            <p className="text-lg text-dark-gray-2 font-body mb-6">
              Ready to start a project?
            </p>
            <a
              href="/collaborate"
              className="btn-primary inline-block"
            >
              Submit a Collaboration Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
