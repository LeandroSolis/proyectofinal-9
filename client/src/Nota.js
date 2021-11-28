const Nota = props => {
  const { title, text, id, deleteNote, updateNote } = props;
  return (
    <div class="card">
      <div className="nota">
        <h2 class="card-header">{title}</h2>
        <p class="p-3">{text}</p>
        <button type="button" class="btn btn-danger" onClick={() => deleteNote(id)}>Borrar</button>
        <button type="button" class="btn btn-dark" onClick={() => updateNote(id)}>Editar</button>
      </div >
    </div>

  );
};

export default Nota;
