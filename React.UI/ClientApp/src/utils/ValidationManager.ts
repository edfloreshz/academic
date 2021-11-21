import {ZodIssue, ZodObject} from "zod";

async function validate(field: string, data: any, schema: ZodObject<any>): Promise<ZodIssue[]> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        console.log(result.error.errors)
        return result.error.errors;
    }
    return new Array<ZodIssue>();
}

export {validate};
