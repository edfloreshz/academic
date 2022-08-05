using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Academic.API.Models.Kinder
{
    public partial class academicContext : DbContext
    {

        private readonly IConfiguration _configuration;
        readonly bool isDevelopment = string.Equals(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"), "development", StringComparison.InvariantCultureIgnoreCase);

        public academicContext()
        {
        }

        public academicContext(DbContextOptions<academicContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Alumno> Alumnos { get; set; }
        public virtual DbSet<AlumnoTutor> AlumnoTutors { get; set; }
        public virtual DbSet<Asistencium> Asistencia { get; set; }
        public virtual DbSet<Aula> Aulas { get; set; }
        public virtual DbSet<ConceptosDePago> ConceptosDePagos { get; set; }
        public virtual DbSet<Docente> Docentes { get; set; }
        public virtual DbSet<Pago> Pagos { get; set; }
        public virtual DbSet<Tutor> Tutors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = isDevelopment
                    ? _configuration["ConnectionStrings:DevelopmentDatabase"]
                    : _configuration["ConnectionStrings:ProductionDatabase"];
                optionsBuilder.UseMySQL(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alumno>(entity =>
            {
                entity.HasKey(e => e.IdAlumno)
                    .HasName("PRIMARY");

                entity.ToTable("alumno");

                entity.HasIndex(e => e.Aula, "alumno_aula_fk");

                entity.Property(e => e.IdAlumno).HasColumnName("idAlumno");

                entity.Property(e => e.Activo).HasColumnName("activo");

                entity.Property(e => e.ApellidoMaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoMaterno");

                entity.Property(e => e.ApellidoPaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoPaterno");

                entity.Property(e => e.Aula).HasColumnName("aula");

                entity.Property(e => e.Curp)
                    .IsRequired()
                    .HasMaxLength(18)
                    .HasColumnName("curp");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombres");

                entity.HasOne(d => d.AulaNavigation)
                    .WithMany(p => p.Alumnos)
                    .HasForeignKey(d => d.Aula)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("alumno_aula_fk");
            });

            modelBuilder.Entity<AlumnoTutor>(entity =>
            {
                entity.HasKey(e => e.IdAlumnoTutor)
                    .HasName("PRIMARY");

                entity.ToTable("alumnoTutor");

                entity.HasIndex(e => e.IdAlumno, "alumnoTutores_alumno_fk");

                entity.HasIndex(e => e.IdTutor, "alumnoTutores_tutor_fk");

                entity.Property(e => e.IdAlumno).HasColumnName("idAlumno");

                entity.Property(e => e.IdTutor).HasColumnName("idTutor");

                entity.HasOne(d => d.IdAlumnoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdAlumno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("alumnoTutores_alumno_fk");

                entity.HasOne(d => d.IdTutorNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdTutor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("alumnoTutores_tutor_fk");
            });

            modelBuilder.Entity<Asistencium>(entity =>
            {
                entity.HasKey(e => e.IdAsistencia)
                    .HasName("PRIMARY");

                entity.ToTable("asistencia");

                entity.HasIndex(e => e.IdAlumno, "asistencia_alumno_fk");

                entity.Property(e => e.IdAsistencia).HasColumnName("idAsistencia");

                entity.Property(e => e.Asistio)
                    .HasColumnType("bit(1)")
                    .HasColumnName("asistio");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.IdAlumno).HasColumnName("idAlumno");

                entity.HasOne(d => d.IdAlumnoNavigation)
                    .WithMany(p => p.Asistencia)
                    .HasForeignKey(d => d.IdAlumno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asistencia_alumno_fk");
            });

            modelBuilder.Entity<Aula>(entity =>
            {
                entity.HasKey(e => e.IdAula)
                    .HasName("PRIMARY");

                entity.ToTable("aula");

                entity.Property(e => e.IdAula).HasColumnName("idAula");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<ConceptosDePago>(entity =>
            {
                entity.HasKey(e => e.IdConcepto)
                    .HasName("PRIMARY");

                entity.ToTable("conceptosDePago");

                entity.Property(e => e.IdConcepto).HasColumnName("idConcepto");

                entity.Property(e => e.Concepto)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("concepto");
            });

            modelBuilder.Entity<Docente>(entity =>
            {
                entity.HasKey(e => e.IdDocente)
                    .HasName("PRIMARY");

                entity.ToTable("docente");

                entity.HasIndex(e => e.AulaAsignada, "docente_aula_idAula_fk");

                entity.HasIndex(e => e.Email, "usuario_email_uindex")
                    .IsUnique();

                entity.Property(e => e.IdDocente).HasColumnName("idDocente");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("activo")
                    .HasDefaultValueSql("b'0'");

                entity.Property(e => e.Administrador)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("administrador")
                    .HasDefaultValueSql("b'0'");

                entity.Property(e => e.ApellidoMaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoMaterno");

                entity.Property(e => e.ApellidoPaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoPaterno");

                entity.Property(e => e.AulaAsignada).HasColumnName("aulaAsignada");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombres");

                entity.Property(e => e.Password)
                    .HasColumnType("longtext")
                    .HasColumnName("password");

                entity.HasOne(d => d.AulaAsignadaNavigation)
                    .WithMany(p => p.Docentes)
                    .HasForeignKey(d => d.AulaAsignada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("docente_aula_idAula_fk");
            });

            modelBuilder.Entity<Pago>(entity =>
            {
                entity.HasKey(e => e.IdPago)
                    .HasName("PRIMARY");

                entity.ToTable("pagos");

                entity.HasIndex(e => e.IdAlumno, "pagos_alumno_idAlumno_fk");

                entity.HasIndex(e => e.Concepto, "pagos_conceptosDePago_idConcepto_fk");

                entity.HasIndex(e => e.IdTutor, "pagos_tutor_fk");

                entity.Property(e => e.IdPago).HasColumnName("idPago");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.ComprobanteDePago)
                    .IsRequired()
                    .HasColumnType("blob")
                    .HasColumnName("comprobanteDePago");

                entity.Property(e => e.Concepto).HasColumnName("concepto");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FormatoComprobante)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("formatoComprobante");

                entity.Property(e => e.IdAlumno).HasColumnName("idAlumno");

                entity.Property(e => e.IdTutor).HasColumnName("idTutor");

                entity.HasOne(d => d.ConceptoNavigation)
                    .WithMany(p => p.Pagos)
                    .HasForeignKey(d => d.Concepto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pagos_conceptosDePago_idConcepto_fk");

                entity.HasOne(d => d.IdAlumnoNavigation)
                    .WithMany(p => p.Pagos)
                    .HasForeignKey(d => d.IdAlumno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pagos_alumno_idAlumno_fk");

                entity.HasOne(d => d.IdTutorNavigation)
                    .WithMany(p => p.Pagos)
                    .HasForeignKey(d => d.IdTutor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pagos_tutor_fk");
            });

            modelBuilder.Entity<Tutor>(entity =>
            {
                entity.HasKey(e => e.IdTutor)
                    .HasName("PRIMARY");

                entity.ToTable("tutor");

                entity.Property(e => e.IdTutor).HasColumnName("idTutor");

                entity.Property(e => e.Activo).HasColumnName("activo");

                entity.Property(e => e.ApellidoMaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoMaterno");

                entity.Property(e => e.ApellidoPaterno)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("apellidoPaterno");

                entity.Property(e => e.Calle)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("calle");

                entity.Property(e => e.Colonia)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("colonia");

                entity.Property(e => e.Cp).HasColumnName("CP");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("estado");

                entity.Property(e => e.Localidad)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("localidad");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombres");

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.NumeroCelular)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("numeroCelular");

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("pais");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
