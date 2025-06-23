import { useState, useEffect } from 'react';
import { getStudents, createStudent } from './api/students';
import StudentCard from './components/StudentCard';

function App() {
  const [students, setStudents] = useState([]);
  const [listError, setListError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para los campos del nuevo estudiante
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    carrera: '',
    foto: ''
  });

  // Carga inicial de estudiantes
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data);
      setListError(null);
    } catch (err) {
      setListError('No se pudieron cargar los estudiantes. Revisa la conexión con la API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Manejador para cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.age || !newStudent.carrera) {
      setFormError('Nombre, edad y carrera son campos obligatorios.');
      return;
    }

    try {
      setFormError(null);
      const studentData = {
        ...newStudent,
        age: parseInt(newStudent.age) // Asegurarse de que la edad es un número
      };
      const response = await createStudent(studentData);
      
      // Agrega el nuevo estudiante a la lista y limpia el formulario
      setStudents([...students, response.data]);
      setNewStudent({ name: '', age: '', carrera: '', foto: '' });

    } catch (err) {
      setFormError('No se pudo crear el estudiante.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Lista de Estudiantes</h1>
        <p>Una demostración con datos de ejemplo y conexión a base de datos.</p>
      </header>
      
      <main>
        {loading && <p>Cargando estudiantes...</p>}
        {listError && <p className="error-message">{listError}</p>}
        
        {!loading && !listError && (
          <div className="cards-container">
            {students.length > 0 ? (
              students.map((student) => (
                <StudentCard key={student._id || student.id} student={student} />
              ))
            ) : (
              <p>No hay estudiantes para mostrar.</p>
            )}
          </div>
        )}

        {/* Formulario */}
        <div className="form-container">
          <h2>Agregar Nuevo Estudiante</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Edad"
              value={newStudent.age}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="carrera"
              placeholder="Carrera"
              value={newStudent.carrera}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="foto"
              placeholder="URL de la foto (opcional)"
              value={newStudent.foto}
              onChange={handleInputChange}
            />
            <button type="submit">Agregar Estudiante</button>
          </form>
          {formError && <p className="error-message form-error">{formError}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;





/*import { useState, useEffect } from "react";
import { getStudents } from "./api/students";
import StudentCard from "./components/StudentCard";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudents();
        setStudents(response.data);
        setError(null);
      } catch (err) {
        setError(
          "No se pudieron cargar los estudiantes. Revisa la conexión con la API."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Estudiantes</h1>
        <p>Una demostración con datos de ejemplo y conexión a base de datos.</p>
      </header>

      <main>
        {loading && <p>Cargando estudiantes...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="cards-container">
            {students.length > 0 ? (
              students.map((student) => (
                <StudentCard
                  key={student._id || student.id}
                  student={student}
                />
              ))
            ) : (
              <p>No hay estudiantes para mostrar.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;*/
