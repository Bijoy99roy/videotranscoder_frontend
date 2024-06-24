import { useState } from 'react';

interface Modal {
    isOpen:boolean;
    openModal: () => void;
    closeModal: () => void;
}

export function useModal():Modal {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {isOpen, openModal, closeModal};
}

