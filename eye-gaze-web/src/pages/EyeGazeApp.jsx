import { useRef, useEffect, useState } from "react";
import { FaceMesh, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";

// ---- EAR Calculation ----
function euclideanDist(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
}

function getEAR(landmarks, eyeLandmarks) {
  const p1 = landmarks[eyeLandmarks[0]];
  const p2 = landmarks[eyeLandmarks[1]];
  const p3 = landmarks[eyeLandmarks[2]];
  const p4 = landmarks[eyeLandmarks[3]];
  const p5 = landmarks[eyeLandmarks[4]];
  const p6 = landmarks[eyeLandmarks[5]];

  const vertical1 = euclideanDist(p2, p6);
  const vertical2 = euclideanDist(p3, p5);
  const horizontal = euclideanDist(p1, p4);

  return (vertical1 + vertical2) / (2.0 * horizontal);
}

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [blinkCount, setBlinkCount] = useState(0);
  const [blinkStatus, setBlinkStatus] = useState("Open 👁️");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    let blinkFrame = 0;

    faceMesh.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Draw video frame onto canvas
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.multiFaceLandmarks) {
        setIsActive(true);
        for (const landmarks of results.multiFaceLandmarks) {
          // Draw eyes
          drawingUtils.drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
            color: "cyan",
          });
          drawingUtils.drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
            color: "lime",
          });

          // ---- Blink Detection ----
          const leftEAR = getEAR(landmarks, [33, 160, 158, 133, 153, 144]); // left eye
          const rightEAR = getEAR(landmarks, [362, 385, 387, 263, 373, 380]); // right eye
          const avgEAR = (leftEAR + rightEAR) / 2.0;

          const EAR_THRESHOLD = 0.23;

          if (avgEAR < EAR_THRESHOLD) {
            blinkFrame++;
            if (blinkFrame === 3) {
              setBlinkCount((prev) => prev + 1);
              setBlinkStatus("Close 👀");
            }
          } else {
            blinkFrame = 0;
            setBlinkStatus("Open 👁️");
          }
        }
      } else {
        setIsActive(false);
      }
    });

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'} border-2 border-white shadow-sm`}></div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Eye Tracking System
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isActive ? "🟢 Face detected - System active" : "🔴 Looking for face..."}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Advanced real-time eye behavior analysis using AI-powered computer vision
        </p>
      </div>

      {/* Main Dashboard */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
        {/* Status Cards Row */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blink Counter */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Blink Counter</h2>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Live</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-2">
                    {blinkCount}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Total Blinks Detected</div>
                </div>
              </div>
            </div>

            {/* Eye Status */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Eye Status</h2>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${blinkStatus.includes('Close') ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {blinkStatus}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Current State</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Feed Section */}
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Live Camera Feed</h3>
              <p className="text-sm text-gray-500">Real-time facial landmark detection and eye tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Eye Mesh: Active
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                640x480
              </div>
            </div>
          </div>

          {/* Enhanced Video Container */}
          <div className="relative group">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200/50">
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-10"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg z-10"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg z-10"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg z-10"></div>

              {/* Status Overlay */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${isActive ? 'bg-green-500/20 text-green-100 border border-green-400/30' : 'bg-red-500/20 text-red-100 border border-red-400/30'}`}>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400 animate-pulse'}`}></div>
                  {isActive ? 'Face Tracking Active' : 'Initializing Camera...'}
                </div>
              </div>

              {/* Hidden Video Element */}
              <video
                ref={webcamRef}
                className="hidden"
                autoPlay
                muted
                playsInline
              />

              {/* Main Canvas */}
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay with Info */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center transform scale-95 group-hover:scale-100 transition-transform duration-300">
                  <div className="text-gray-800 font-semibold mb-2">AI-Powered Eye Tracking</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• MediaPipe Face Mesh Detection</div>
                    <div>• Real-time EAR Calculation</div>
                    <div>• Advanced Blink Recognition</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Detection</div>
                <div className="text-sm font-semibold text-gray-800">Face Mesh</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Algorithm</div>
                <div className="text-sm font-semibold text-gray-800">EAR-based</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Threshold</div>
                <div className="text-sm font-semibold text-gray-800">0.23</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Landmarks</div>
                <div className="text-sm font-semibold text-gray-800">468 Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm font-semibold text-gray-800 mb-1">
                Advanced Eye Tracking Technology
              </div>
              <div className="text-xs text-gray-500">
                Powered by MediaPipe ML • Real-time computer vision • EAR algorithm implementation
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                ML Model Loaded
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Camera Active
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                Processing: 30 FPS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;