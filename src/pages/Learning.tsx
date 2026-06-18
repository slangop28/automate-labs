import { useMemo, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Icons from '../components/ui/Icons';

type Category = 'automation' | 'agents' | 'content' | 'foundations';
type ResType = 'Tool' | 'Docs' | 'Course' | 'Free';

interface Resource {
    name: string;
    desc: string;
    url: string;
    category: Category;
    type: ResType;
}

const RESOURCES: Resource[] = [
    // Automation
    { name: 'n8n', desc: 'Open-source workflow automation — the engine behind most of what we build.', url: 'https://n8n.io', category: 'automation', type: 'Tool' },
    { name: 'Make', desc: 'Visual, no-code automation builder. Great for connecting apps fast.', url: 'https://www.make.com', category: 'automation', type: 'Tool' },
    { name: 'Zapier', desc: 'The most beginner-friendly way to wire two apps together.', url: 'https://zapier.com', category: 'automation', type: 'Tool' },
    { name: 'Supabase', desc: 'Open-source Postgres backend with auth — our default database.', url: 'https://supabase.com', category: 'automation', type: 'Tool' },
    // AI agents & LLMs
    { name: 'Claude', desc: "Anthropic's AI assistant — what we reach for for reasoning and building agents.", url: 'https://claude.ai', category: 'agents', type: 'Tool' },
    { name: 'Anthropic Docs', desc: 'Official guides for building with Claude, tools, and the API.', url: 'https://docs.anthropic.com', category: 'agents', type: 'Docs' },
    { name: 'Prompting Guide', desc: 'A clear, free reference for prompt engineering techniques.', url: 'https://www.promptingguide.ai', category: 'agents', type: 'Free' },
    { name: 'LangChain Docs', desc: 'Framework and patterns for chaining LLM calls and building agents.', url: 'https://python.langchain.com', category: 'agents', type: 'Docs' },
    // Content & video
    { name: 'Remotion', desc: 'Create videos programmatically in React — how we automate Reels.', url: 'https://www.remotion.dev', category: 'content', type: 'Tool' },
    { name: 'ElevenLabs', desc: 'Realistic AI voices for narration, agents, and dubbing.', url: 'https://elevenlabs.io', category: 'content', type: 'Tool' },
    { name: 'Runway', desc: 'AI video generation and editing for cinematic content.', url: 'https://runwayml.com', category: 'content', type: 'Tool' },
    // Foundations / learn
    { name: 'Neural Networks: Zero to Hero', desc: "Andrej Karpathy's free course on how LLMs actually work.", url: 'https://karpathy.ai/zero-to-hero.html', category: 'foundations', type: 'Course' },
    { name: 'DeepLearning.AI', desc: 'Short, practical courses on AI and prompt engineering.', url: 'https://www.deeplearning.ai/short-courses/', category: 'foundations', type: 'Course' },
    { name: 'freeCodeCamp', desc: 'Free, full-length tutorials on coding, Python, and AI.', url: 'https://www.freecodecamp.org', category: 'foundations', type: 'Free' },
];

const FILTERS: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'Everything' },
    { id: 'automation', label: 'Automation' },
    { id: 'agents', label: 'AI Agents & LLMs' },
    { id: 'content', label: 'Content & Video' },
    { id: 'foundations', label: 'Learn the Basics' },
];

const typeStyle: Record<ResType, string> = {
    Tool: 'bg-clay/12 text-clay-deep',
    Docs: 'bg-ink/8 text-ink',
    Course: 'bg-clay/12 text-clay-deep',
    Free: 'bg-ink/8 text-ink',
};

const Learning = () => {
    const [cat, setCat] = useState<Category | 'all'>('all');
    const [query, setQuery] = useState('');

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return RESOURCES.filter((r) => {
            const matchesCat = cat === 'all' || r.category === cat;
            const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }, [cat, query]);

    return (
        <div className="min-h-screen bg-cream text-ink">
            <Navbar />

            <section className="bg-grain relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
                <Container className="relative">
                    <Reveal>
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-6 bg-clay" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Free learning hub</span>
                        </div>
                        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                            Learn to build with AI — <span className="text-clay">start here.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                            A hand-picked list of the tools, docs, and courses we actually use and recommend. No fluff —
                            just the fastest path from curious to building.
                        </p>
                    </Reveal>
                </Container>
            </section>

            <section className="pb-24">
                <Container>
                    {/* Search + filters */}
                    <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setCat(f.id)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                        cat === f.id ? 'bg-ink text-paper' : 'border border-line text-ink/70 hover:border-clay hover:text-clay'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search resources…"
                            className="w-full rounded-full border border-line bg-paper px-5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-umber/60 focus:border-clay focus:ring-2 focus:ring-clay/20 md:w-64"
                        />
                    </div>

                    {/* Grid */}
                    {visible.length > 0 ? (
                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {visible.map((r, i) => (
                                <Reveal key={r.name} delay={i * 50} className="h-full">
                                    <a
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lift"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${typeStyle[r.type]}`}>
                                                {r.type}
                                            </span>
                                            <Icons.ArrowUpRight className="h-4 w-4 text-umber transition-all group-hover:text-clay" />
                                        </div>
                                        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">{r.name}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-umber">{r.desc}</p>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-16 text-center text-umber">
                            No resources match that search yet — try a different term.
                        </div>
                    )}
                </Container>
            </section>

            {/* Community CTA */}
            <section className="border-t border-line bg-paper py-20 md:py-24">
                <Container className="max-w-3xl text-center">
                    <Reveal>
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                            Want to go deeper?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-umber">
                            We share daily AI automation breakdowns and walkthroughs. Follow along, or book a call if you'd
                            rather we build it with you.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Button href="https://instagram.com/iamatul_28">
                                Follow @iamatul_28
                                <Icons.ArrowUpRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" href="/#contact">
                                Book a free audit
                            </Button>
                        </div>
                    </Reveal>
                </Container>
            </section>

            <Footer />
        </div>
    );
};

export default Learning;
