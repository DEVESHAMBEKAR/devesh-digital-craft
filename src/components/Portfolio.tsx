import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, Code2, Copy, Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, MessageCircle, Rocket, Send, Sparkles, Terminal, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import shramsetuCover from "@/assets/projects/shramsetu-cover.jpg";

const navItems = [
  ["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Projects", "projects"],
  ["Experience", "experience"], ["Education", "education"], ["Profiles", "profiles"], ["Contact", "contact"],
] as const;
const socials = [
  { label: "GitHub", href: "https://github.com/DEVESHAMBEKAR", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devesh-ambekar-34b13b2a0/", Icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/ThunderBeastTech/", Icon: Terminal },
  { label: "Email", href: "mailto:deveshambekar@outlook.com", Icon: Mail },
];
const strengths = [
  { number: "01", title: "Software development", text: "Thoughtful full-stack architecture, clean code and patterns made to grow.", Icon: Code2 },
  { number: "02", title: "Product building", text: "From the first problem sketch to a polished, useful digital experience.", Icon: Rocket },
  { number: "03", title: "Entrepreneurship", text: "Building Deep Root Studios with a hands-on approach to leadership and execution.", Icon: BriefcaseBusiness },
];
const skillGroups = [
  { title: "Programming", number: "01", tags: ["C++", "Python", "Dart", "JavaScript", "TypeScript"] },
  { title: "Frontend", number: "02", tags: ["Flutter", "React", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend & database", number: "03", tags: ["Supabase", "PostgreSQL", "SQL", "REST APIs"] },
  { title: "Tools & workflow", number: "04", tags: ["Git", "GitHub", "Android Studio", "VS Code"] },
  { title: "Core concepts", number: "05", tags: ["Object-oriented programming", "Data structures & algorithms", "System design basics", "Authentication"] },
  { title: "Emerging technology", number: "06", tags: ["Artificial intelligence", "Machine learning", "IoT"] },
];
const projects = [
  { id: "shramsetu", number: "01", name: "SHRAMSETU", category: "AI-powered cooperative service marketplace", description: "A community-first marketplace connecting skilled gig workers with customers through a transparent, cooperative ecosystem.", details: "Shifting the focus from one-off listings to a thriving local network, ShramSetu brings worker verification, real-time bookings and intelligent matching into one product. Cooperative federation tools and district demand forecasting help communities grow with greater visibility.", tags: ["Flutter", "Dart", "Supabase", "PostgreSQL"], highlights: ["Verified worker onboarding", "Real-time booking synchronization", "FairMatch worker recommendations", "Cooperative federation management", "District demand forecasting", "Digital payments"], proof: "201 / 201 automated tests passed", featured: true, cover: true },
  { id: "thrivesphere", number: "02", name: "THRIVESPHERE", category: "Mental health & hygiene web application", description: "A welcoming web experience focused on mental wellness and practical, user-friendly digital support.", details: "A web-based mental wellness concept with a focus on accessibility, clear content and approachable digital experiences.", tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"] },
  { id: "farmbridge", number: "03", name: "FARMBRIDGE", category: "Agriculture-oriented digital platform", description: "Exploring technology-led solutions for agricultural users and more transparent supply chains.", details: "A digital platform concept exploring how emerging technology can improve access to information and strengthen transparency across agricultural supply chains.", tags: ["Web application", "Agriculture", "Emerging tech"] },
  { id: "feedback", number: "04", name: "STUDENT FEEDBACK", category: "Python application", description: "A practical system for gathering student feedback and turning CSV data into clear reports.", details: "A Python-based feedback workflow for collecting, organizing and reporting student responses through automated CSV handling and file-system operations.", tags: ["Python", "CSV data engine", "File systems"] },
  { id: "drs", number: "05", name: "DEEP ROOT STUDIOS", category: "E-commerce & creative technology", description: "A home for digital products and client work, built around creative problem-solving.", details: "The digital platform for Deep Root Studios, a creative technology venture exploring digital products, client work and purposeful web experiences.", tags: ["React", "Vite", "Tailwind CSS"] },
];
const milestones = [
  { date: "Building now", title: "Founder", company: "Deep Root Studios", text: "Building and managing a creative technology venture centered on digital solutions, product execution, team coordination and business operations.", tags: ["Entrepreneurship", "Leadership", "Product development"] },
  { date: "Campus community", title: "Campus Ambassador", company: "Paytm", text: "Representing the brand in the campus ecosystem while growing communication, outreach, networking and student-engagement skills.", tags: ["Community engagement", "Brand outreach", "Collaboration"] },
];
const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  subject: z.string().trim().min(3, "Please add a subject.").max(150, "Subject must be 150 characters or fewer."),
  message: z.string().trim().min(10, "Please share a little more detail (at least 10 characters).").max(3000, "Message must be 3,000 characters or fewer."),
});

type Project = (typeof projects)[number];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Wordmark({ footer = false }: { footer?: boolean }) {
  return <a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }} aria-label="Devesh Ambekar — back to top" className="wordmark"><span className="wordmark-mark">DA<span>.</span></span><span className="wordmark-name">DEVESH AMBEKAR</span>{!footer && <span className="wordmark-status" aria-label="Available"><i /></span>}</a>;
}

