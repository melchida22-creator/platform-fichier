import FileUpload from '@/components/FileUpload';

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Partager un fichier</h1>
      <FileUpload />
    </main>
  );
}
