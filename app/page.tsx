import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className="lg:grid lg:grid-cols-12">
      <div className="my-4 sticky top-4 lg:col-start-3 lg:col-span-8 lg:row-span-1">
        <SiteHeader />
      </div>
      <section
        id="hero"
        className="mt-[72px] flex lg:row-start-2 lg:col-start-3 lg:col-span-8 space-x-4"
      >
        <div className="h-[456px] aspect-square bg-slate-300"></div>
        <div className="space-y-6">
          <div className="text-display-medium">NewsReal</div>
          <div className="text-display-small">
            Think you have what it takes to outsmart an AI?
          </div>
          <Link
            href="/game"
            className="inline-block text-title-large bg-primary hover:shadow-lg transition ease-in-out text-white rounded-xl px-4 py-3"
          >
            Play now
          </Link>
        </div>
      </section>
    </div>
  );
}
