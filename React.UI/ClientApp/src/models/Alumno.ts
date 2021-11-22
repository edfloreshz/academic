import {aulaSchema} from "./Aula";
import { z } from "zod";
import {curp, numeric, text, id} from "./Schema";

const alumnoSchema = z.object({
  idAlumno: id,
  nombres: text,
  apellidoPaterno: text,
  apellidoMaterno: text,
  curp: curp,
  aula: numeric,
  activo: z.boolean().optional().default(true),
  aulaNavigation: aulaSchema.optional(),
  presente: z.boolean().optional(),
  isDeudor: z.boolean().optional(),
});

type IAlumno = z.TypeOf<typeof alumnoSchema>;

export type { IAlumno };
export { alumnoSchema };
