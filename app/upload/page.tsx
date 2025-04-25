import { UploadDocuments } from "@/components/upload/upload-documents"

export default function UploadPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Upload Markdown Documents</h1>
      <UploadDocuments />
    </div>
  )
}