namespace Academic.API.GraphQL;

public class AcademicQuery
{
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Alumno> GetStudents([Service] AcademicContext academicContext) => academicContext.Alumnos;
    
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Docente> GetTeachers([Service] AcademicContext academicContext) => academicContext.Docentes;
    
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Pago> GetPayments([Service] AcademicContext academicContext) => academicContext.Pagos;
    
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Tutor> GetTutors([Service] AcademicContext academicContext) => academicContext.Tutors;
    
    [UseProjection]
    [UseSorting]
    [UseFiltering]
    public IQueryable<Aula> GetClassrooms([Service] AcademicContext academicContext) => academicContext.Aulas;
}