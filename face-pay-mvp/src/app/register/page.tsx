// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Register() {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleFaceScan = () => {
//     setLoading(true)
//     setTimeout(() => {
//       setLoading(false)
//       setStep(2)
//     }, 2000)
//   }

//   const handleKYC = () => {
//     setLoading(true)
//     setTimeout(() => {
//       setLoading(false)
//       setStep(3)
//     }, 2000)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setTimeout(() => {
//       // Store data in memory instead of localStorage for artifacts
//       setStep(4) // Success step
//     }, 1000)
//   }

//   return (
//     <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
//       {/* Header */}
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         padding: '20px 16px', 
//         backgroundColor: '#fff',
//         borderBottom: '1px solid #e0e0e0'
//       }}>
//         <button 
//           onClick={() => router.back()} 
//           style={{ 
//             background: 'none', 
//             border: 'none', 
//             color: '#000000', 
//             fontSize: '16px', 
//             cursor: 'pointer',
//             padding: '8px'
//           }}
//         >
//           ← Back
//         </button>
//         <h1 style={{ 
//           fontSize: '18px', 
//           fontWeight: '600',
//           color: '#000000',
//           margin: 0
//         }}>
//           Register
//         </h1>
//         <div style={{ width: '60px' }}></div>
//       </div>

//       {/* Step 1: Face Verification */}
//       {step === 1 && (
//         <div style={{ padding: '24px 16px' }}>
//           <h2 style={{ 
//             marginBottom: '8px', 
//             textAlign: 'center',
//             color: '#000000',
//             fontSize: '24px',
//             fontWeight: '600'
//           }}>
//             Face Verification
//           </h2>
//           <p style={{ 
//             textAlign: 'center',
//             color: '#666',
//             marginBottom: '32px',
//             fontSize: '16px'
//           }}>
//             Secure your account with facial recognition
//           </p>
          
//           <div style={{ 
//             backgroundColor: '#000000', 
//             borderRadius: '16px', 
//             padding: '48px 24px', 
//             textAlign: 'center',
//             color: '#fff',
//             margin: '0 auto',
//             maxWidth: '400px'
//           }}>
//             <div style={{ 
//               fontSize: '64px', 
//               marginBottom: '24px',
//               opacity: loading ? 0.5 : 1
//             }}>
//               📷
//             </div>
//             <h3 style={{ 
//               marginBottom: '16px',
//               fontSize: '18px',
//               fontWeight: '600'
//             }}>
//               Position Your Face
//             </h3>
//             <p style={{ 
//               marginBottom: '32px', 
//               color: '#ccc',
//               fontSize: '14px',
//               lineHeight: '1.4'
//             }}>
//               Please position your face in the center of the camera for verification
//             </p>
//             {loading ? (
//               <div style={{ 
//                 color: '#ccc',
//                 fontSize: '16px'
//               }}>
//                 Scanning...
//               </div>
//             ) : (
//               <button 
//                 onClick={handleFaceScan} 
//                 style={{ 
//                   backgroundColor: '#fff', 
//                   color: '#000000', 
//                   padding: '14px 32px', 
//                   borderRadius: '12px', 
//                   border: 'none', 
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
//               >
//                 Start Face Scan
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Step 2: Identity Verification */}
//       {step === 2 && (
//         <div style={{ padding: '24px 16px' }}>
//           <h2 style={{ 
//             marginBottom: '8px', 
//             textAlign: 'center',
//             color: '#000000',
//             fontSize: '24px',
//             fontWeight: '600'
//           }}>
//             Identity Verification
//           </h2>
//           <p style={{ 
//             textAlign: 'center',
//             color: '#666',
//             marginBottom: '32px',
//             fontSize: '16px'
//           }}>
//             Verify your identity with your IC
//           </p>
          
