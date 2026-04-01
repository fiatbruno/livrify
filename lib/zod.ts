import { z } from "zod";

export const voiceIds = [
  "dave",
  "daniel",
  "chris",
  "rachel",
  "sarah",
] as const;

export type VoiceId = (typeof voiceIds)[number];

const MAX_PDF_BYTES = 50 * 1024 * 1024;

export const UploadSchema = z.object({
  pdfFile: z
    .custom<File | undefined>((v) => v === undefined || v instanceof File)
    .refine((v): v is File => v instanceof File, { message: "Please upload a PDF" })
    .refine(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
      { message: "File must be a PDF" }
    )
    .refine((f) => f.size <= MAX_PDF_BYTES, { message: "PDF file (max 50MB)" }),
  coverImage: z
    .custom<File | undefined>((v) => v === undefined || v instanceof File)
    .optional()
    .refine(
      (file) => file === undefined || /^image\//.test(file.type),
      { message: "Cover must be an image file" }
    ),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voice: z.enum(voiceIds, { message: "Choose a voice" }),
});

export type UploadFormValues = z.infer<typeof UploadSchema>;
