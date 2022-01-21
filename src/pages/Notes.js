import { Container }
  from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import NoteCard from '../component/note-card/NoteCard.component'
import Masonry from 'react-masonry-css'
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const url = 'http://localhost:8000/notes'

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    const headerOption = {
      method: 'DELETE',

    }
    await fetch(url + '/' + id, headerOption)
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes);
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container maxWidth="xl">
      <h3>Notes page</h3>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {
          notes.map(note => (
            <div key={note.id}>
              <NoteCard note={note} removeNote={handleDelete} />
            </div>
          ))
        }
      </Masonry>
    </Container>
  )
}
