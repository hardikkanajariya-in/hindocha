"use client";

import { useCallback, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImageAction } from "@/lib/actions/upload";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string, publicId?: string) => void;
  onRemove?: () => void;
  folder?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  onRemove,
  folder = "vinod-season-shop",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        const result = await uploadImageAction(formData);
        onChange(result.url, result.publicId);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  if (value) {
    return (
      <div className={`relative inline-block ${className}`}>
        <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
          <Image src={value} alt="Uploaded" fill className="object-cover" sizes="160px" />
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onRemove}
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
      } ${className}`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
        disabled={isUploading}
      />
      {isUploading ? (
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      ) : (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Drop image or click to upload
          </span>
        </>
      )}
    </div>
  );
}

interface MultiImageUploaderProps {
  images: Array<{ id?: number; url: string; publicId?: string; altText?: string }>;
  onAdd: (url: string, publicId: string) => void;
  onRemove: (index: number) => void;
  folder?: string;
}

export function MultiImageUploader({
  images,
  onAdd,
  onRemove,
  folder = "vinod-season-shop",
}: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback(
    async (files: FileList) => {
      setIsUploading(true);
      try {
        for (const file of Array.from(files)) {
          if (!file.type.startsWith("image/")) continue;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);
          const result = await uploadImageAction(formData);
          onAdd(result.url, result.publicId);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onAdd]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
              <Image src={image.url} alt={image.altText || `Image ${index + 1}`} fill className="object-cover" sizes="96px" />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(index)}
              className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleUpload(e.dataTransfer.files);
          }}
          className={`relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={isUploading}
          />
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <Upload className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
}
