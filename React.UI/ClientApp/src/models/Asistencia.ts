import { z } from "zod";
import { numeric, id } from "./Schema";

const asistenciaSchema = z.object({
  idAsistencia: id,
  idAlumno: numeric,
  asistio: z.boolean(),
  fecha: z.date()
});

type IAsistencia = z.TypeOf<typeof asistenciaSchema>;

export type { IAsistencia };
export { asistenciaSchema };
