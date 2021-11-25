import { z } from "zod";

const CURPRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

const id = z.number({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten numeros.",
}).max(255, {
    message: "Solo se permiten 255 letras."
}).min(0, {
    message: "El campo no debe estar vacio."
});

const numeric = z.number({
    required_error: "Es requerido.",
}).min(1, {
    message: "El campo no debe estar vacio."
});

const text = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten letras.",
}).max(255, {
    message: "Solo se permiten 255 letras."
}).min(1, {
    message: "El campo no debe estar vacio."
}).refine(value => {
    if (/\S/.test(value)) {
        return value.toString().trim();
    }
}, {
    message: "No se permiten espacios en blanco."
});

const file = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten letras.",
}).min(1, {
    message: "El campo no debe estar vacio."
});

const numericString = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten numeros.",
}).max(255, {
    message: "Solo se permiten 255 letras."
}).min(1, {
    message: "Debe ser al menos 1 numero."
});

const phone = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten numeros.",
}).max(10, {
    message: "Solo se permiten 10 letras."
}).min(10, {
    message: "Deben ser al menos 10 numeros."
}).refine(async (val) => isNumeric(val), {
    message: "Solo se permiten numeros."
});

const url = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Debe ser un URL.",
}).url();

const email = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "Solo se permiten letras.",
}).email({
    message: "Debe ser un email."
});

const curp = z.string({
    required_error: "Es requerido.",
    invalid_type_error: "No es el tipo de dato correcto.",
}).regex(CURPRegex, "El formato del CURP es incorrecto.").max(18).min(0);

function isNumeric(val: string) {
    return /^-?\d+$/.test(val);
}

export {
    id,
    text,
    numeric,
    email,
    url,
    curp,
    phone,
    file,
    numericString
};