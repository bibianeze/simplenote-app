import type { Note } from "../types/note"

const API_URL = "http://localhost:4000/notes"

const NoteList = ({ notes, onChange }: { notes: Note[], onChange: () => void }) => {
  const deleteNote = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    onChange()
  }

  return (
    <ul className="space-y-3">
      {notes.map(note => (
        <li key={note.id} className="border rounded p-3 flex justify-between items-start">
            <div>
        <h3 className="font-semibold">{note.title}</h3>
        <p className="text-sm text-gray-600">{note.content}</p>
      </div>
          <button 
        className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteNote(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
