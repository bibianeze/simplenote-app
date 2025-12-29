import { useState } from "react"
import type { Note } from "../types/note"

const API_URL = "http://localhost:4000/notes"

const NoteList = ({
  notes,
  onChange,
}: {
  notes: Note[]
  onChange: () => void
}) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  // DELETE
  const deleteNote = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    onChange()
  }

  // START EDIT
  const startEdit = (note: Note) => {
    setEditingId(note._id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  // SAVE EDIT
  const saveEdit = async (id: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
      }),
    })

    setEditingId(null)
    onChange()
  }

  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note._id}
          className="border rounded p-3 bg-gray-50"
        >
          {editingId === note._id ? (
            //  EDIT MODE
            <div className="space-y-2">
              <input
                className="w-full border rounded px-3 py-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="w-full border rounded px-3 py-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(note._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // 👀 VIEW MODE
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-600">{note.content}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(note)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default NoteList
