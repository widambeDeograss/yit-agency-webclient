import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, QrCode, ChevronRight } from 'lucide-react';

const SwingingAnimation = () => (
    //@ts-ignore
  <style jsx>{`
    @keyframes swing {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-3deg); }
      100% { transform: rotate(0deg); }
    }
    .animate-swing {
      animation: swing 4s ease-in-out infinite;
      transform-origin: top center;
    }
    .lanyard {
      background: linear-gradient(180deg, #dc2626, #b91c1c);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      letter-spacing: 0.1em;
      border-radius: 2px;
    }
    .clasp {
      width: 24px;
      height: 10px;
      background: linear-gradient(to bottom, #e5e5e5, #9ca3af);
      border-radius: 4px;
      position: absolute;
      top: -5px;
      left: calc(50% - 12px);
      box-shadow: inset 0 -2px 0 rgba(0,0,0,0.15);
      border: 1px solid #d1d5db;
    }
    .barcode {
      width: 100%;
      height: 20px;
      background: repeating-linear-gradient(
        to right,
        #000,
        #000 1px,
        #fff 1px,
        #fff 3px
      );
      border-radius: 2px;
    }
    .id-photo {
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    .hologram {
      position: absolute;
      width: 40px;
      height: 40px;
      bottom: 20px;
      right: 20px;
      opacity: 0.2;
      background: linear-gradient(135deg, 
        transparent 0%, 
        rgba(255,255,255,0.4) 25%, 
        transparent 50%,
        rgba(255,255,255,0.4) 75%, 
        transparent 100%
      );
      border-radius: 50%;
      transform: rotate(45deg);
    }
  `}</style>
);

export default function GuestInvitationBadge() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <SwingingAnimation />

      <div className="relative animate-swing">
        {/* Lanyard */}
        <div className="w-7 h-48 lanyard mx-auto mb-1">
          YOUTH TECH 2025
          <div className="clasp" />
        </div>

        {/* Badge Card */}
        <Card className="w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden relative">
          {/* Top Logo Strip */}
          <div className="w-full h-12 bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center justify-center px-4">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">YT</span>
              </div>
              <span className="text-white font-bold tracking-wider text-base">YOUTH TECH SUMMIT 2025</span>
            </div>
          </div>

          <CardContent className="p-0">
            {/* Main content */}
            <div className="p-4 pt-5">
              <div className="flex items-start space-x-4">
                {/* Photo */}
                <div className="id-photo w-24 h-32 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0">
                  <User size={56} className="text-gray-300" />
                </div>
                
                {/* Details */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-800">JOHN SMITH</h2>
                    <p className="text-gray-500 text-sm">ID: TYS-2025-G1234</p>
                  </div>
                  
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 mb-2 text-xs">
                    GUEST
                  </Badge>
                  
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 text-xs">
                    <div className="text-gray-500">EVENT DATE</div>
                    <div className="font-medium">MAY 12-14, 2025</div>
                    
                    <div className="text-gray-500">ACCESS LEVEL</div>
                    <div className="font-medium">ALL AREAS</div>
                    
                    <div className="text-gray-500">VALID UNTIL</div>
                    <div className="font-medium">MAY 14, 2025 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lower section */}
            <div className="border-t border-gray-200 bg-gray-50 p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium text-gray-500">TECH INNOVATION CENTER</div>
                <div className="flex items-center text-xs text-blue-600">
                  <span>Scan for details</span>
                  <ChevronRight size={14} />
                </div>
              </div>
              
              {/* QR code and barcode */}
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
                  <QrCode size={52} className="text-gray-800" />
                </div>
                <div className="flex-1">
                  <div className="barcode mb-1"></div>
                  <div className="text-center text-xs text-gray-500">2501958700349</div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Security hologram effect */}
          <div className="hologram"></div>
        </Card>

        {/* Connector */}
        <div
          className="absolute top-[12.1rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-2 border-yellow-600"
        />
      </div>

      {/* Footer Text */}
      <p className="mt-12 text-center text-sm text-gray-600 max-w-xs">
        Please wear this badge at all times during the event. 
        Scan QR code for session check-in and digital materials.
      </p>
    </div>
  );
}