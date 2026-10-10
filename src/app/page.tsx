"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Boot, MapPin, NavigationArrow, Needle, Phone, Scissors } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19728186767", PHONE = "(972) 818-6767";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=5930+W+Park+Blvd+Ste+850+Plano+TX+75093";
const HOURS: Hours = { 0: null, 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [10, 15] };
const COLS = [{ k: "colA", Icon: Scissors, items: ["a1", "a2", "a3"] }, { k: "colB", Icon: Boot, items: ["b1", "b2", "b3"] }];

const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium tracking-wide transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-16px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3.5 block text-xs font-medium tracking-[.3em] text-soft uppercase";

/** Language: a wax seal pressed with EN or ES. */
function Seal() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"} className="size-[50px] flex-none cursor-pointer">
      <svg key={lang} viewBox="0 0 50 50" className="press block size-full" aria-hidden="true">
        <path d="M25 2c4 0 5 3 8 4s6-1 8 2 0 6 2 8 4 4 3 7-3 4-3 7 2 6-1 8-6 0-8 2-3 5-7 5-5-3-8-4-6 1-8-2 0-6-2-8-4-4-3-7 3-4 3-7-2-6 1-8 6 0 8-2 3-5 7-5z" className="fill-[#7a1f1f] dark:fill-[#a8322f]" />
        <circle cx="25" cy="25" r="14" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
        <text x="25" y="30" textAnchor="middle" className="font-display" fontStyle="italic" fontWeight="700" fontSize="14" fill="#f4e7d3">{lang.toUpperCase()}</text>
      </svg>
    </button>
  );
}

/** Theme: a shoe-polish tin; the lid slides off to show neutral polish by day, black at night. */
function Tin() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  const [open, setOpen] = useState(true);
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={() => { setOpen(false); setTimeout(() => { flipTheme(document.body, () => flushSync(() => setTheme(dark ? "light" : "dark"))); setOpen(true); }, 260); }}
      className="relative size-[46px] flex-none cursor-pointer">
      <span className={cn("absolute inset-[3px] rounded-full shadow-[inset_0_0_0_3px_#a8a29a,0_3px_6px_var(--shadow)] transition-[background] duration-500", dark ? "bg-[radial-gradient(circle_at_40%_35%,#3a3532,#0d0c0b)]" : "bg-[radial-gradient(circle_at_40%_35%,#e9dcc6,#c9b28e)]")} />
      <motion.span animate={open ? { x: 9, y: -9, rotate: 20, scale: 0.7 } : { x: 0, y: 0, rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="absolute inset-[3px] grid origin-top-right place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f0eee9,#a8a29a_70%,#7c766e)] font-display text-[13px] font-bold text-[#6b6158] italic shadow-[inset_0_0_0_2px_rgba(0,0,0,.15)]">A</motion.span>
    </button>
  );
}