//           <div style={{ 
//             backgroundColor: '#000000', 
//             borderRadius: '16px', 
//             padding: '48px 24px', 
//             textAlign: 'center',
//             color: '#fff',
//             margin: '0 auto',
//             maxWidth: '400px'
//           }}>
//             <div style={{ 
//               fontSize: '64px', 
//               marginBottom: '24px',
//               opacity: loading ? 0.5 : 1
//             }}>
//               🆔
//             </div>
//             <h3 style={{ 
//               marginBottom: '16px',
//               fontSize: '18px',
//               fontWeight: '600'
//             }}>
//               Scan Your IC
//             </h3>
//             <p style={{ 
//               marginBottom: '32px', 
//               color: '#ccc',
//               fontSize: '14px',
//               lineHeight: '1.4'
//             }}>
//               Please scan your Identity Card (IC) for verification
//             </p>
//             {loading ? (
//               <div style={{ 
//                 color: '#ccc',
//                 fontSize: '16px'
//               }}>
//                 Scanning...
//               </div>
//             ) : (
//               <button 
//                 onClick={handleKYC} 
//                 style={{ 
//                   backgroundColor: '#fff', 
//                   color: '#000000', 
//                   padding: '14px 32px', 
//                   borderRadius: '12px', 
//                   border: 'none', 
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
//               >
//                 Scan IC
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Step 3: Complete Registration */}
//       {step === 3 && (
//         <div style={{ padding: '24px 16px' }}>
//           <h2 style={{ 
//             marginBottom: '8px', 
//             textAlign: 'center',
//             color: '#000000',
//             fontSize: '24px',
//             fontWeight: '600'
//           }}>
//             Complete Registration
//           </h2>
//           <p style={{ 
//             textAlign: 'center',
//             color: '#666',
//             marginBottom: '32px',
//             fontSize: '16px'
//           }}>
//             Fill in your details to complete setup
//           </p>
          
