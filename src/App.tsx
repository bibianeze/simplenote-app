import { useEffect, useState } from "react"
import type { Note } from "./types/note"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"

const API_URL = "http://localhost:4000/notes"

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  // READ
  const fetchNotes = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setNotes(data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
     <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">
       <h1 className="text-2xl font-bold text-center mb-6">Simple Notes App</h1>
      <NoteForm onAdd={fetchNotes} />
      <NoteList notes={notes} onChange={fetchNotes} />
     </div>
    </div>
  )
}

export default App
