"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File as FileIcon, X } from "lucide-react";

interface UploadResult {
  success: boolean;
  message: string;
  fileName: string;
  resourceId: string;
  embeddingsCount: number;
}

export function UploadDocuments() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter((file) =>
      file.name.toLowerCase().endsWith(".md"),
    );
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one markdown file");
      return;
    }

    setUploading(true);
    setResults([]);

    try {
      const newResults: UploadResult[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to upload file");
        }

        const result = await response.json();
        newResults.push(result);

        toast.success(
          `Successfully processed ${file.name} (${result.embeddingsCount} embeddings generated)`,
        );
      }

      setResults(newResults);
      setFiles([]);
      router.refresh();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload files",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="files">Upload Markdown Files</Label>
          <Input
            id="files"
            type="file"
            accept=".md"
            multiple
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files</Label>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div className="flex items-center gap-2">
                    <FileIcon className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <Label>Processing Results</Label>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="p-2 border rounded bg-muted">
                  <p>✓ {result.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated {result.embeddingsCount} embeddings (Resource ID:{" "}
                    {result.resourceId})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className="w-full"
        >
          {uploading ? (
            "Processing..."
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Process Files
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
