//app.
import {useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota'
const App = () => {

  const[notes, setNotes] = useState([]);

  const deleteNote = id => {
    axios.delete('http://localhost:4000/api/notes/' + id)
    .then(res => {
    const notasActualizadas = notes.filter(note => id !== note._id);
    console.log(notasActualizadas);
    setNotes(notasActualizadas);
  })
  .catch(err=> console.log(err));
  };

const updateNote = id => {
  console.log(id);
  const tituloActualizado = prompt('ingrese nuevo titulo');
  const textoActualizado = prompt('ingrese nuevo texto');
  const datos ={
    title: tituloActualizado,
    text: textoActualizado
  };
  axios.put('http://localhost:4000/api/notes/' + id, datos )
  .then(res => {
    const notasActualizadas = notes.map(note => (
      note._id === id ? res.data : note
    ));
    setNotes(notasActualizadas);
  })
  .catch(err => console.log(err));
};

  useEffect(() => {
  console.log('Vamos a buscar todas las notas');
  axios.get('http://localhost:4000/api/notes')
  .then(res => {
    console.log(res.data);
    setNotes(res.data);
  });
}, []);

   const[title, setTitle] = useState('');
   const[text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('enviando formulario....');
    console.log(title, text);
    const note = {title, text};
    axios.post('http://localhost:4000/api/notes', note)
    .then(res => {
      console.log(res.data);
      setNotes([res.data, ...notes]);
      setTitle('');
      setText('');
    })
    .catch(err => console.log(err));
  };
  return(
    <div className="app">
    <div className="agregar las notas">
    <form onSubmit={handleSubmit}>
     <label>titulo</label>
     <input
    onChange={e => setTitle(e.target.value)}
     value={title}
     type="text"/>
     <label>Texto</label>
     <input
     onChange={e => setText(e.target.value)}
     value={text}
     type="text"/>
     <input type="submit" value="guardar"/>
     </form>
    </div>
    <div className="Notas">
    Lista de notas
    {notes.map(note => {
      return <Nota
      updateNote={updateNote}
      deleteNote={deleteNote}
      key={note._id}
      id={note._id}
      title={note.title} text={note.text} />

    })}
    </div>
    </div>
  );
};
export default App;
