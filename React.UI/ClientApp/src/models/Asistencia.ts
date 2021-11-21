import { z } from "zod";
import { numeric, id } from "./Schema";
import {alumnoSchema} from "./Alumno";

const asistenciaSchema = z.object({
  idAsistencia: id,
  idAlumno: numeric,
  asistio: z.boolean(),
  fecha: z.date(),
  idAlumnoNavigation: alumnoSchema.optional()
});

type IAsistencia = z.TypeOf<typeof asistenciaSchema>;

export type { IAsistencia };
export { asistenciaSchema };
