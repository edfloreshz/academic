import { z } from 'zod';
import { text, id} from "./Schema";

const aulaSchema = z.object({
  idAula: id,
  nombre: text,
});

type IAula = z.TypeOf<typeof aulaSchema>;

export type { IAula };

export { aulaSchema };