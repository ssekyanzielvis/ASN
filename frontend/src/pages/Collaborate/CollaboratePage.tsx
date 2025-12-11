import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { collaborationService } from '../../services/api';
import { Collaboration } from '../../types';

const CollaboratePage: React.FC = () => {
  const [formData, setFormData] = useState<Collaboration>({
    name: '',
    email: '',
    project_type: 'other',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: Collaboration) => collaborationService.submit(data),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', project_type: 'other', message: '' });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-pure-black mb-6">
              Let's Collaborate
            </h1>
            <p className="text-xl text-dark-gray-2">
              We're always excited to explore new projects and partnerships. 
              Tell us about your ideas, and let's create something meaningful together.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 animate-fade-in">
              <p className="font-body font-medium">
                Thank you for your submission! We'll review your message and get back to you soon.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-off-white p-8 md:p-12">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-body font-medium text-pure-black mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-body font-medium text-pure-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="project_type" className="block font-body font-medium text-pure-black mb-2">
                  Project Type *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="architecture">Architecture Project</option>
                  <option value="design">Design Consultation</option>
                  <option value="game">Game Systems Development</option>
                  <option value="research">Research Collaboration</option>
                  <option value="exhibition">Exhibition/Art Project</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-body font-medium text-pure-black mb-2">
                  Tell Us About Your Project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="input-field resize-none"
                  placeholder="Share your vision, goals, and any relevant details..."
                  minLength={20}
                />
                <p className="text-sm text-dark-gray-3 mt-2">
                  Minimum 20 characters
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? 'Sending...' : 'Submit Request'}
                </button>
              </div>

              {/* Error Message */}
              {mutation.isError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800">
                  <p className="font-body">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-dark-gray-2 font-body mb-4">
              For general inquiries, you can also reach us at:
            </p>
            <a
              href="mailto:contact@atelierspacesnate.com"
              className="text-pure-black font-body font-medium text-lg hover:underline"
            >
              contact@atelierspacesnate.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePage;
