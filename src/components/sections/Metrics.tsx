import Container from '../ui/Container';
import Stat from '../ui/Stat';
import Reveal from '../ui/Reveal';

const metrics = [
    { value: 500, suffix: '+', label: 'hours saved / month' },
    { value: 85, suffix: '%', label: 'operational cost cut' },
    { value: 3, suffix: 'x', label: 'faster deployment' },
    { value: 100, suffix: '%', label: 'client satisfaction' },
];

const Metrics = () => (
    <section className="border-y border-line bg-paper py-14">
        <Container>
            <Reveal>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {metrics.map((m) => (
                        <div key={m.label} className="text-center md:text-left">
                            <Stat value={m.value} suffix={m.suffix} label={m.label} />
                        </div>
                    ))}
                </div>
            </Reveal>
        </Container>
    </section>
);

export default Metrics;
