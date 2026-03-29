import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const steps = [
  { n: 1, title: "Upload PDF", desc: "Add your book file" },
  { n: 2, title: "AI Processing", desc: "We analyze the content" },
  { n: 3, title: "Voice Chat", desc: "Discuss with AI" },
] as const;

const heroIllustrationSrc = "/assets/hero-illustration.png";

export function LibraryHero() {
  return (
    <section className="bg-[#FAF7F2] pt-[calc(var(--navbar-height)+2rem)] pb-12 md:pb-16">
      <div className="wrapper">
        <div className="rounded-3xl bg-[#F5E6D3] p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-10">
            {/* Left — heading, copy, CTA */}
            <div className="flex max-w-xl flex-col gap-5 lg:max-w-[min(100%,360px)] lg:shrink-0">
              <h1 className="font-serif text-3xl font-bold tracking-[-0.02em] text-black sm:text-4xl lg:text-[2.375rem] lg:leading-[1.15]">
                Your Library
              </h1>
              <p className="max-w-md text-[15px] leading-7 text-[#4B4B4B] sm:text-base sm:leading-[1.65]">
                Convert your books into interactive AI conversations. Listen,
                learn, and discuss your favorite reads.
              </p>
              <Link
                href="/books/new"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-serif text-base font-bold text-black shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:bg-white hover:shadow-[0_4px_18px_rgba(0,0,0,0.1)] sm:px-6 sm:py-4 sm:text-lg"
              >
                <Plus
                  className="size-5 stroke-[2.5] sm:size-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                />
                Add new book
              </Link>
            </div>

            {/* Center — illustration (mobile only: full-width strip between copy and steps) */}
            <div className="flex min-h-47 items-center justify-center px-2 py-6 sm:min-h-55 sm:px-4 sm:py-8 lg:hidden">
              <Image
                src={heroIllustrationSrc}
                alt="Vintage books, globe, and desk lamp"
                width={640}
                height={360}
                className="max-h-50 w-full max-w-lg object-contain object-center sm:max-h-60"
                priority
              />
            </div>

            {/* Center — illustration (desktop only) */}
            <div className="relative hidden min-h-0 flex-1 items-center justify-center px-1 lg:flex lg:min-h-0 lg:py-2">
              <Image
                src={heroIllustrationSrc}
                alt=""
                width={520}
                height={360}
                className="h-auto w-full max-w-none object-contain object-center drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                aria-hidden
                priority
              />
            </div>

            {/* Right — steps card */}
            <div className="w-full max-w-md self-stretch lg:max-w-70 lg:shrink-0 xl:max-w-75">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] sm:p-7">
                <ul className="flex flex-col gap-5 sm:gap-6">
                  {steps.map(({ n, title, desc }) => (
                    <li key={n} className="flex gap-3.5 sm:gap-4">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#4B4B4B] text-sm font-semibold text-[#4B4B4B] sm:size-10"
                        aria-hidden
                      >
                        {n}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-sans text-base font-bold text-black">
                          {title}
                        </p>
                        <p className="mt-0.5 font-sans text-sm text-[#4B4B4B]">
                          {desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
