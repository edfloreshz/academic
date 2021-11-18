import { z } from "zod";
import { id } from "./Schema";

const tutorAlumnoSchema = z.object({
  idTutorAlumno: id,
  idAlumno: id,
  idTutor: id,
});

type ITutorAlumno = z.TypeOf<typeof tutorAlumnoSchema>;

export type { ITutorAlumno };

export { tutorAlumnoSchema }