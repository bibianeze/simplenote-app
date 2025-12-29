import { useState } from "react"

const API_URL = "http://localhost:4000/notes"

const NoteForm = ({ onAdd }: { onAdd: () => void }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const submit = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })

    setTitle("")
    setContent("")
    onAdd()
  }

  return (
    <div className="mb-6 space-y-3">
      <input  className="w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea  className="w-full border rounded px-3 py-2" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={submit}>Add Note</button>
    </div>
  )
}

export default NoteForm
