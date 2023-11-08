import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPE = "application/pdf";

export const FileSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 500KB.`)
    .refine(
      (files) => files?.type === ACCEPTED_FILE_TYPE,
      "Only .pdf format is supported."
    ),
});
