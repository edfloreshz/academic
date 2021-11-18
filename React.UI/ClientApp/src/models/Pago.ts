import { alumnoSchema } from "./Alumno";
import { conceptoSchema } from "./Concepto";
import { tutorSchema } from "./Tutor";
import { z } from "zod";
import {numeric, text, id, file} from "./Schema";

const pagoSchema = z.object({
  idPago: id,
  fecha: z.date().default(new Date()),
  cantidad: numeric,
  concepto: numeric,
  conceptoNavigation: conceptoSchema.nullable(),
  comprobanteDePago: file,
  formatoComprobante: text,
  idTutor: numeric,
  idTutorNavigation: tutorSchema.nullable(),
  idAlumno: numeric,
  idAlumnoNavigation: alumnoSchema.nullable(),
});

type IPago = z.TypeOf<typeof pagoSchema>;

export type { IPago };

export { pagoSchema };
