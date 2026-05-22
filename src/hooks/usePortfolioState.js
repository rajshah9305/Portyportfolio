import { useState, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const usePortfolioState = () => {
  const [loading, setLoading] = useState(true);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const toggleBlueprintMode = useCallback(() => {
    setBlueprintMode(prev => !prev);
  }, []);

  const closeServiceModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const completeLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    blueprintMode,
    selectedService,
    emailCopied,
    setBlueprintMode,
    setSelectedService,
    handleCopyEmail,
    toggleBlueprintMode,
    closeServiceModal,
    completeLoading
  };
};
