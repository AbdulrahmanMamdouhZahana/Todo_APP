import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { X, PlusCircle } from 'lucide-react';

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsClose: () => void;
  title?: string;
}

const AddModal = ({ children, isOpen, setIsClose, title = "Create New Todo" }: IProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={setIsClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <DialogTitle as="h3" className="text-lg font-bold text-slate-800">
                  {title}
                </DialogTitle>
              </div>
              <button
                type="button"
                onClick={setIsClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddModal;