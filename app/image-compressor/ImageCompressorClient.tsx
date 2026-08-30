"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";

export default function ImageCompressorClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string>("");
  const [quality, setQuality] = useState<number>(80); // in percent
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    trackToolUsage({ toolName: "Image Compressor", action: "tool_view" });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedDataUrl("");
      setCompressedSize(0);
      
      trackToolUsage({
        toolName: "Image Compressor",
        action: "image_uploaded",
        metadata: { size: file.size, type: file.type }
      });
    }
  };

  // Compression engine triggered by selected file or quality adjustments
  useEffect(() => {
    if (!selectedFile) return;

    const compress = async () => {
      setIsCompressing(true);
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                // Keep max width/height to prevent massive canvas memories
                const maxDim = 1920;
                let width = img.width;
                let height = img.height;

                if (width > maxDim || height > maxDim) {
                  if (width > height) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                  } else {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                  }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                // Export to jpeg blob with quality
                const qRatio = quality / 100;
                canvas.toBlob(
                  (blob) => {
                    if (blob) {
                      setCompressedSize(blob.size);
                      const compressedUrl = URL.createObjectURL(blob);
                      setCompressedDataUrl(compressedUrl);
                    }
                    setIsCompressing(false);
                  },
                  "image/jpeg",
                  qRatio
                );
              }
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
      } catch (err) {
        console.error("Compression failed:", err);
        setIsCompressing(false);
      }
    };

    compress();
  }, [selectedFile, quality]);

  const handleDownload = () => {
    if (!compressedDataUrl || !selectedFile) return;

    const link = document.createElement("a");
    link.href = compressedDataUrl;
    // convert original name to jpeg extension since canvas converts to jpeg
    const origName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
    link.download = `${origName}_compressed.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    trackToolUsage({
      toolName: "Image Compressor",
      action: "download_compressed",
      metadata: { originalSize, compressedSize, quality }
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressedDataUrl("");
    setQuality(80);
    trackToolUsage({ toolName: "Image Compressor", action: "tool_reset" });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joydigital.in" },
      { "@type": "ListItem", "position": 2, "name": "Image Compressor", "item": "https://joydigital.in/image-compressor" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
            <span className="text-[#1F1B2D]" aria-current="page">Image Compressor</span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl font-black text-[#1F1B2D] mb-3">Client-Side Image Compressor</h1>
            <p className="text-xs sm:text-sm text-[#6B6478] font-semibold leading-relaxed">
              Compress PNG, JPEG, and WebP images quickly inside your browser without uploading to external servers. Maximize speed optimization.
            </p>
          </div>

          <div className="bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col gap-6">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#10b981]" />

            {/* Hidden elements for processing */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {!selectedFile ? (
              <div className="border-2 border-dashed border-[#E9E4F2] hover:border-[#10b981] rounded-2xl py-16 px-6 text-center cursor-pointer transition-colors bg-[#FAF9FF] relative group">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#10b981] text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-cloud-arrow-up" />
                </div>
                <h3 className="text-sm font-extrabold text-[#1F1B2D] mb-1">Drag & drop or Click to upload</h3>
                <p className="text-[10px] text-[#6B6478] font-semibold">Supports PNG, JPG, or WebP up to 15MB</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 text-left">
                
                {/* File info details bar */}
                <div className="flex justify-between items-center bg-[#FAF9FF] p-4 rounded-xl border border-[#E9E4F2]">
                  <div className="truncate max-w-[65%]">
                    <span className="text-[10px] font-black text-[#A7A2B2] uppercase block">File Name</span>
                    <span className="text-xs font-bold text-[#1F1B2D] truncate block">{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                  >
                    Remove File
                  </button>
                </div>

                {/* Slider bar Quality control */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="quality-slider" className="text-xs font-black text-[#1F1B2D] uppercase tracking-wider block">Compression Quality</label>
                    <span className="text-xs font-black text-[#10b981]">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    id="quality-slider"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                  />
                  <p className="text-[9px] text-[#A7A2B2] font-semibold italic mt-0.5">Lower quality decreases size further but can add visual noise.</p>
                </div>

                {/* Compare stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-2">
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl">
                    <span className="text-[8px] font-black text-[#A7A2B2] uppercase tracking-wider block mb-1">Original Size</span>
                    <span className="text-base font-black text-[#1F1B2D]">{formatSize(originalSize)}</span>
                  </div>
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl">
                    <span className="text-[8px] font-black text-[#A7A2B2] uppercase tracking-wider block mb-1">Compressed Size</span>
                    <span className="text-base font-black text-[#1F1B2D]">
                      {isCompressing ? "Calculating..." : formatSize(compressedSize)}
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <span className="text-[8px] font-black text-emerald-800 uppercase tracking-wider block mb-1">Space Savings</span>
                    <span className="text-base font-black text-emerald-600">
                      {isCompressing ? "..." : originalSize && compressedSize ? `${(((originalSize - compressedSize) / originalSize) * 100).toFixed(0)}% smaller` : "0%"}
                    </span>
                  </div>
                </div>

                {/* Download compressed CTA button */}
                <button
                  onClick={handleDownload}
                  disabled={!compressedDataUrl || isCompressing}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs py-4 rounded-xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCompressing ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin" /> Compressing Graphics...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-download" /> Download Compressed Image
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Developer Speed Pitch CTA Card */}
            <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-6 rounded-2xl mt-4 relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 h-full w-1 bg-[#10b981]" />
              <h3 className="text-xs font-black text-[#1F1B2D] mb-1">Images Optimized but Website Still Slow?</h3>
              <p className="text-[10px] text-[#6B6478] font-bold leading-relaxed mb-4">
                Bloated builders (like Elementor or Divi) can keep your loading speeds high despite tiny image files. We design custom web systems in Next.js & React engineered to compile into lightweight code, loading under 1.5 seconds.
              </p>
              <a
                href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20used%20your%20Image%20Compressor%20tool%20and%20I'd%20like%20to%20get%20a%20speed/code%20optimization%20quote%20for%20our%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[10px] py-2.5 px-4.5 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-xs animate-pulse" /> Talk to a Speed Expert
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
