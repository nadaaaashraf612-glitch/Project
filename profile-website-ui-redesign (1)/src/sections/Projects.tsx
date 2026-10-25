import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { GlassCard, Kicker, PageMeta } from "../components/ui";
import { LinkIcon, GlobeIcon, DeviceIcon } from "../components/icons";
import { useLanguage } from "../i18n/LanguageContext";
import { ProjectMockup } from "../components/ProjectMockup";
import { existingProjectVisuals, fallbackSpec, signatureProjects, type SignatureProject } from "../utils/projectVisuals";
import type { Project } from "../i18n/content";

function ProjectCard({ p, i, lang }: { p: Project; i: number; lang: "ar" | "en" }) {
  const href = p.url.startsWith("http") ? p.url : `https://${p.url}`;
  const spec = existingProjectVisuals[p.url] ?? fallbackSpec(p.title);
  const CategoryIcon = p.category === "app" ? DeviceIcon : GlobeIcon;
  const categoryLabel =
    p.category === "app" ? (lang === "ar" ? "تطبيق" : "App") : lang === "ar" ? "موقع" : "Website";

  return (
    <Reveal delay={(i % 8) * 60}>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="group card-tilt block"
      >
        <GlassCard tone="dark" className="flex h-full flex-col overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(139,92,246,0.25)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ProjectMockup spec={spec} title={p.title} url={p.url} />
            <span className="absolute end-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[var(--color-gold-soft)] backdrop-blur-sm">
              <CategoryIcon className="h-3 w-3" />
              {categoryLabel}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3 p-5">
            <div>
              <h3 className="font-display text-base font-medium leading-snug tracking-tight">{p.title}</h3>
              {p.note && <p className="mt-1 text-[11px] leading-relaxed text-white/40">{p.note}</p>}
            </div>
            <span className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.15em] text-white/50 transition group-hover:text-[var(--color-gold-soft)]">
              <span className="truncate" dir="ltr">
                {p.url}
              </span>
              <LinkIcon className="h-3.5 w-3.5 flex-shrink-0 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </GlassCard>
      </motion.a>
    </Reveal>
  );
}

function ProjectGroup({
  items,
  lang,
  label,
  icon,
}: {
  items: Project[];
  lang: "ar" | "en";
  label: string;
  icon: "globe" | "device";
}) {
  const Icon = icon === "globe" ? GlobeIcon : DeviceIcon;
  if (items.length === 0) return null;
  return (
    <div className="relative z-10 mt-14 first:mt-0">
      <Reveal className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--color-gold-soft)]">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight text-white/90 sm:text-2xl">{label}</h3>
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">{String(items.length).padStart(2, "0")}</span>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProjectCard key={p.title + p.url} p={p} i={i} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function SignatureCard({ project, i, lang }: { project: SignatureProject; i: number; lang: "ar" | "en" }) {
  const href = project.url.startsWith("http") ? project.url : `https://${project.url}`;
  const title = lang === "ar" ? project.titleAr : project.titleEn;
  const CategoryIcon = project.spec.device === "mobile" ? DeviceIcon : GlobeIcon;
  const categoryLabel =
    project.spec.device === "mobile" ? (lang === "ar" ? "تطبيق" : "App") : lang === "ar" ? "موقع" : "Website";

  return (
    <Reveal delay={(i % 6) * 70}>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="group card-tilt block"
      >
        <GlassCard tone="dark" className="flex h-full flex-col overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(139,92,246,0.3)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ProjectMockup spec={project.spec} title={title} url={project.url} />
            <span className="absolute end-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[var(--color-gold-soft)] backdrop-blur-sm">
              <CategoryIcon className="h-3 w-3" />
              {categoryLabel}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3 p-5">
            <h3 className="font-display text-base font-medium leading-snug tracking-tight">{title}</h3>
            <span className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.15em] text-white/50 transition group-hover:text-[var(--color-gold-soft)]">
              <span className="truncate" dir="ltr">
                {project.url}
              </span>
              <LinkIcon className="h-3.5 w-3.5 flex-shrink-0 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </GlassCard>
      </motion.a>
    </Reveal>
  );
}

function SignatureCollaborations({ lang }: { lang: "ar" | "en" }) {
  const groups = signatureProjects.reduce<Record<string, SignatureProject[]>>((acc, project) => {
    const key = lang === "ar" ? project.groupAr : project.groupEn;
    acc[key] = acc[key] ? [...acc[key], project] : [project];
    return acc;
  }, {});

  return (
    <div className="relative z-10 mt-24">
      <Reveal className="mb-10 max-w-2xl">
        <Kicker tone="light">{lang === "ar" ? "تعاونات مختارة" : "Signature Collaborations"}</Kicker>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {lang === "ar" ? "شراكات حديثة، مصنّفة بحسب هويتها" : "Recent partners, organised by identity"}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
          {lang === "ar"
            ? "مجموعة من الجهات التي تعاونّا معها مؤخرًا، قسّمناها إلى عناقيد تعكس طبيعة كل قطاع بدلًا من عرضها كقائمة عشوائية."
            : "A set of organisations we've recently collaborated with, grouped into clusters that reflect the nature of each sector rather than a flat list."}
        </p>
      </Reveal>

      <div className="flex flex-col gap-16">
        {Object.entries(groups).map(([groupLabel, items], gi) => (
          <div key={groupLabel}>
            <Reveal delay={gi * 60} className="mb-6 flex items-center gap-3">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-soft)]">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-lg font-semibold tracking-tight text-white/90 sm:text-xl">{groupLabel}</h4>
              <span className="h-px flex-1 bg-white/10" />
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((project, i) => (
                <SignatureCard key={project.id} project={project} i={i} lang={lang} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const { t, dir, lang } = useLanguage();
  const idx = t.sectionIndex.findIndex((s) => s.id === "projects");
  const arrow = dir === "rtl" ? "←" : "→";

  const websites = t.projects.items.filter((p) => p.category === "website");
  const apps = t.projects.items.filter((p) => p.category === "app");

  return (
    <section id="projects" className="relative flex min-h-screen flex-col justify-center bg-black px-6 py-28 text-white sm:px-10 lg:px-16">
      <Reveal>
        <Kicker tone="light">{t.projects.kicker}</Kicker>
        <h2 className="mt-8 max-w-2xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {t.projects.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{t.projects.subheading}</p>
      </Reveal>

      <ProjectGroup items={websites} lang={lang} label={t.projects.websitesLabel} icon="globe" />
      <ProjectGroup items={apps} lang={lang} label={t.projects.appsLabel} icon="device" />

      <SignatureCollaborations lang={lang} />

      <Reveal delay={200} className="relative z-10 mt-14 flex justify-center">
        <a
          href="https://www.behance.net/PUIUX"
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[var(--color-gold)] hover:text-black"
        >
          <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-gold-soft)] to-white transition-transform duration-500 group-hover:scale-x-100" />
          Behance <span>{arrow}</span>
        </a>
      </Reveal>

      <PageMeta index={String(idx + 1).padStart(2, "0")} label={t.sectionIndex[idx].label} tone="light" />
    </section>
  );
}
