//// components/Modal.tsx
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-md shadow-md max-w-lg w-full max-h-[90vh] flex flex-col">
//         <div className="flex justify-end p-4">
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
//           {children}
//         </div>
//         <div className="flex justify-end p-4 border-t">
//           <Button onClick={onClose} variant="outline" className="mr-2">
//             Cancel
//           </Button>
//           <Button type="submit" form="testimonial-form">
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// components/Modal.tsx
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-md max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;