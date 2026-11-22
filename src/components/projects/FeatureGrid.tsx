import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Spotlight } from "@/components/motion/Spotlight";

export function FeatureGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <Stagger
      as="ul"
      stagger={0.06}
      className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((f) => (
        <StaggerItem as="li" key={f.title} className="bg-surface">
          <Spotlight className="group h-full p-6 transition-colors duration-200 hover:bg-elevated">
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sub">{f.text}</p>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </Spotlight>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
