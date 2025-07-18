"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawMesh, drawMediaPipeLandmarks } from "../../../utilities";
import { loadFaceLandmarksDetection, loadMediaPipeFaceLandmarker } from "../../../util";
import { FaceLandmarker } from "@mediapipe/tasks-vision";

interface FaceScanProps {
  onConfirm: (image: string) => void;
  showInstructions?: boolean;
}

export default function FaceScan({
  onConfirm,
  showInstructions = true,
}: FaceScanProps) {
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
    <div style={styles.container}>
      <div style={styles.content}>
        
        {/* Title */}
        <h1 style={styles.title}>
          Face Verification
        </h1>

        {/* Face Scan Area */}
        <div style={styles.scanArea}>
          <div style={styles.cameraContainer}>
            <Webcam
              ref={faceRef}
              autoPlay
              playsInline
              style={styles.webcam}
            />
            
            {/* Face mesh overlay */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              style={styles.canvas}
            />
            
            {/* Hidden canvas for capture */}
            <canvas
              ref={hiddenCanvasRef}
              width={320}
              height={320}
              style={styles.hiddenCanvas}
            />
          </div>

          {/* Progress Ring */}
          <svg
            width={280}
            height={280}
            style={styles.progressSvg}
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
          <div style={styles.statusIndicator}>
            <div style={styles.statusBadge}>
              <div style={styles.statusContainer}>
                <div style={styles.statusDot} />
                <span style={styles.statusText}>{getScanStatus()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <div style={styles.progressContainer}>
          <div style={styles.progressPercentage}>{scanning}%</div>
          {isComplete && (
            <div style={styles.processingText}>Processing image...</div>
          )}
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div style={styles.instructionsContainer}>
            <div style={styles.instructionsCard}>
              <h3 style={styles.instructionsTitle}>
                Face Scan Instructions
              </h3>
              <div style={styles.instructionsList}>
                <div style={styles.instructionItem}>
                  <div style={styles.instructionNumber}>1</div>
                  <p style={styles.instructionText}>Look directly at the camera</p>
                </div>
                <div style={styles.instructionItem}>
                  <div style={styles.instructionNumber}>2</div>
                  <p style={styles.instructionText}>Ensure good lighting on your face</p>
                </div>
                <div style={styles.instructionItem}>
                  <div style={styles.instructionNumber}>3</div>
                  <p style={styles.instructionText}>Keep your face centered in the circle</p>
                </div>
                <div style={styles.instructionItem}>
                  <div style={styles.instructionNumber}>4</div>
                  <p style={styles.instructionText}>Remove glasses if possible</p>
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

const styles = {
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