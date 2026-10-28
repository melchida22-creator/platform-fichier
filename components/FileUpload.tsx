'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Autre');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert('Veuillez remplir tous les champs');

    setUploading(true);

    // 1. Upload du fichier dans le stockage Supabase
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('fichiers') // Assurez-vous que le bucket existe
      .upload(fileName, file);

    if (storageError) {
      alert(storageError.message);
      setUploading(false);
      return;
    }

    // 2. Récupérer l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from('fichiers')
      .getPublicUrl(fileName);

    // 3. Enregistrer les métadonnées dans la table 'files'
    const { error: dbError } = await supabase.from('files').insert([
      { title, category, file_url: publicUrlData.publicUrl }
    ]);

    if (dbError) {
      alert(dbError.message);
    } else {
      alert('Fichier publié avec succès !');
      setTitle('');
      setFile(null);
    }

    setUploading(false);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Publier un fichier</h2>
      <input
        type="text"
        placeholder="Titre du fichier"
        className="w-full p-2 border mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className="w-full p-2 border mb-4" onChange={(e) => setCategory(e.target.value)}>
        <option>Logiciel</option>
        <option>PDF</option>
        <option>Audio</option>
        <option>Vidéo</option>
        <option>Photo</option>
        <option>Autre</option>
      </select>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        {uploading ? 'En cours...' : 'Publier'}
      </button>
    </div>
  );
}
