import { z } from "zod";
import {email, id, text, phone, numeric} from "./Schema";

const tutorSchema = z.object({
  idTutor: id,
  nombres: text,
  apellidoPaterno: text,
  apellidoMaterno: text,
  numeroCelular: phone,
  email: email,
  calle: text,
  numero: numeric,
  colonia: text,
  localidad: text,
  estado: text,
  pais: text,
  cp: numeric,
  activo: z.boolean().optional().default(true),
});

type ITutor = z.TypeOf<typeof tutorSchema>;

export type { ITutor };

export { tutorSchema }