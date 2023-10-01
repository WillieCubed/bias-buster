import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import SiteHeader from "@/app/components/SiteHeader";
import heroHeaderImage from "@/app/assets/landing_hero_logo.png";
import topicIcon from "@/app/assets/icons/topic_icon_2.svg";

export default function Home() {
  const topicItems = TOPICS.map((topic) => (
    <TopicItem
      key={topic.id}
      title={topic.title}
      articles={topic.articles}
      icon={topicIcon}
    />
  ));

  return (
    <>
      <div className="lg:grid lg:grid-cols-12">
        <div className="my-4 sticky top-4 lg:col-start-3 lg:col-span-8 lg:row-span-1">
          <SiteHeader />
        </div>
        <section
          id="hero"
          className="mt-[72px] flex space-x-6 g:row-start-2 lg:col-start-3 lg:col-span-8"
        >
          <div className="flex-1">
            <Image
              src={heroHeaderImage}
              height={456}
              alt="" // It's decorative, so no need to add a11y attributes
            />
          </div>
          <div className="flex-1 space-y-6">
            <div className="text-display-medium">NewsReal</div>
            <div className="text-display-small">
              Think you have what it takes to outsmart an AI?
            </div>
            <div className="space-y-2">
              <Link
                href="/game"
                className="mr-2 inline-block text-title-large bg-primary hover:shadow-lg transition ease-in-out text-white rounded-xl px-4 py-3"
              >
                Play with a human
              </Link>
              <Link
                href="/game?bot=true"
                className="inline-block text-title-large bg-primary hover:shadow-lg transition ease-in-out text-white rounded-xl px-4 py-3"
              >
                Play against a bot
              </Link>
            </div>
          </div>
        </section>
        <section
          id="play"
          className="py-24 px-16 lg:row-start-3 lg:col-span-12 bg-slate-200"
        >
          <div>
            <div className="text-display-medium text-center">
              NewsReal helps inocculate people against media and AI bias.
            </div>
            <div className="text-display-medium text-center mt-4">
              Just by playing a game.
            </div>
          </div>
        </section>
        <section id="topics" className="p-4 lg:row-start-4 lg:col-span-12">
          <div className="py-8 first-letter:w-full max-w-4xl mx-auto space-y-4">
            <div className="text-display-small">Popular topics</div>
            <div className="text-title-large">
              Test your knowledge on popular events.
            </div>
            <div className="mt-8 lg:columns-2 space-y-6 lg:space-y-0">
              {topicItems}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="px-4 py-2 bg-surface-foreground-alt">
      <div className="max-w-4xl mx-auto text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="text-label-medium">
          Built with passion by Willie and friends
        </div>
        <div className="mt-2 md:mt-0">
          <a
            className="text-primary text-label-medium"
            href="willie@williecubed.me"
          >
            Contact us
          </a>
        </div>
      </div>
    </footer>
  );
}

type GameTopic = {
  id: string;
  title: string;
  articles: {
    title: string;
    url: string;
  }[];
};

const TOPICS: GameTopic[] = [
  {
    id: "001",
    title: "COVID-19",
    articles: [
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
    ],
  },
  {
    id: "002",
    title: "U.S Politics",
    articles: [
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
    ],
  },
  {
    id: "003",
    title: "U.S Politics",
    articles: [
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
    ],
  },
  {
    id: "004",
    title: "U.S Politics",
    articles: [
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
      {
        title: "COVID-19 pandemic",
        url: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      },
    ],
  },
];

interface TopicItemProps extends Omit<GameTopic, "id"> {
  icon: StaticImageData;
}

function TopicItem({ title, articles, icon }: TopicItemProps) {
  const articleLinks = articles.map((article) => (
    <li key={article.url}>
      <Link href={article.url}>{article.title}</Link>
    </li>
  ));
  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <Image src={icon} alt="" width={48} height={48} />
        </div>
        <div className="text-title-large align-middle">{title}</div>
      </div>
      <div className="space-y-4">
        <div>Including articles similar to:</div>
        <ul className="pl-6 list-disc">{articleLinks}</ul>
      </div>
      <div>
        <Link href={`/game?topic=${title}`}>Play a game</Link>
      </div>
    </div>
  );
}
