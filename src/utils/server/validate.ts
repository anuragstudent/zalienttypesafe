import { ZodSchema, ZodError } from "zod";

/**
 * A utility function for validating data using Zod schemas.
 * @param schema - The Zod schema to validate against.
 * @param data - The data to be validated.
 * @returns - Parsed data if validation is successful.
 * @throws - An object with structured validation errors if validation fails.
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(message);
    }

    throw error; // Re-throw other errors
  }
}
