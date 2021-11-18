import { z } from 'zod';
import {id, text} from "./Schema";

const conceptoSchema = z.object({
  idConcepto: id,
  concepto: text,
});

type IConcepto = z.TypeOf<typeof conceptoSchema>;

export type { IConcepto };

export { conceptoSchema };
