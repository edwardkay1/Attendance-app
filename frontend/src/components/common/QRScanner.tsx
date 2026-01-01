import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { CameraOff, Focus, ShieldAlert } from 'lucide-react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

export default function QRScanner({ onScan, onError, isActive }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data);
      },
      {
        onDecodeError: (error) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (!errorMessage.includes('No QR code found')) {
            console.error('QR Scanner error:', error);
            onError?.(errorMessage);
          }
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    setScanner(qrScanner);
    QrScanner.hasCamera().then(setHasCamera);

    return () => {
      qrScanner.destroy();
    };
  }, [onScan, onError]);

  useEffect(() => {
    if (!scanner) return;

    if (isActive) {
      scanner.start().catch((error) => {
        console.error('Failed to start scanner:', error);
        onError?.('Failed to access camera. Please check permissions.');
        setHasCamera(false);
      });
    } else {
      scanner.stop();
    }
  }, [scanner, isActive, onError]);

  if (!hasCamera) {
    return (
      <div className="py-12 px-6 text-center bg-white/40 backdrop-blur-xl rounded-[32px] border border-red-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-red-500 shadow-inner bg-red-50 rounded-2xl">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-slate-900">Camera Unavailable</h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
          UMU Present requires camera access to scan attendance. Please update your browser permissions.
        </p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-[28px] bg-slate-950 aspect-square sm:aspect-video flex items-center justify-center shadow-2xl">
      {/* The Video Feed */}
      <video
        ref={videoRef}
        className="object-cover w-full h-full transition-transform duration-700"
        style={{ transform: 'scaleX(-1)' }} 
      />

      {/* Modern UI Overlay - Active State */}
      {isActive && (
        <>
          {/* Liquid Scan Line Overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#006838] to-transparent shadow-[0_0_15px_#006838] absolute top-0 animate-scan-move" />
          </div>

          {/* High-Tech Targeting Corners */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-48 h-48 border-2 sm:w-64 sm:h-64 border-white/20 rounded-3xl">
              {/* Corner L-Shapes */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#F9A825] rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#F9A825] rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#F9A825] rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#F9A825] rounded-br-lg" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <Focus className="text-white" size={40} strokeWidth={1} />
              </div>
            </div>
          </div>
          
          <div className="absolute flex items-center gap-2 px-4 py-2 -translate-x-1/2 border rounded-full bottom-4 left-1/2 bg-black/40 backdrop-blur-md border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Scanner</span>
          </div>
        </>
      )}

      {/* Paused State Overlay */}
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center duration-300 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="flex items-center justify-center mb-3 rounded-full w-14 h-14 bg-white/10 text-white/50">
            <CameraOff size={28} />
          </div>
          <p className="text-sm font-bold tracking-widest uppercase text-white/70">Scanner Paused</p>
        </div>
      )}

      <style>{`
        @keyframes scan-move {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-move {
          animation: scan-move 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}