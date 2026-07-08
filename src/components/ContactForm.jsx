import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 size={48} className="text-orange-600" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight">Transmission Received</h3>
        <p className="text-black/60 font-medium">Your message has been successfully routed. Expect a response within 24 standard cycles.</p>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono text-xs font-bold uppercase tracking-widest text-orange-600 hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block label-mono text-[10px] text-black/40 mb-1.5">IDENTIFIER_NAME</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-black/10 focus:border-orange-600 outline-none transition-colors font-sans text-sm font-medium"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block label-mono text-[10px] text-black/40 mb-1.5">ROUTING_EMAIL</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-black/10 focus:border-orange-600 outline-none transition-colors font-sans text-sm font-medium"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block label-mono text-[10px] text-black/40 mb-1.5">PAYLOAD_MESSAGE</label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-black/10 focus:border-orange-600 outline-none transition-colors font-sans text-sm font-medium resize-none"
            placeholder="Describe your architectural vision..."
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 border border-red-100">
          <AlertCircle size={16} />
          <span className="text-xs font-bold uppercase tracking-tight">Transmission Failed. Please retry.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest border border-black bg-black text-white hover:border-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="z-10 flex items-center gap-2 relative">
          {status === 'loading' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
          {status === 'loading' ? 'Transmitting...' : 'Initialize Transmission'}
        </span>
        <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
      </button>
    </form>
  );
};
