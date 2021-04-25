import React, { useState, useEffect } from 'react'

import noteService from '@services/notes'
import './styles.scss'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [showEmpty, setShowEmpty] = useState(false)

  useEffect(() => {
    const eventHandler = (initialNotes) => {
      setNotes(initialNotes)
    }

    noteService
      .getAll()
      .then(eventHandler)
      .catch(err => console.error('Error =>', err))
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    if (newNote !== '') {
      noteService
        .create(noteObject)
        .then(newData => setNotes(notes.concat(newData)))
      setShowEmpty(false)
    } else {
      setShowEmpty(true)
    }

    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleImportance = (id) => {
    const note = notes.find(n => n.id === id)

    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((newData) => {
        setNotes(notes.map(note => (note.id !== id ? note : newData)))
      })
      .catch(err => console.error(`error while updating importance of id ${id} => ${err}`))
  }

  const handleDelete = (id) => {
    const note = notes.find(n => n.id === id)

    const deletedNote = { ...note, deleted: true }

    noteService
      .update(id, deletedNote)
      .then((newData) => {
        setNotes(notes.map(note => (note.id !== id ? note : newData)))
      })
      .catch(err => console.error(`error deleting note with id ${id} => ${err}`))
  }

  return (
    <>
      <div className='part-tag'>
        <h2>Notes</h2>
      </div>

      <div className='notes'>
        <button type='button' onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>

        <ul>
          {notesToShow.map(note => (
            <li key={note.id}>
              {note.important ? <span className='note-important' /> : null}

              <p>{note.content}</p>

              <button type='button' onClick={() => handleImportance(note.id)}>
                {note.important ? 'Not important' : 'Make important'}
              </button>

              <button type='button' className='note-delete' onClick={() => handleDelete(note.id)}>X</button>
            </li>
          ))}
        </ul>

        <form onSubmit={addNote}>
          <input
            type='text'
            value={newNote}
            onChange={handleNoteChange}
            placeholder='New note'
          />
          <button type='submit'>Save</button>
        </form>

        {
          showEmpty === true
            ? <div className='notes-empty danger'>The input field is empty</div>
            : ''
        }
      </div>
    </>
  )
}

export default Notes