function SectionHeading({ eyebrow, title, number, body }: { eyebrow: string; title: string; number: string; body?: string }) {
  return <div className="section-heading"><div className="section-heading-copy"><span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div><span className="section-number">{number}<span> / 08</span></span></div>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [sending, setSending] = useState(false);
  const [turn, setTurn] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(0);
  const titles = ["Software developer", "Technology enthusiast", "Product builder", "Entrepreneur"];

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    const headlineTimer = window.setInterval(() => setTurn((current) => (current + 1) % titles.length), 3800);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); window.clearInterval(headlineTimer); };
  }, []);

  function openProject(project: Project) {
    setActiveProject(project);
    history.replaceState(null, "", `#project-${project.id}`);
  }
  function closeProject() {
    setActiveProject(null);
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Please check your message and try again.";
      toast.error(firstError);
      return;
    }
    setSending(true);
    const { name, email, subject, message } = parsed.data;
    const body = `Hi Devesh,\n\n${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:deveshambekar@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Your email app is opening with your message ready to send.");
    form.reset();
    setSending(false);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("deveshambekar@outlook.com");
      setCopied(true);
      toast.success("Email address copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:deveshambekar@outlook.com";
      toast.info("Your email app is opening.");
    }
  }
  function moveProject(direction: -1 | 1) {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((project) => project.id === activeProject.id);
    const next = projects[(currentIndex + direction + projects.length) % projects.length];
    if (next) openProject(next);
  }

  return (
    <main className="portfolio-shell" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? 0; }} onTouchEnd={(event) => { const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current; if (activeProject && Math.abs(distance) > 65) moveProject(distance < 0 ? 1 : -1); }}>
      <header className="site-nav">
        <div className="nav-inner"><Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, id]) => <a key={id} className={activeSection === id ? "nav-link active" : "nav-link"} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>{label}</a>)}</nav>
          <Button asChild className="nav-cta"><a href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("contact"); }}>Let&apos;s talk <ArrowUpRight size={15} /></a></Button>
          <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, id]) => <a key={id} className={activeSection === id ? "mobile-nav-link active" : "mobile-nav-link"} href={`#${id}`} onClick={(event) => { event.preventDefault(); setMenuOpen(false); scrollToSection(id); }}><span>{label}</span><ArrowUpRight size={15} /></a>)}<a className="mobile-nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); setMenuOpen(false); scrollToSection("contact"); }}>Start a conversation <ArrowUpRight size={16} /></a></nav>}
      </header>

      <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
        <div className="hero-gridline" />
        <div className="hero-copy"><div className="hero-overline"><span className="eyebrow-line" />HELLO, I&apos;M</div>
          <h1 id="hero-title">Devesh<br /><span>Ambekar<span className="hero-period">.</span></span></h1>
          <div className="role-line"><span className="role-prefix">A </span><span key={turn} className="rotating-role">{titles[turn]}</span><span className="role-cursor" aria-hidden="true" /></div>
          <p className="hero-tagline">Building ideas into <span>digital reality.</span></p>
          <p className="hero-description">I&apos;m a Computer Engineering student and technology enthusiast who enjoys transforming complex ideas into practical digital products. I explore software development, AI-powered applications and emerging technologies while building solutions that create real-world impact.</p>
          <div className="hero-actions"><Button onClick={() => scrollToSection("projects")} className="primary-action">Explore my work <ArrowDownRight size={16} /></Button><a href="/devesh-ambekar-resume.pdf" download="Devesh-Ambekar-Resume.pdf" className="text-action">Download résumé <Download size={16} /></a></div>
          <div className="hero-socials" aria-label="Social profiles">{socials.map(({ label, href, Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} title={label}><Icon size={17} /></a>)}<span className="social-rule" /><span className="location-label"><MapPin size={13} /> Pune, India</span></div>
        </div>
        <div className="hero-visual" aria-label="Devesh Ambekar monogram and available for opportunities"><div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" /><div className="portrait-frame"><div className="portrait-grid" /><div className="portrait-index">TECHNOLOGY<br />WITH PURPOSE</div><div className="portrait-letters">D<span>A</span><i>.</i></div><div className="portrait-bottom"><span>DEVELOPING<br />WHAT&apos;S NEXT</span><span className="portrait-asterisk">✳</span></div></div>
          <div className="float-tag float-react"><span>◈</span> React</div><div className="float-tag float-python"><span>⌘</span> Python</div><div className="float-tag float-flutter"><span>◉</span> Flutter</div><div className="float-tag float-ai"><Sparkles size={14} /> AI / ML</div><div className="availability-pill"><i /><span>Open to<br />opportunities</span><ArrowUpRight size={14} /></div>
          <span className="visual-caption">CURIOUS BY NATURE. BUILDER BY CHOICE.</span>
        </div>
        <a className="hero-scroll" href="#about" onClick={(event) => { event.preventDefault(); scrollToSection("about"); }}><span>Scroll to explore</span><ArrowDown size={14} /></a>
        <span className="hero-coordinate">18°27&apos; N &nbsp; 73°50&apos; E</span>
      </section>

      <section className="about-section section-wrap section-space" id="about">
        <SectionHeading eyebrow="A little about me" title={<>Beyond the<br /><span>code.</span></>} number="01" />
        <div className="about-layout"><div className="about-intro"><span className="about-lead">Technology gets interesting when it makes something <em>meaningfully better.</em></span><p>I&apos;m Devesh, a Computer Engineering student at Zeal College of Engineering &amp; Research, Pune. I enjoy working across the full product lifecycle: understanding the problem, shaping the interface, building the backend and testing what I make.</p><p>Outside the code, I&apos;m the founder of <strong>Deep Root Studios</strong>—a chance to learn about entrepreneurship, coordinate people and ideas, and turn a shared vision into real work.</p><a className="inline-arrow-link" href="#experience" onClick={(event) => { event.preventDefault(); scrollToSection("experience"); }}>A bit about my journey <ArrowRight size={16} /></a></div><div className="strength-list">{strengths.map(({ number, title, text, Icon }) => <article className="strength-row" key={number}><span className="strength-index">{number}</span><Icon className="strength-icon" size={19} /><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="strength-arrow" size={16} /></article>)}</div></div>
      </section>

      <section className="skills-section section-wrap section-space" id="skills"><SectionHeading eyebrow="What I work with" title={<>My technical<br /><span>arsenal.</span></>} number="02" body="A growing toolkit, built around solving the problem—not just collecting technologies." />
        <div className="skills-grid">{skillGroups.map((group) => <article className="skill-group" key={group.number}><div className="skill-group-top"><span>{group.number}</span><Code2 size={17} /></div><h3>{group.title}</h3><div className="tag-cloud">{group.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="projects-section section-wrap section-space" id="projects"><SectionHeading eyebrow="Selected work · 2024—2026" title={<>Things I&apos;ve<br /><span>built.</span></>} number="03" body="Ideas made tangible. A selection of products and experiments I’ve helped bring to life." /><div className="project-grid">{projects.map((project) => <article key={project.id} className={project.featured ? "project-card project-featured" : "project-card"}>
          <button className={project.featured ? "project-image project-cover" : `project-image project-cover project-art-${project.id}`} onClick={() => openProject(project)} aria-label={`View ${project.name} details`}>{project.featured && <img src={shramsetuCover} width={1536} height={1024} loading="lazy" alt="A network of connected neighborhoods and local worker service points" />}<span className="project-image-grain" /><span className="project-number">PROJECT / {project.number}</span>{project.featured ? <><span className="cover-map-marker marker-a">●</span><span className="cover-map-marker marker-b">●</span><span className="cover-map-label">CONNECTED BY COMMUNITY</span></> : <span className="project-art-monogram">{project.id === "thrivesphere" ? "TS" : project.id === "farmbridge" ? "FB" : project.id === "feedback" ? "SF" : "DR"}<span>.</span></span>}<span className="image-open"><ArrowUpRight size={16} /></span>{project.featured && <span className="featured-label"><Sparkles size={12} /> FEATURED BUILD</span>}</button>
          <div className="project-content"><div className="project-type">{project.category}</div><div className="project-title-line"><h3>{project.name}</h3>{project.proof && <span className="test-proof"><Check size={12} /> 201 / 201 tests</span>}</div><p>{project.description}</p><div className="project-bottom"><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Button variant="ghost" className="project-open-button" onClick={() => openProject(project)}>Details <ArrowUpRight size={15} /></Button></div><div className="project-outbound"><a href="https://github.com/DEVESHAMBEKAR" target="_blank" rel="noreferrer"><Github size={14} /> GitHub profile <ExternalLink size={12} /></a><button onClick={() => openProject(project)}>Preview <ArrowUpRight size={13} /></button></div></div>
        </article>)}</div>
      </section>

      <section className="experience-section section-wrap section-space" id="experience"><SectionHeading eyebrow="Where I’m headed" title={<>My professional<br /><span>journey.</span></>} number="04" /><div className="timeline">{milestones.map((item, index) => <article className="timeline-item" key={item.company}><div className="timeline-rail"><span className={index === 0 ? "timeline-dot current" : "timeline-dot"} /><span className="timeline-number">0{index + 1}</span></div><div className="timeline-body"><div className="timeline-meta"><span>{item.date}</span><ArrowUpRight size={15} /></div><h3>{item.title}<span> · {item.company}</span></h3><p>{item.text}</p><div className="timeline-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>

      <section className="education-section section-wrap section-space" id="education"><SectionHeading eyebrow="A strong foundation" title={<>Academic<br /><span>background.</span></>} number="05" /><article className="education-card"><div className="education-symbol"><GraduationCap size={27} /></div><div className="education-main"><span className="education-kicker">BACHELOR OF ENGINEERING</span><h3>Computer Engineering</h3><p>Zeal College of Engineering &amp; Research, Pune</p><span className="education-university">Savitribai Phule Pune University</span><div className="coursework"><span>FOUNDATIONS</span><i /> Object-oriented programming <i /> Data structures &amp; algorithms <i /> Systems</div></div><div className="education-year"><span>EXPECTED GRADUATION</span><strong>May 2027</strong></div><div className="education-watermark">BE</div></article></section>

      <section className="profiles-section section-wrap section-space" id="profiles"><SectionHeading eyebrow="Keep learning, keep making" title={<>Always learning.<br /><span>Always improving.</span></>} number="06" body="Places I share what I build, keep up the practice and meet the wider technology community." /><div className="profile-list">{[
          { name: "GitHub", label: "Code, experiments & repositories", href: socials[0].href, Icon: Github, note: "BUILD IN PUBLIC" },
          { name: "LeetCode", label: "Problem-solving & algorithms", href: socials[2].href, Icon: Terminal, note: "STAY SHARP" },
          { name: "LinkedIn", label: "Professional network & updates", href: socials[1].href, Icon: Linkedin, note: "LET’S CONNECT" },
        ].map(({ name, label, href, Icon, note }, index) => <a className="profile-card" key={name} href={href} target="_blank" rel="noreferrer"><span className="profile-index">0{index + 1}</span><span className="profile-icon"><Icon size={20} /></span><span className="profile-info"><strong>{name}</strong><span>{label}</span></span><span className="profile-note">{note}</span><ArrowUpRight className="profile-arrow" size={19} /></a>)}</div></section>

      <section className="contact-section section-wrap section-space" id="contact"><div className="contact-topline"><span className="eyebrow"><span className="eyebrow-line" />HAVE A GOOD ONE IN MIND?</span><span className="section-number">07<span> / 08</span></span></div><div className="contact-layout"><div className="contact-copy"><h2>Have an idea?<br /><span>Let&apos;s build</span><br />something.</h2><p>I&apos;m always interested in connecting with people, exploring opportunities and collaborating on meaningful technology projects.</p><div className="contact-email-block"><span>DROP A NOTE DIRECTLY</span><a href="mailto:deveshambekar@outlook.com">deveshambekar@outlook.com <ArrowUpRight size={16} /></a><Button variant="ghost" size="sm" className="copy-email" onClick={copyEmail}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy email"}</Button></div><div className="contact-socials">{socials.slice(0, 3).map(({ label, href, Icon }) => <a href={href} target="_blank" rel="noreferrer" key={label} aria-label={label}><Icon size={17} /></a>)}</div></div>
          <form className="contact-form" onSubmit={handleContact} noValidate><div className="form-heading"><span>01 / A NEW CONNECTION</span><MessageCircle size={17} /></div><div className="form-row"><label>Your name<Input name="name" autoComplete="name" placeholder="What should I call you?" maxLength={100} required /></label><label>Email address<Input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={255} required /></label></div><label>Subject<Input name="subject" placeholder="What’s on your mind?" maxLength={150} required /></label><label>Your message<Textarea name="message" placeholder="Tell me a little about what you’re working on..." maxLength={3000} minLength={10} rows={5} required /></label><div className="form-submit-row"><Button type="submit" className="primary-action" disabled={sending}>Send message <Send size={15} /></Button><span>Opens in your email app</span></div></form></div></section>

      <footer className="site-footer section-wrap"><div className="footer-main"><div><Wordmark footer /><p>Designed with curiosity.<br />Built with purpose.</p></div><div className="footer-links"><span>FIND YOUR WAY</span><div>{navItems.slice(1, 5).map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>{label}</a>)}</div></div><div className="footer-links footer-connect"><span>ELSEWHERE</span><div>{socials.map(({ label, href }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label} <ArrowUpRight size={12} /></a>)}</div></div></div><div className="footer-bottom"><span>© 2026 DEVESH AMBEKAR. ALL RIGHTS RESERVED.</span><a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }}>BACK TO TOP <ArrowUpRight size={13} /></a><span>MADE WITH INTENTION <span className="footer-star">✳</span></span></div></footer>

      {showTop && <Button variant="outline" size="icon" className="back-to-top" aria-label="Back to top" onClick={() => scrollToSection("home")}><ChevronDown size={18} /></Button>}
      <Dialog open={activeProject !== null} onOpenChange={(open) => { if (!open) closeProject(); }}><DialogContent className="project-dialog"><DialogHeader><DialogDescription>{activeProject?.category} <span>·</span> PROJECT {activeProject?.number}</DialogDescription><DialogTitle>{activeProject?.name}</DialogTitle></DialogHeader>{activeProject && <><p className="dialog-summary">{activeProject.details}</p><div className="dialog-highlights">{activeProject.highlights?.map((item) => <span key={item}><Check size={13} />{item}</span>)}</div><div className="dialog-stack-label">BUILT WITH</div><div className="dialog-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{activeProject.proof && <div className="dialog-proof"><Check size={16} /><span><strong>201 / 201</strong> automated tests passed</span><span>VERIFIED MILESTONE</span></div>}<div className="dialog-footer"><a href="https://github.com/DEVESHAMBEKAR" target="_blank" rel="noreferrer" className="dialog-github"><Github size={16} /> View GitHub profile <ArrowUpRight size={14} /></a><div className="dialog-pagination"><Button variant="outline" size="icon" aria-label="Previous project" onClick={() => moveProject(-1)}><ArrowRight className="rotate-180" size={15} /></Button><Button variant="outline" size="icon" aria-label="Next project" onClick={() => moveProject(1)}><ArrowRight size={15} /></Button></div></div></>}</DialogContent></Dialog>
    </main>
  );
}
