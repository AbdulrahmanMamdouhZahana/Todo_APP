import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { AlertTriangle, X } from 'lucide-react';

interface IProps {
  isOpen: boolean;
  setIsClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const DeleteModal = ({ isOpen, children, setIsClose, title, description }: IProps) => {
  return (
    <Dialog open={isOpen} onClose={setIsClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-50 overflow-y-auto">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900">{title}</DialogTitle>
              </div>
            </div>
            <button
              type="button"
              onClick={setIsClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Description className="text-sm text-slate-600 mb-6 leading-relaxed">
            {description}
          </Description>

          <div>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;