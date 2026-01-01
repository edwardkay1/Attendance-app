import { useState } from 'react';
import QRScanner from '../common/QRScanner';
import { 
  X, 
  Info, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  Camera, 
  CameraOff,
  Loader2
} from 'lucide-react';
import { validateQRCode, parseQRCode } from '../../data/mockStudentData';

interface AttendanceScannerProps {
  onAttendanceMarked: (qrData: string) => void;
  onClose: () => void;
}

export default function AttendanceScanner({ onAttendanceMarked, onClose }: AttendanceScannerProps) {
  const [isScanning, setIsScanning] = useState(true); // Start scanning immediately
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (result: string) => {
    setScanResult(result);
    setIsScanning(false);
    setIsProcessing(true);

    try {
      // Simulate network delay for UMU backend validation
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (validateQRCode(result)) {
        parseQRCode(result);
        onAttendanceMarked(result);
        setError(null);
      } else {
        setError('Invalid QR code. Please scan the official code displayed by your lecturer.');
      }
    } catch (err) {
      setError('Technical error. Please try again or check your internet.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(true); // Restart scanning automatically
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_32px_64px_-12px_rgba(0,104,56,0.2)] rounded-[32px] max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200/50 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#006838] rounded-xl flex items-center justify-center shadow-lg shadow-[#006838]/20">
              <QrCode className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Mark Attendance</h2>
              <p className="text-[10px] font-bold text-[#F9A825] uppercase tracking-widest">Nkozi Main Campus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Liquid Instructions */}
          {!scanResult && !error && (
            <div className="p-4 bg-[#F9A825]/10 border border-[#F9A825]/20 rounded-2xl">
              <div className="flex items-start gap-3">
                <Info className="text-[#F9A825] shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-bold text-slate-800">Camera is active!</p>
                  <ol className="mt-1 space-y-1 text-xs font-medium text-slate-600">
                    <li className="flex items-center gap-2">1. Point camera at lecturer's screen</li>
                    <li className="flex items-center gap-2">2. Ensure lighting is sufficient</li>
                    <li className="flex items-center gap-2">3. Keep phone steady for 1 second</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Scanner Viewport */}
          <div className="relative rounded-[24px] overflow-hidden bg-slate-900 aspect-square shadow-inner group">
            <QRScanner
              onScan={handleScan}
              onError={(msg) => setError(msg)}
              isActive={isScanning}
            />
            
            {/* Liquid Overlay when not scanning */}
            {!isScanning && !scanResult && !isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/60 backdrop-blur-sm">
                <Camera className="mb-3 opacity-50" size={48} />
                <p className="text-sm font-semibold opacity-70">Camera paused</p>
              </div>
            )}

            {/* Scanning Animation */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-1 bg-[#006838] absolute top-0 shadow-[0_0_15px_#006838] animate-scan-line" />
              </div>
            )}
          </div>

          {/* Dynamic Feedback States */}
          <div className="space-y-4">
            {error && (
              <div className="flex items-center gap-3 p-4 border border-red-100 bg-red-50 rounded-2xl animate-in zoom-in-95">
                <XCircle className="text-red-600 shrink-0" size={24} />
                <p className="text-sm font-semibold leading-tight text-red-900">{error}</p>
              </div>
            )}

            {scanResult && !error && (
              <div className="flex items-center gap-3 p-4 bg-[#006838]/10 border border-[#006838]/20 rounded-2xl animate-in slide-in-from-bottom-2">
                <div className="w-10 h-10 bg-[#006838] rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Success!</p>
                  <p className="text-xs font-medium text-slate-600">Attendance data transmitted to portal.</p>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center gap-3 py-6">
                <Loader2 className="animate-spin text-[#006838]" size={32} />
                <span className="text-sm font-bold tracking-wide uppercase text-slate-500">Validating Session...</span>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col gap-3">
            {!scanResult && !isProcessing && (
              <button
                onClick={() => setIsScanning(!isScanning)}
                className={`w-full py-4 rounded-[20px] font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                  isScanning 
                    ? 'bg-slate-100 text-slate-600 shadow-slate-100/20' 
                    : 'bg-[#006838] text-white shadow-[#006838]/20'
                }`}
              >
                {isScanning ? <CameraOff size={20} /> : <Camera size={20} />}
                {isScanning ? 'Pause Scanning' : 'Resume Scanning'}
              </button>
            )}

            {(scanResult || error) && (
              <button
                onClick={resetScanner}
                className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-[20px] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm"
              >
                <RefreshCcw size={20} />
                Scan Again
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full py-3 text-sm font-bold transition-colors text-slate-400 hover:text-slate-600"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom Keyframe for scanning line (Add to your global CSS or Tailwind config) */}
      <style>{`
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>
    </div>
  );
}