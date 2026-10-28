import { FileText, FileAudio, FileVideo, FileImage, Package } from 'lucide-react';

export default function FileCard({ file }: { file: any }) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Logiciel': return <Package className="w-8 h-8 text-purple-500" />;
      case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
      case 'Audio': return <FileAudio className="w-8 h-8 text-yellow-500" />;
      case 'Vidéo': return <FileVideo className="w-8 h-8 text-blue-500" />;
      case 'Photo': return <FileImage className="w-8 h-8 text-green-500" />;
      default: return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        {getIcon(file.category)}
        <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
          {file.category}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-1 truncate">{file.title}</h3>
      <p className="text-gray-400 text-xs mb-4">Publié le {new Date(file.created_at).toLocaleDateString()}</p>
      
      <a 
        href={file.file_url} 
        target="_blank" 
        className="block w-full py-2 text-center text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        Télécharger
      </a>
    </div>
  );
}
