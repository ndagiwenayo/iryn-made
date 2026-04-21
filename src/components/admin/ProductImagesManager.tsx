"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Star, Loader2 } from "lucide-react";
import {
  addProductImage,
  deleteProductImage,
  setPrimaryProductImage,
} from "@/lib/actions/admin-settings";

type Image = {
  id: number;
  imagePath: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

type Props = {
  productId: number;
  images: Image[];
};

export default function ProductImagesManager({ productId, images }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setBusy("upload");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await r.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      const result = await addProductImage(productId, data.url);
      if (!result.success) {
        setError(result.error || "Failed to save");
        return;
      }
      router.refresh();
    } catch (e) {
      setError("Upload failed");
    } finally {
      setBusy(null);
    }
  };

  const addFromUrl = async () => {
    if (!url) return;
    setBusy("url");
    const result = await addProductImage(productId, url);
    setBusy(null);
    if (result.success) {
      setUrl("");
      router.refresh();
    } else {
      setError(result.error || "Failed");
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("Remove this image?")) return;
    setBusy(`del-${imageId}`);
    await deleteProductImage(imageId);
    setBusy(null);
    router.refresh();
  };

  const handleSetPrimary = async (imageId: number) => {
    setBusy(`pri-${imageId}`);
    await setPrimaryProductImage(imageId);
    setBusy(null);
    router.refresh();
  };

  return (
    <section className="border border-[#e7e5e0] bg-white p-6">
      <h2 className="font-editorial text-xl font-bold mb-1">Product Images</h2>
      <p className="text-xs text-[#8a8a8a] mb-5">
        Primary image shows first. Additional images appear in the gallery and on hover.
      </p>

      {/* Existing images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden">
              <img src={img.imagePath} alt="" className="w-full h-full object-cover" />
              {img.isPrimary && (
                <span className="absolute top-2 left-2 bg-[#b8953a] text-white text-[9px] font-bold px-2 py-0.5 tracking-wider">
                  PRIMARY
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    disabled={!!busy}
                    className="p-2 bg-white rounded-full hover:bg-[#b8953a] hover:text-white"
                    title="Set as primary"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  disabled={!!busy}
                  className="p-2 bg-white rounded-full hover:bg-[#c23232] hover:text-white"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new image */}
      <div className="border-t border-[#e7e5e0] pt-5 space-y-4">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
            Upload from computer
          </p>
          <label className="inline-flex items-center gap-2 border border-[#0a0a0a] px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#0a0a0a] hover:text-white transition-colors cursor-pointer">
            {busy === "upload" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Choose File
              </>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={!!busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
            Or paste URL
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            />
            <button
              type="button"
              onClick={addFromUrl}
              disabled={!url || !!busy}
              className="px-4 py-2 bg-[#0a0a0a] text-white text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8953a] disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-[#c23232]">{error}</p>}
      </div>
    </section>
  );
}
