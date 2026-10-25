import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { GlowOrb, Kicker, PageMeta } from "../components/ui";
import { OrbitEmblem } from "../components/OrbitEmblem";
import { useLanguage } from "../i18n/LanguageContext";

export function About() {
  const { t, dir } = useLanguage();
  const idx = t.sectionIndex.findIndex((s) => s.id === "about");
  const edgeSign = dir === "rtl" ? -1 : 1;

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#fafaf8] px-6 py-28 sm:px-10 lg:px-16"
    >
      <GlowOrb className="-end-20 top-10 h-80 w-80" />
      <GlowOrb className="-start-20 bottom-0 h-72 w-72" />

      <Reveal>
        <Kicker>{t.about.kicker}</Kicker>
        <h2 className="mt-8 max-w-2xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {t.about.heading}
        </h2>
      </Reveal>

      {/* Creative layout: a living constellation mark anchors the story instead
          of four identical boxed paragraphs — each idea orbits outward along a
          single flowing spine, echoing the cover's motion signature. */}
      <div className="relative z-10 mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
        {/* Left: decorative orbit shape + lead statement, sticky on large screens */}
        <Reveal className="relative lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:mx-0 lg:h-96 lg:w-96">
            <OrbitEmblem tone="light" className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl font-semibold tracking-tight text-black/[0.06] sm:text-8xl">
                P
              </span>
            </div>
          </div>
          <p className="mx-auto -mt-6 max-w-sm text-center font-display text-xl font-medium leading-snug text-black/80 sm:text-2xl lg:mx-0 lg:-mt-10 lg:text-start">
            {t.about.paragraphs[0]}
          </p>
        </Reveal>

        {/* Right: remaining ideas flowing along a single gradient spine, not boxed cards */}
        <div className="relative ps-10 sm:ps-12">
          <span
            aria-hidden
            className="absolute bottom-2 top-2 w-px bg-gradient-to-b from-[var(--color-violet)] via-[var(--color-violet)]/30 to-transparent"
            style={{ [dir === "rtl" ? "right" : "left"]: "0.3rem" }}
          />
          <div className="flex flex-col gap-12 sm:gap-14">
            {t.about.paragraphs.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <motion.div
                  className="group relative"
                  whileHover={{ x: edgeSign * 6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    aria-hidden
                    className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-violet)] shadow-[0_0_0_4px_rgba(139,92,246,0.15)] transition-transform duration-500 group-hover:scale-125"
                    style={{ [dir === "rtl" ? "right" : "left"]: "-2.65rem" }}
                  />
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-violet)]">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">{p}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <PageMeta index={String(idx + 1).padStart(2, "0")} label={t.sectionIndex[idx].label} />
    </section>
  );
}
