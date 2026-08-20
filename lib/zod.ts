import { z } from "zod";
import {
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "./constants";

// List of supported voice IDs used by the UI
export const voiceIds = ["dave", "daniel", "chris", "rachel", "sarah"] as const;
export const VoiceEnum = z.enum(voiceIds);
export type VoiceId = z.infer<typeof VoiceEnum>;

export const UploadSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  author: z
    .string()
    .min(1, "Author name is required")
    .max(100, "Author name is too long"),
  // field name changed to `voice` to match the form's field
  voice: VoiceEnum,
  pdfFile: z
    .instanceof(File, { message: "PDF file is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 50MB")
    .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), "Only PDF files are accepted"),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "Image size must be less than 10MB")
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported"),
});
