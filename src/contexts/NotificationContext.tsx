import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastType } from '../components/Toast';
import Modal, { ModalType } from '../components/Modal';

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ModalData {
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
}

interface NotificationContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
  showModal: (modal: ModalData) => Promise<boolean>;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showConfirm: (title: string, message: string, confirmText?: string) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [modal, setModal] = useState<ModalData | null>(null);
  const [modalResolver, setModalResolver] = useState<((value: boolean) => void) | null>(null);

  const showToast = (toast: Omit<ToastData, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showModal = (modalData: ModalData): Promise<boolean> => {
    return new Promise((resolve) => {
      setModal(modalData);
      setModalResolver(() => resolve);
    });
  };

  const closeModal = () => {
    setModal(null);
    if (modalResolver) {
      modalResolver(false);
      setModalResolver(null);
    }
  };

  const confirmModal = () => {
    if (modal?.onConfirm) {
      modal.onConfirm();
    }
    setModal(null);
    if (modalResolver) {
      modalResolver(true);
      setModalResolver(null);
    }
  };

  const showSuccess = (title: string, message?: string) => {
    showToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    showToast({ type: 'error', title, message });
  };

  const showWarning = (title: string, message?: string) => {
    showToast({ type: 'warning', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    showToast({ type: 'info', title, message });
  };

  const showConfirm = (title: string, message: string, confirmText = 'موافق'): Promise<boolean> => {
    return showModal({
      type: 'confirm',
      title,
      message,
      confirmText,
      showCancel: true
    });
  };

  const value: NotificationContextType = {
    showToast,
    showModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
      
      {/* Modal */}
      {modal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          onConfirm={confirmModal}
          {...modal}
        />
      )}
    </NotificationContext.Provider>
  );
};