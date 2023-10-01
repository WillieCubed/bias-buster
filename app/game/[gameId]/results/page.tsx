import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/app/supabase-server";

interface GameResultsPageProps {
  params: {
    gameId: string;
  };
}

export default async function GameResultsPage({
  params: { gameId },
}: GameResultsPageProps) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // TODO: Fetch game data from API
  const {
    correctCount,
    totalQuestions,
    correctArticles,
    incorrectQuestions,
    finalScore,
  } = await fetchGameResults(gameId, user.id);

  const bigMessage = "Nice job!";

  return (
    <div className="max-w-7xl mx-auto">
      <section>
        <div>{/* Image */}</div>
        <div className="space-y-6">
          <div className="text-headline-large">{bigMessage}</div>
          <div className="text-headline-medium">
            {correctCount}/{totalQuestions} correct
          </div>
          <div className="text-title-large">Final score</div>
          <div className="text-display-medium">{finalScore}</div>
        </div>
      </section>
      <section className="flex">
        <div>
          <h1 className="text-headline-small">Correct</h1>
        </div>
        <div>
          <h1 className="text-headline-small">Incorrect</h1>
        </div>
      </section>
    </div>
  );
}

function QuestionResultItem({ correct, title, readMoreUrl }: QuestionResult) {
  return (
    <div className="inline-flex space-x-2">
      <div>{correct ? "✅" : "❌"}</div>
      <div className="flex-1 space-y-2">
        <div className="text-title-medium">{title}</div>
        <div className="text-title-medium text-primary">{readMoreUrl}</div>
      </div>
    </div>
  );
}

type QuestionResult = {
  correct: boolean;
  title: string;
  readMoreUrl: string;
};

type GameResults = {
  gameId: string;
  userId: string;
  finalScore: number;
  correctCount: number;
  totalQuestions: number;
  correctArticles: QuestionResult[];
  incorrectQuestions: QuestionResult[];
};

async function fetchGameResults(
  gameId: string,
  userId: string,
): Promise<GameResults> {
  // const response = await fetch(`/api/game/${gameId}?player`);
  // const data = await response.json();
  const data: GameResults = {
    gameId: "test",
    userId: userId,
    finalScore: 0,
    correctCount: 0,
    totalQuestions: 0,
    correctArticles: [],
    incorrectQuestions: [],
  };
  return data;
}