//           <div style={{ 
//             backgroundColor: '#fff', 
//             borderRadius: '16px', 
//             padding: '24px', 
//             margin: '0 auto',
//             maxWidth: '400px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//           }}>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px',
//                   color: '#000000',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}>
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                   style={{ 
//                     width: '100%', 
//                     padding: '14px', 
//                     borderRadius: '12px', 
//                     border: '1px solid #e0e0e0', 
//                     backgroundColor: '#f9f9f9', 
//                     color: '#000000',
//                     fontSize: '16px',
//                     boxSizing: 'border-box'
//                   }}
//                 />
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px',
//                   color: '#000000',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}>
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                   style={{ 
//                     width: '100%', 
//                     padding: '14px', 
//                     borderRadius: '12px', 
//                     border: '1px solid #e0e0e0', 
//                     backgroundColor: '#f9f9f9', 
//                     color: '#000000',
//                     fontSize: '16px',
//                     boxSizing: 'border-box'
//                   }}
//                 />
//               </div>
              
//               <div style={{ marginBottom: '24px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px',
//                   color: '#000000',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}>
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   required
//                   style={{ 
//                     width: '100%', 
//                     padding: '14px', 
//                     borderRadius: '12px', 
//                     border: '1px solid #e0e0e0', 
//                     backgroundColor: '#f9f9f9', 
//                     color: '#000000',
//                     fontSize: '16px',
//                     boxSizing: 'border-box'
//                   }}
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{ 
//                   backgroundColor: '#000000', 
//                   color: '#fff', 
//                   padding: '16px 24px', 
//                   borderRadius: '12px', 
//                   border: 'none', 
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   width: '100%',
//                   opacity: loading ? 0.7 : 1,
//                   transition: 'all 0.2s ease'
//                 }}
//               >
//                 {loading ? 'Creating Account...' : 'Complete Registration'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Step 4: Success */}
//       {step === 4 && (
//         <div style={{ padding: '24px 16px' }}>
//           <div style={{ 
//             textAlign: 'center',
//             margin: '0 auto',
//             maxWidth: '400px',
//             padding: '48px 24px'
//           }}>
//             <div style={{ 
//               fontSize: '64px', 
//               marginBottom: '24px'
//             }}>
//               ✅
//             </div>
//             <h2 style={{ 
//               marginBottom: '16px',
//               color: '#000000',
//               fontSize: '24px',
//               fontWeight: '600'
//             }}>
//               Registration Complete!
//             </h2>
//             <p style={{ 
//               color: '#666',
//               marginBottom: '32px',
//               fontSize: '16px'
//             }}>
//               Your account has been successfully created
//             </p>
//             <button 
//               onClick={() => router.push('/add-payment')}
//               style={{ 
//                 backgroundColor: '#000000', 
//                 color: '#fff', 
//                 padding: '16px 32px', 
//                 borderRadius: '12px', 
//                 border: 'none', 
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer'
//               }}
//             >
//               Continue to Payment Setup
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Webcam from "react-webcam";
import { drawMesh, drawMediaPipeLandmarks } from "../../../utilities";
import { loadFaceLandmarksDetection, loadMediaPipeFaceLandmarker } from "../../../util";
import { FaceLandmarker } from "@mediapipe/tasks-vision";
import { useEffect } from 'react';
import IdScan from '../../components/onboarding/IdScan';


// FaceScan Component
interface FaceScanProps {
  onConfirm: (image: string) => void;
  showInstructions?: boolean;
}


function FaceScan({ onConfirm, showInstructions = true }: FaceScanProps) {
  const faceRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const lastVideoTimeRef = useRef(-1);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load MediaPipe Face Landmarker
        const faceLandmarker = await loadMediaPipeFaceLandmarker();
        faceLandmarkerRef.current = faceLandmarker;

        // Start detection interval
        intervalRef.current = setInterval(() => {
          detectMediaPipe();
          setScanning((scanning) => {
            if (scanning >= 100) {
              clearInterval(intervalRef.current!);
              setIsComplete(true);
              return 100;
            }
            return scanning + 1;
          });
        }, 10);
      } catch (error) {
        console.error("Failed to load MediaPipe model, falling back to TensorFlow:", error);

        // Fallback to TensorFlow implementation
        const faceLandmarksDetection = await loadFaceLandmarksDetection();
        const detector = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          {
            runtime: "mediapipe",
            refineLandmarks: true,
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.min.js",
          }
        );
        intervalRef.current = setInterval(() => {
          detect(detector);
          setScanning((scanning) => {
            if (scanning >= 100) {
              clearInterval(intervalRef.current!);
              setIsComplete(true);
              return 100;
            }
            return scanning + 1;
          });
        }, 10);
      }
    };
    loadModel();
    return () => {
      console.log("clearing interval");
      clearInterval(intervalRef.current!);
      // Stop the camera stream on unmount
      if (
        faceRef.current &&
        faceRef.current.video &&
        faceRef.current.video.srcObject
      ) {
        const stream = faceRef.current.video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (scanning >= 100) {
      setTimeout(() => {
        captureImage();
      }, 1000);
    }
  }, [scanning]);

  const captureImage = () => {
    if (!faceRef.current || !hiddenCanvasRef.current || !canvasRef.current)
      return;

    const video = faceRef.current;
    const canvas = canvasRef.current;
    canvas!.width = video.video!.videoWidth;
    canvas!.height = video.video!.videoHeight;
    const ctx = canvas!.getContext("2d");

    if (ctx && hiddenCanvasRef.current) {
      ctx.drawImage(video.video!, 0, 0, canvas!.width, canvas!.height);
      const dataUrl = canvas!.toDataURL("image/png");
      onConfirm(dataUrl);
      console.log("captured", dataUrl);
    } else {
      console.log("ctx is null");
    }
  };

  const detect = async (net: any) => {
    if (
      faceRef.current &&
      faceRef.current.video &&
      faceRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      console.log("Running detect", canvasRef.current);
      // Get Video Properties
      const video = faceRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });
      if (canvasRef.current) {
        // Get canvas context
        const ctx = canvasRef.current.getContext("2d")!;
        requestAnimationFrame(() => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          drawMesh(face, ctx);
        });
      }
    }
  };

  const detectMediaPipe = () => {
    if (
      !faceLandmarkerRef.current ||
      !faceRef.current?.video ||
      faceRef.current.video.readyState !== 4 ||
      !canvasRef.current
    ) {
      return;
    }

    const video = faceRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Only process if video time has changed (new frame)
    if (video.currentTime === lastVideoTimeRef.current) {
      return;
    }
    lastVideoTimeRef.current = video.currentTime;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      // Detect face landmarks using MediaPipe
      const result = faceLandmarkerRef.current.detectForVideo(video, performance.now());

      // Clear canvas and draw landmarks
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (result.faceLandmarks && result.faceLandmarks.length > 0) {
          drawMediaPipeLandmarks(
            result.faceLandmarks,
            ctx,
            canvas.width,
            canvas.height
          );
        }
      });
    } catch (error) {
      console.error("MediaPipe detection error:", error);
    }
  };

  const getScanStatus = () => {
    if (scanning < 33) return "Positioning...";
    if (scanning < 66) return "Scanning...";
    if (scanning < 100) return "Almost done...";
    return "Complete!";
  };

  const getProgressColor = () => {
    if (scanning < 33) return "#ffffff";
    if (scanning < 66) return "#ffffff";
    return "#ffffff";
  };

  return (
    <div style={faceScanStyles.container}>
      <div style={faceScanStyles.content}>

        {/* Title */}
        <h1 style={faceScanStyles.title}>
          Face Verification
        </h1>

        {/* Face Scan Area */}
        <div style={faceScanStyles.scanArea}>
          <div style={faceScanStyles.cameraContainer}>
            <Webcam
              ref={faceRef}
              autoPlay
              playsInline
              style={faceScanStyles.webcam}
            />

            {/* Face mesh overlay */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              style={faceScanStyles.canvas}
            />

            {/* Hidden canvas for capture */}
            <canvas
              ref={hiddenCanvasRef}
              width={320}
              height={320}
              style={faceScanStyles.hiddenCanvas}
            />
          </div>

          {/* Progress Ring */}
          <svg
            width={280}
            height={280}
            style={faceScanStyles.progressSvg}
          >
            {/* Background circle */}
            <circle
              cx={140}
              cy={140}
              r={132}
              fill="none"
              stroke="#333"
              strokeWidth={6}
              opacity={0.3}
            />
            {/* Progress circle */}
            <circle
              cx={140}
              cy={140}
              r={132}
              fill="none"
              stroke={getProgressColor()}
              strokeWidth={6}
              strokeDasharray={2 * Math.PI * 132}
              strokeDashoffset={
                2 * Math.PI * 132 * (1 - Math.min(scanning, 100) / 100)
              }
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease",
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
              }}
            />
          </svg>

          {/* Status indicator */}
          <div style={faceScanStyles.statusIndicator}>
            <div style={faceScanStyles.statusBadge}>
              <div style={faceScanStyles.statusContainer}>
                <div style={faceScanStyles.statusDot} />
                <span style={faceScanStyles.statusText}>{getScanStatus()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <div style={faceScanStyles.progressContainer}>
          <div style={faceScanStyles.progressPercentage}>{scanning}%</div>
          {isComplete && (
            <div style={faceScanStyles.processingText}>Processing image...</div>
          )}
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div style={faceScanStyles.instructionsContainer}>
            <div style={faceScanStyles.instructionsCard}>
              <h3 style={faceScanStyles.instructionsTitle}>
                Face Scan Instructions
              </h3>
              <div style={faceScanStyles.instructionsList}>
                <div style={faceScanStyles.instructionItem}>
                  <div style={faceScanStyles.instructionNumber}>1</div>
                  <p style={faceScanStyles.instructionText}>Look directly at the camera</p>
                </div>
                <div style={faceScanStyles.instructionItem}>
                  <div style={faceScanStyles.instructionNumber}>2</div>
                  <p style={faceScanStyles.instructionText}>Ensure good lighting on your face</p>
                </div>
                <div style={faceScanStyles.instructionItem}>
                  <div style={faceScanStyles.instructionNumber}>3</div>
                  <p style={faceScanStyles.instructionText}>Keep your face centered in the circle</p>
                </div>
                <div style={faceScanStyles.instructionItem}>
                  <div style={faceScanStyles.instructionNumber}>4</div>
                  <p style={faceScanStyles.instructionText}>Remove glasses if possible</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

const faceScanStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    textAlign: 'center' as const,
    marginBottom: '32px',
    letterSpacing: '-0.025em',
    margin: '0 0 32px 0',
  },
  scanArea: {
    position: 'relative' as const,
    marginBottom: '32px',
  },
  cameraContainer: {
    position: 'relative' as const,
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#111',
    border: '3px solid #222',
  },
  webcam: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    background: '#000',
  },
  canvas: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
  },
  hiddenCanvas: {
    display: 'none',
  },
  progressSvg: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    pointerEvents: 'none' as const,
    transform: 'rotate(-90deg)',
  },
  statusIndicator: {
    position: 'absolute' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%) translateY(100%)',
    marginTop: '16px',
  },
  statusBadge: {
    backgroundColor: '#111',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #333',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    fontSize: '14px',
    fontWeight: 500,
  },
  progressContainer: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  progressPercentage: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  processingText: {
    fontSize: '14px',
    color: '#888',
  },
  instructionsContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  instructionsCard: {
    backgroundColor: '#111',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #222',
  },
  instructionsTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px',
    textAlign: 'center' as const,
    margin: '0 0 16px 0',
  },
  instructionsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  instructionNumber: {
    width: '24px',
    height: '24px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: '2px',
  },
  instructionText: {
    fontSize: '14px',
    color: '#ccc',
    margin: 0,
    lineHeight: '1.5',
  },
};