/** Hero: a leather plate with an oxford shoe; the saddle stitching sews itself in. */
function Plate() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ delay: 0.4 })
        .from(".shoe", { y: 30, opacity: 0, duration: 1, ease: "power3.out" })
        .fromTo(".sew", { strokeDasharray: "0 1200" }, { strokeDasharray: "1200 0", duration: 1.6, ease: "power1.inOut", stagger: 0.3 }, "-=0.3")
        .from(".eyelet", { scale: 0, transformOrigin: "50% 50%", stagger: 0.08, ease: "back.out(3)" }, "-=0.8")
        .from(".needle", { x: -40, y: -20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
      gsap.to(".shoe-wrap", { y: -30, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="leather stitched relative aspect-[.9] w-full overflow-hidden rounded shadow-[0_50px_100px_-40px_var(--shadow)]" aria-hidden="true">
      <svg viewBox="0 0 400 440" className="shoe-wrap absolute inset-0 z-10 size-full">
        <g className="shoe">
          <path d="M40 270c0-30 30-40 70-44 30-3 60-22 90-50 14-13 34-14 46 0 22 26 50 46 90 52 30 5 34 34 20 52-10 14-40 20-120 22-80 2-160 0-186-6-10-4-10-16-10-26z" fill="#1c1714" opacity=".92" />
          <path d="M40 300v14c0 6 6 10 14 10h290c14 0 24-8 26-20" fill="#2a211b" />
          <path d="M210 192l20 22M222 204l18 18" stroke="#f4e7d3" strokeWidth="2" />
        </g>
        <path className="sew" d="M40 300c40 8 140 10 220 8s100-6 114-16" stroke="#d9a868" strokeWidth="2.4" fill="none" strokeDasharray="1200 0" />
        <path className="sew" d="M200 176c18 30 46 50 78 56" stroke="#d9a868" strokeWidth="2.4" fill="none" strokeDasharray="1200 0" />
        <g fill="#d9a868"><circle className="eyelet" cx="214" cy="196" r="3" /><circle className="eyelet" cx="226" cy="210" r="3" /><circle className="eyelet" cx="240" cy="222" r="3" /></g>
        <g className="needle">
          <path d="M96 116l90 40" stroke="#e8e2d8" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="100" cy="118" rx="5" ry="2" transform="rotate(24 100 118)" fill="none" stroke="#a8a29a" strokeWidth="1.5" />
          <path className="sew" d="M100 118c-30-20-40 30-70 10" stroke="#d9a868" strokeWidth="2" fill="none" strokeDasharray="1200 0" />
        </g>
      </svg>
      <div className="glass absolute inset-x-7 bottom-7 z-20 rounded-sm px-5 py-4">
        <b className="block font-display text-xl font-medium text-ink italic" dangerouslySetInnerHTML={{ __html: t("capTitle") }} />
        <span className="text-[13px] tracking-[.14em] text-soft uppercase" dangerouslySetInnerHTML={{ __html: t("capSub") }} />
      </div>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[72px] max-w-[1160px] items-center justify-between gap-3 rounded-full border border-line ps-7 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex-none leading-none" aria-label="Atelier Tailor & Shoe Repair">
            <b className="block font-display text-[28px] font-medium italic">Atelier</b>
            <T k="logoSub" className="block text-[10.5px] tracking-[.22em] text-soft uppercase max-sm:hidden" />
          </a>
          <div className="flex items-center gap-1 text-[15px] max-[960px]:hidden">
            {[["services", "navServices"], ["about", "navAbout"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-2.5">
            <Seal /><Tin />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative pt-16 pb-28 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.1fr_.9fr] items-center gap-14 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-sm shadow-[inset_0_0_0_1px_var(--line)]">
                  <i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a] shadow-[0_0_0_4px_rgba(34,163,90,.2)]" : "bg-[#a69c92]")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-7 text-[clamp(54px,7.4vw,108px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-10 max-w-[46ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="mb-10 flex flex-wrap gap-3">
                <a href={TEL} className={primary}><Phone size={18} /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} /><T k="ctaDir" /></a>
              </Reveal>
              <Reveal delay={0.3} className="flex items-center gap-4 border-t border-dashed border-stitch pt-6 text-[15px] text-soft">
                <b className="font-display text-[34px] leading-none font-medium text-ink italic">4.6</b><T k="sig" />
              </Reveal>
            </div>
            <Reveal delay={0.12} className="w-full max-w-[460px] justify-self-end max-[960px]:justify-self-center"><Plate /></Reveal>
          </Wrap>
        </section>

        <section id="services" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-16 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-5 text-[clamp(46px,6vw,84px)]" /><T k="svcLead" as="p" className="max-w-[56ch] text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
              {COLS.map(({ k, Icon, items }, ci) => (
                <Reveal key={k} delay={ci * 0.1} className="rounded-[28px] bg-card p-1.5 shadow-[inset_0_0_0_1px_var(--line),0_40px_80px_-60px_var(--shadow)]">
                  <MagicCard gradientSize={300} gradientColor="rgba(138,75,36,.1)" gradientFrom="#d9a868" gradientTo="#8a4b24" className="h-full rounded-[23px] [&>div:last-child]:h-full">
                    <div className="h-full p-10 max-sm:p-7">
                      <div className="mb-8 flex items-center gap-4 border-b border-dashed border-stitch pb-6">
                        <span className={cn("grid size-14 place-items-center rounded-full", ci ? "leather text-[#f4e7d3]" : "bg-btn text-btnfg")}><Icon size={26} /></span>
                        <T k={k} as="h3" className="text-[38px] italic" />
                      </div>
                      <div className="grid gap-7">
                        {items.map(i => (
                          <div key={i} className="group grid grid-cols-[auto_1fr] gap-x-4">
                            <Needle size={18} className="mt-1.5 text-leathertext transition-transform duration-500 ease-spring group-hover:rotate-45" />
                            <div><T k={`${i}t`} as="b" className="mb-1 block font-display text-[24px] font-medium" /><T k={`${i}p`} as="p" className="text-[15px] text-soft" /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="about" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[auto_1fr] items-center gap-16 max-[860px]:grid-cols-1 max-[860px]:gap-10">
            <Reveal className="leather stitched relative grid size-[280px] place-items-center rounded-full shadow-[0_40px_80px_-40px_var(--shadow)] max-sm:size-[200px]">
              <span className="font-display text-[150px] leading-none text-[#f4e7d3] italic max-sm:text-[100px]" aria-hidden="true">N</span>
            </Reveal>
            <Reveal delay={0.1}>
              <T k="aboutEyebrow" className={eyebrow} />
              <T k="aboutQuote" as="blockquote" className="mb-6 font-display text-[clamp(32px,3.6vw,52px)] leading-[1.15] italic" />
              <T k="aboutText" as="p" className="max-w-[60ch] text-[17px] text-soft" />
            </Reveal>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(46px,6vw,84px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="relative overflow-hidden rounded-[26px] bg-card p-9 shadow-[inset_0_0_0_1px_var(--line)]">
                <BorderBeam size={180} duration={12} colorFrom="#d9a868" colorTo="#8a4b24" borderWidth={1.5} />
                <div className="grid content-start gap-5">
                  <T k="hoursTitle" as="h3" className="text-[36px] italic" />
                  <HoursTable hours={HOURS} accent="text-leathertext font-semibold" />
                  {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "5930 W Park Blvd, Ste 850", null]] as const).map(([href, I, strong, sub]) => (
                    <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                      <span className="grid size-11 flex-none place-items-center rounded-full bg-tint text-leathertext transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} /></span>
                      <span><strong className="block font-medium">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Plano, TX 75093</span>}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08} className="min-h-[440px] overflow-hidden rounded-[26px] shadow-[inset_0_0_0_1px_var(--line)]"><MapFrame q="5930+W+Park+Blvd+Ste+850,+Plano,+TX+75093" className="min-h-[440px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(46px,6vw,80px)]" /></Reveal>
            <Faq ids={[1, 2, 3]} accent="text-leathertext" />
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="leather stitched relative flex items-center justify-between gap-8 overflow-hidden rounded-[28px] px-16 py-20 text-[#f4e7d3] max-[960px]:flex-col max-[960px]:items-start max-sm:px-8 max-sm:py-14">
              <T k="ctaTitle" as="h2" className="relative text-[clamp(46px,6vw,84px)] [&_em]:text-[#fbe3c0]" />
              <a href={TEL} className={cn(btn, "relative flex-none bg-[#1c1714] px-8 py-4 text-lg text-[#f4e7d3]")}><Phone size={20} />{PHONE}</a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-dashed border-stitch pt-6"><span>© {new Date().getFullYear()} Atelier Tailor &amp; Shoe Repair · 5930 W Park Blvd, Ste 850, Plano, TX 75093</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
