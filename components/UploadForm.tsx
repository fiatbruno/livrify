"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadSchema, type UploadFormValues, type VoiceId, voiceIds } from "@/lib/zod";
import { cn } from "@/lib/utils";

const MALE_VOICES: { id: VoiceId; name: string; description: string }[] = [
  {
    id: "dave",
    name: "Dave",
    description: "Young male, British-Essex, casual & conversational",
  },
  {
    id: "daniel",
    name: "Daniel",
    description: "Mature male, American, clear & professional",
  },
  {
    id: "chris",
    name: "Chris",
    description: "Warm male, relaxed & approachable",
  },
];

const FEMALE_VOICES: { id: VoiceId; name: string; description: string }[] = [
  {
    id: "rachel",
    name: "Rachel",
    description: "Calm female, expressive & engaging",
  },
  {
    id: "sarah",
    name: "Sarah",
    description: "Bright female, upbeat & clear",
  },
];

const dropzoneBorder = "border-2 border-dashed border-[var(--border-subtle)]";

const UploadForm = () => {
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "rachel",
      pdfFile: undefined,
      coverImage: undefined,
    },
  });

  const onSubmit = async (data: UploadFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("upload", {
      title: data.title,
      author: data.author,
      voice: data.voice,
      pdfName: data.pdfFile.name,
      coverName: data.coverImage?.name,
    });
  };

  return (
    <>
      <LoadingOverlay open={form.formState.isSubmitting} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="new-book-wrapper space-y-8"
          noValidate
        >
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <div>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onChange}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file ?? undefined);
                      }}
                    />
                    <button
                      type="button"
                      className={cn(
                        "upload-dropzone w-full",
                        dropzoneBorder,
                        field.value && "upload-dropzone-uploaded",
                        field.value ? "flex flex-row items-center justify-between px-6" : "flex flex-col"
                      )}
                      onClick={() => {
                        const input = document.getElementById(
                          "pdf-file-input"
                        ) as HTMLInputElement | null;
                        input?.click();
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    >
                      <input
                        id="pdf-file-input"
                        type="file"
                        accept="application/pdf,.pdf"
                        className="sr-only"
                        tabIndex={-1}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file ?? undefined);
                        }}
                      />
                      {field.value ? (
                        <>
                          <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                            <span className="upload-dropzone-text truncate font-medium">
                              {field.value.name}
                            </span>
                            <span className="upload-dropzone-hint">
                              {(field.value.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            className="upload-dropzone-remove shrink-0"
                            aria-label="Remove PDF"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(undefined);
                              const hidden = document.getElementById(
                                "pdf-file-input"
                              ) as HTMLInputElement | null;
                              if (hidden) hidden.value = "";
                            }}
                          >
                            <X className="size-6" />
                          </button>
                        </>
                      ) : (
                        <>
                          <Upload className="upload-dropzone-icon" aria-hidden />
                          <span className="upload-dropzone-text">Click to upload PDF</span>
                          <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                        </>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div>
                    <button
                      type="button"
                      className={cn(
                        "upload-dropzone w-full",
                        dropzoneBorder,
                        field.value && "upload-dropzone-uploaded",
                        field.value ? "flex flex-row items-center justify-between px-6" : "flex flex-col"
                      )}
                      onClick={() => {
                        const input = document.getElementById(
                          "cover-file-input"
                        ) as HTMLInputElement | null;
                        input?.click();
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    >
                      <input
                        id="cover-file-input"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file ?? undefined);
                        }}
                      />
                      {field.value ? (
                        <>
                          <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                            <span className="upload-dropzone-text truncate font-medium">
                              {field.value.name}
                            </span>
                            <span className="upload-dropzone-hint">Image file</span>
                          </div>
                          <button
                            type="button"
                            className="upload-dropzone-remove shrink-0"
                            aria-label="Remove cover image"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(undefined);
                              const el = document.getElementById(
                                "cover-file-input"
                              ) as HTMLInputElement | null;
                              if (el) el.value = "";
                            }}
                          >
                            <X className="size-6" />
                          </button>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="upload-dropzone-icon" aria-hidden />
                          <span className="upload-dropzone-text">Click to upload cover image</span>
                          <span className="upload-dropzone-hint">
                            Leave empty to auto-generate from PDF
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input
                    className="form-input h-auto border border-[var(--border-subtle)] py-4 text-lg shadow-none"
                    placeholder="ex: Rich Dad Poor Dad"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input
                    className="form-input h-auto border border-[var(--border-subtle)] py-4 text-lg shadow-none"
                    placeholder="ex: Robert Kiyosaki"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label mb-0">Choose Assistant Voice</FormLabel>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Male Voices</p>
                  <div className="voice-selector-options flex-wrap">
                    {MALE_VOICES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={field.value === v.id}
                        className={cn(
                          "voice-selector-option voice-selector-option-default min-w-[140px] flex-col items-stretch gap-2 !py-4 text-left sm:flex-1",
                          field.value === v.id && "voice-selector-option-selected"
                        )}
                        onClick={() => field.onChange(v.id)}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border-subtle)]",
                              field.value === v.id &&
                                "border-[var(--accent-warm)] bg-[var(--accent-warm)]"
                            )}
                          >
                            {field.value === v.id ? (
                              <span className="size-2 rounded-full bg-white" />
                            ) : null}
                          </span>
                          <span className="font-bold text-[var(--text-primary)]">{v.name}</span>
                        </span>
                        <span className="pl-6 text-sm leading-snug text-[var(--text-secondary)]">
                          {v.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Female Voices</p>
                  <div className="voice-selector-options flex-wrap">
                    {FEMALE_VOICES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={field.value === v.id}
                        className={cn(
                          "voice-selector-option voice-selector-option-default min-w-[140px] flex-col items-stretch gap-2 !py-4 text-left sm:flex-1",
                          field.value === v.id && "voice-selector-option-selected"
                        )}
                        onClick={() => field.onChange(v.id)}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border-subtle)]",
                              field.value === v.id &&
                                "border-[var(--accent-warm)] bg-[var(--accent-warm)]"
                            )}
                          >
                            {field.value === v.id ? (
                              <span className="size-2 rounded-full bg-white" />
                            ) : null}
                          </span>
                          <span className="font-bold text-[var(--text-primary)]">{v.name}</span>
                        </span>
                        <span className="pl-6 text-sm leading-snug text-[var(--text-secondary)]">
                          {v.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" className="form-btn">
            Begin Synthesis
          </button>
        </form>
      </Form>
    </>
  );
};

export default UploadForm;
