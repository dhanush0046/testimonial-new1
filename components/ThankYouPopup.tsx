//components/ThankYouPopup.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
import Modal from "@/components/Modal";

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  thankYouImage: string | null;
  thankYouTitle: string;
  thankYouMessage: string;
  allowSocialShare: boolean;
}

export default function ThankYouPopup({
  isOpen,
  onClose,
  thankYouImage,
  thankYouTitle,
  thankYouMessage,
  allowSocialShare,
}: ThankYouPopupProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {thankYouImage && (
          <div className="w-full max-w-md mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-lg">
            <Image
              src={thankYouImage}
              alt="Thank You"
              width={400}
              height={200}
              className="object-cover w-70 h-auto"
            />
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">{thankYouTitle || "Thank you!"}</h2>
        <p className="mb-6">{thankYouMessage || "Thank you so much for your feedback!"}</p>
        {allowSocialShare && (
          <div className="flex justify-center space-x-4 mb-6">
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}

// //components/ThankYouPopup.tsx  -- language update
// import React from 'react';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";
// import { Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
// import Modal from "@/components/Modal";
// //import { Language } from '@prisma/client';
// import { useTranslation } from "@/hooks/useTranslation";
// import {Language} from "@/types/space";

// interface ThankYouPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   thankYouImage: string | null;
//   thankYouTitle: string;
//   thankYouMessage: string;
//   allowSocialShare: boolean;
//   selectedLanguage: Language;
// }

// export default function ThankYouPopup({
//   isOpen,
//   onClose,
//   thankYouImage,
//   thankYouTitle,
//   thankYouMessage,
//   allowSocialShare,
//   selectedLanguage,
// }: ThankYouPopupProps) {
//   const { translatedText: translatedTitle } = useTranslation(thankYouTitle, selectedLanguage);
//   const { translatedText: translatedMessage } = useTranslation(thankYouMessage, selectedLanguage);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="text-center">
//         {thankYouImage && (
//           <div className="w-full max-w-md mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-lg">
//             <Image
//               src={thankYouImage}
//               alt="Thank You"
//               width={400}
//               height={200}
//               className="object-cover w-70 h-auto"
//             />
//           </div>
//         )}
//         <h2 className="text-2xl font-bold mb-4">{translatedTitle || "Thank you!"}</h2>
//         <p className="mb-6">{translatedMessage || "Thank you so much for your feedback!"}</p>
//         {allowSocialShare && (
//           <div className="flex justify-center space-x-4 mb-6">
//             <Button variant="outline" size="icon">
//               <Twitter className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon">
//               <Facebook className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon">
//               <Linkedin className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon">
//               <MessageSquare className="h-4 w-4" />
//             </Button>
//           </div>
//         )}
//         <Button onClick={onClose}>
//           {selectedLanguage === Language.ENGLISH ? "Close" :
//            selectedLanguage === Language.SPANISH ? "Cerrar" :
//            selectedLanguage === Language.FRENCH ? "Fermer" :
//            selectedLanguage === Language.GERMAN ? "Schließen" :
//            selectedLanguage === Language.CHINESE ? "关闭" : "Close"}
//         </Button>
//       </div>
//     </Modal>
//   );
// }