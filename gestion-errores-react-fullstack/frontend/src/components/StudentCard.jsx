const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <img 
        src={student.foto || 'https://placehold.co/300x300/2a2a2e/ececec?text=?'} 
        alt={`Foto de ${student.name}`} 
        className="student-photo"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x300/e0e0e0/777?text=Error'; }}
      />
      <div className="student-info">
        <h3>{student.name}</h3>
        <p className="student-career">{student.carrera}</p>
        <p className="student-age">Edad: {student.age} años</p>
      </div>
    </div>
  );
};

export default StudentCard;
