"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
};

export default function ImageUpload({ value, onChange, label, aspectRatio = "aspect-square" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await r.json();
      if (data.error) {
        setError(data.error);
      } else {
        onChange(data.url);
      }
    } catch (e) {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
          {label}
        </label>
      )}
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className={`${aspectRatio} w-32 bg-[#f5f4f0] border border-[#e7e5e0] overflow-hidden relative`}>
          {value ? (
            <>
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-[#0a0a0a] hover:text-white transition-colors shadow-sm"
                aria-label="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8a8a8a] text-xs">
              No image
            </div>
          )}
        </div>

        {/* Upload + URL */}
        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="inline-flex items-center gap-2 border border-[#0a0a0a] px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#0a0a0a] hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Upload Image
              </>
            )}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <div>
            <input
              type="text"
              placeholder="Or paste image URL"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#e7e5e0] text-xs focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <p className="text-[10px] text-[#8a8a8a]">JPG/PNG/WEBP, max 8MB</p>
        </div>
      </div>
    </div>
  );
}
