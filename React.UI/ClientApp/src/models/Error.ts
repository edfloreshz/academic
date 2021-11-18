import {ZodIssue} from "zod";

interface IError {
  field: string;
  error: ZodIssue;
}

class Error implements IError {
  error: ZodIssue;
  field: string;
  constructor(field: string, error: ZodIssue) {
    this.field = field;
    this.error = error;
  }
}

export type { IError };

export { Error };