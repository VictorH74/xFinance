export const GoalTilePlaceholder = () => {
  return (
    <article
      className="grid gap-2 px-6 py-5 animate-pulse"
      // data-aos-delay={500}
      // data-aos="flip-up"
    >
      <div className="flex flex-row justify-between">
        <div>
          {/* CAT DATA */}
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="rounded-full bg-zinc-300 w-28 h-6" />
          </div>
          <div className="bg-zinc-300 w-56 h-3" />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="bg-zinc-300 w-7 h-4" />
          <div className="rounded-full bg-zinc-300 w-28 h-6" />
        </div>
      </div>
      <div>
        {/* PROGRESS BAR */}
        <div className="h-2 overflow-hidden rounded-full bg-zinc-300" />
      </div>
      <div className="bg-zinc-300 w-56 h-3" />
    </article>
  );
};
