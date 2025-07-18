'use client';

import { useEffect, useRef, useState } from "react";

interface IdScanProps {
  onConfirm: (image: string) => void;
  idImage: string | null;
}

export default function IdScan({ onConfirm, idImage }: IdScanProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capturedImageRef = useRef<HTMLImageElement>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [showCapturedImage, setShowCapturedImage] = useState(idImage !== null);
  const [capturedImageSrc, setCapturedImageSrc] = useState<string | null>(idImage); // Store image source
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (showCapturedImage) return;
    
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Camera access denied';
        setError(errorMessage);
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCapturedImage]);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ensure video has valid dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error('Video dimensions are not ready');
      setError('Camera not ready. Please try again.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      setError('Failed to capture image. Please try again.');
      return;
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    
    // Update state to store the captured image
    setCapturedImageSrc(dataUrl);
    setShowCapturedImage(true);
    
    // Update capturedImageRef
    if (capturedImageRef.current) {
      capturedImageRef.current.src = dataUrl;
    }
    
    // Stop the video stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const retakeImage = () => {
    setShowCapturedImage(false);
    setCapturedImageSrc(null);
  };

  const confirmImage = () => {
    if (capturedImageSrc) {
      onConfirm(capturedImageSrc);
    } else {
      console.error('No captured image to confirm');
      setError('No image captured. Please try again.');
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-content">
        {/* Title */}
        <div className="scanner-title">
          Scan your National Identity Card
        </div>

        {/* Scan Area */}
        <div className="scan-area">
          {/* Video Stream */}
          {!showCapturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="scanner-video"
              />
              {/* Overlay with ID outline */}
              <div className="scanner-overlay">
                <div className="id-outline">
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                </div>
              </div>
            </>
          )}

          {/* Captured Image */}
          {showCapturedImage && capturedImageSrc && (
            <img
              ref={capturedImageRef}
              src={capturedImageSrc}
              alt="Captured ID"
              className="captured-image"
            />
          )}

          {/* Capture Button */}
          {!showCapturedImage && !error && (
            <button
              onClick={captureImage}
              className="capture-button"
              type="button"
            >
              Capture ID Card
            </button>
          )}
        </div>

        {/* Instructions */}
        {!showCapturedImage && !error && (
          <div className="instructions">
            Align your ID card within the rectangle above
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <div className="error-text">{error}</div>
          </div>
        )}

        {/* Confirmation Area */}
        {showCapturedImage && (
          <div className="confirmation-area">
            <div className="confirmation-text">
              Is this image clear and readable?
            </div>
            <div className="confirmation-buttons">
              <button
                onClick={retakeImage}
                className="button button-secondary"
                type="button"
              >
                Retake
              </button>
              <button
                onClick={confirmImage}
                className="button button-primary"
                type="button"
              >
                Yes, looks good
              </button>
            </div>
          </div>
        )}

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden-canvas" />
      </div>

      <style jsx>{`
        .scanner-container {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        .scanner-content {
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .scanner-title {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .scan-area {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          background: #f8f8f8;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scanner-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scanner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
        }

        .id-outline {
          position: relative;
          width: 280px;
          height: 180px;
          border: 2px solid #ffffff;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
        }

        .corner-tl {
          top: -3px;
          left: -3px;
          border-right: none;
          border-bottom: none;
          border-top-left-radius: 8px;
        }

        .corner-tr {
          top: -3px;
          right: -3px;
          border-left: none;
          border-bottom: none;
          border-top-right-radius: 8px;
        }

        .corner-bl {
          bottom: -3px;
          left: -3px;
          border-right: none;
          border-top: none;
          border-bottom-left-radius: 8px;
        }

        .corner-br {
          bottom: -3px;
          right: -3px;
          border-left: none;
          border-top: none;
          border-bottom-right-radius: 8px;
        }

        .captured-image {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Changed to contain to avoid cropping */
        }

        .capture-button {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .capture-button:hover {
          background: #333333;
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .capture-button:active {
          transform: translateX(-50%) translateY(0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .instructions {
          text-align: center;
          font-size: 14px;
          color: #666666;
          line-height: 1.4;
          padding: 0 16px;
        }

        .error-message {
          background: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .error-text {
          color: #333333;
          font-size: 14px;
        }

        .confirmation-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .confirmation-text {
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }

        .confirmation-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .button {
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          min-width: 120px;
        }

        .button-secondary {
          background: #f5f5f5;
          color: #000000;
          border: 1px solid #e0e0e0;
        }

        .button-secondary:hover {
          background: #e8e8e8;
          border-color: #d0d0d0;
        }

        .button-primary {
          background: #000000;
          color: #ffffff;
        }

        .button-primary:hover {
          background: #333333;
        }

        .button:active {
          transform: translateY(1px);
        }

        .hidden-canvas {
          display: none;
        }

        @media (max-width: 480px) {
          .scanner-container {
            padding: 16px;
          }

          .scanner-title {
            font-size: 20px;
          }

          .id-outline {
            width: 240px;
            height: 150px;
          }

          .confirmation-buttons {
            flex-direction: column;
          }

          .button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}


