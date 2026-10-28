'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import FileCard from '@/components/FileCard';

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const [filter, setFilter] = useState('Tout');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchFiles() {
      let query = supabase.from('files').select('*');
      if (filter !== 'Tout') query = query.eq('category', filter);
      if (search) query = query.ilike('title', `%${search}%`);
      const { data } = await query;
      setFiles(data || []);
    }
    fetchFiles();
  }, [filter, search]);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque</h1>
      
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="border p-2 flex-grow"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
          <option>Tout</option>
          <option>Logiciel</option>
          <option>PDF</option>
          <option>Audio</option>
          <option>Vidéo</option>
          <option>Photo</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </main>
  );
}

