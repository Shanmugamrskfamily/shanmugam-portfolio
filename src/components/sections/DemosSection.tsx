import Demos from '@/components/demos/Demos';

export default function DemosSection() {
  return (
    <section className="sec" id="demos" aria-labelledby="demos-h">
      <div className="intro" data-reveal>
        <p className="eyebrow">Live demos</p>
        <h2 className="h2" id="demos-h">
          Two problems from production, small enough to try here.
        </h2>
        <p>
          Both rebuild modules I shipped on the DEET portal. They&apos;re written fresh for this
          page, with no production code or data.
        </p>
      </div>
      <Demos />
    </section>
  );
}