// Main Register Component
export default function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: 'LOW LIANA',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [showFaceScan, setShowFaceScan] = useState(false)
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [idImage, setIdImage] = useState<string | null>(null); // New state for ID image
  const [showIdScan, setShowIdScan] = useState(false); // New state for IdScan visibility
  const router = useRouter()

  const handleStartFaceScan = () => {
    setShowFaceScan(true)
  }

  const handleFaceScanComplete = (image: string) => {
    setFaceImage(image)
    setShowFaceScan(false)
    setLoading(true)

    // Simulate processing time
    setTimeout(() => {
      setLoading(false)
      setStep(2) // Move to Step 2: Identity Verification (IdScan)
    }, 1500)
  }

  const handleStartIdScan = () => { // New handler to start IdScan
    setShowIdScan(true);
  }

  const handleIdScanComplete = (image: string) => { // New handler for IdScan completion
    setIdImage(image);
    setShowIdScan(false);
    setLoading(true);

    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Move to Step 3: Complete Registration
    }, 2000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      // Store data in memory instead of localStorage for artifacts
      setStep(4) // Success step
    }, 1000)
  }

  // Show FaceScan component if it's active
  if (showFaceScan) {
    return <FaceScan onConfirm={handleFaceScanComplete} showInstructions={true} />
  }

  // Show IdScan component if it's active
  if (showIdScan) {
    return <IdScan onConfirm={handleIdScanComplete} idImage={idImage} />
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#000000',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          ← Back
        </button>
        <h1 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          margin: 0
        }}>
          Register
        </h1>
        <div style={{ width: '60px' }}></div>
      </div>

      {/* Step 1: Face Verification */}
      {step === 1 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{
            marginBottom: '8px',
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Face Verification
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Secure your account with facial recognition
          </p>

          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            color: '#fff',
            margin: '0 auto',
            maxWidth: '400px'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              opacity: loading ? 0.5 : 1
            }}>
              📷
            </div>
            <h3 style={{
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Position Your Face
            </h3>
            <p style={{
              marginBottom: '32px',
              color: '#ccc',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              Please position your face in the center of the camera for verification
            </p>
            {loading ? (
              <div style={{
                color: '#ccc',
                fontSize: '16px'
              }}>
                Processing facial data...
              </div>
            ) : (
              <button
                onClick={handleStartFaceScan}
                style={{
                  backgroundColor: '#fff',
                  color: '#000000',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#fff'}
              >
                Start Face Scan
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Identity Verification */}
      {step === 2 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{
            marginBottom: '8px',
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Identity Verification
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Verify your identity with your IC
          </p>

          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            color: '#fff',
            margin: '0 auto',
            maxWidth: '400px'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              opacity: loading ? 0.5 : 1
            }}>
              🆔
            </div>
            <h3 style={{
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Scan Your IC
            </h3>
            <p style={{
              marginBottom: '32px',
              color: '#ccc',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              Please scan your Identity Card (IC) for verification
            </p>
            {loading ? (
              <div style={{
                color: '#ccc',
                fontSize: '16px'
              }}>
                Scanning...
              </div>
            ) : (
              <button
                onClick={handleStartIdScan}
                style={{
                  backgroundColor: '#fff',
                  color: '#000000',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#fff'}
              >
                Scan IC
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Complete Registration */}
      {step === 3 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{
            marginBottom: '8px',
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Complete Registration
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Fill in your details to complete setup
          </p>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            margin: '0 auto',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#000000',
                  color: '#fff',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div style={{ padding: '24px 16px' }}>
          <div style={{
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '400px',
            padding: '48px 24px'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px'
            }}>
              ✅
            </div>
            <h2 style={{
              marginBottom: '16px',
              color: '#000000',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Registration Complete!
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '32px',
              fontSize: '16px'
            }}>
              Your account has been successfully created
            </p>
            <button
              onClick={() => router.push('/add-payment')}
              style={{
                backgroundColor: '#000000',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue to Payment Setup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}