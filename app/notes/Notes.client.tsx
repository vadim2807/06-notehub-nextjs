'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';
import Modal from '../../components/Modal/Modal';
import { fetchNotes } from '../../lib/api';
import css from './Notes.module.css';

export default function NotesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchTerm],
    queryFn: () => fetchNotes({
      page: currentPage,
      perPage: 12,
      search: debouncedSearchTerm,
    }),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value={searchTerm}
          onChange={setSearchTerm}
        />
        
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        
        <button 
          className={css.button}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create note +'}
        </button>
      </header>
      
      <div style={{ padding: '10px 0' }}>
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Loading notes...</p>
          </div>
        )}
        
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px'
          }}>
            Error loading notes: {(error as Error).message}
          </div>
        )}

        {showCreateForm && (
          <Modal onClose={() => setShowCreateForm(false)}>
            <NoteForm onCancel={() => setShowCreateForm(false)} />
          </Modal>
        )}

        {notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {notes.length === 0 && !isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#6c757d',
            fontSize: '18px'
          }}>
            {searchTerm ? `No notes found for "${searchTerm}"` : 'No notes yet. Create your first note!'}
          </div>
        )}
      </div>
    </div>
  );
}
