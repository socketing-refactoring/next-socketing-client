import Image from "next/image";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: (boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="z-50 w-full max-w-md mx-8 md:mx-auto bg-white rounded-lg shadow-lg p-4 md:px-6">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Image
              alt="모달 창 닫기"
              src="/images/circle-x.svg"
              width="30"
              height="30"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
