export default function Loading() {
  return (
    <div
      className="
        flex
        min-h-[240px]
        w-full
        flex-col
        items-center
        justify-center
        gap-4
      "
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Soft purple glow */}
        <div
          className="
            absolute
            inset-1
            rounded-full
            bg-violet-500/15
            blur-lg
            dark:bg-violet-500/20
          "
        />

        {/* Spinner */}
        <div
          className="
            relative
            h-12
            w-12
            animate-spin
            rounded-full
            border-4
            border-[#E4DDED]
            border-t-[#7C3AED]
            border-r-[#4C1D95]
            dark:border-[rgba(171,132,255,0.17)]
            dark:border-t-[#7C3AED]
            dark:border-r-[#6D28D9]
          "
        />

        {/* Center dot */}
        <div
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-[#7C3AED]
            shadow-[0_0_12px_rgba(124,58,237,0.65)]
          "
        />
      </div>

      <div className="text-center">
        <p
          className="
            m-0
            text-sm
            font-bold
            text-[#15111C]
            dark:text-white
          "
        >
          Loading PrepPath
        </p>

        <p
          className="
            mt-1
            text-xs
            text-[#6E6476]
            dark:text-[#C8BCD3]
          "
        >
          Getting everything ready...
        </p>
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
}