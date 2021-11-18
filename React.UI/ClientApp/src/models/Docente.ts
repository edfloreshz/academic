import {aulaSchema} from "./Aula";
import { z } from "zod";
import {numeric, text, id } from "./Schema";

const docenteSchema = z.object({
  idDocente: id,
  nombres: text,
  apellidoPaterno: text,
  apellidoMaterno: text,
  email: text,
  password: text,
  activo: z.boolean().optional().default(true),
  administrador: z.boolean(),
  aulaAsignada: numeric,
  aulaAsignadaNavigation: aulaSchema,
});

type IDocente = z.TypeOf<typeof docenteSchema>;

export type { IDocente };
export { docenteSchema };
