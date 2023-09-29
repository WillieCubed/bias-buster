"use client";

import { useState } from "react";
import { useGameSession } from "../../session-provider";
import ArticleDisplaySection from "./ArticleDisplaySection";

/**
 * A canvas for displaying the current round's articles.
 *
 * This component may only be used within a GameSessionProvider.
 */
export default function GameCanvas() {
  const {} = useGameSession();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  function swapCanvas() {
    // Show feedback
    // Get next article
  }

  const handleSelection = (articleId: string) => {
    setSelectedArticle(articleId);
  };

  // TODO: Swap canvas when time runs out
  return (
    <div className="flex space-x-4">
      <ArticleDisplaySection
        title={
          "U.S. Provided Canada With Intelligence on Killing of Sikh Leader"
        }
        content={`American spy agencies provided information to Ottawa after the killing of a Sikh separatist leader in the Vancouver area, but Canada developed the most definitive intelligence that led it to accuse India of orchestrating the plot, according to Western allied officials.
In the aftermath of the killing, U.S. intelligence agencies offered their Canadian counterparts context that helped Canada conclude that India had been involved. Yet what appears to be the “smoking gun,” intercepted communications of Indian diplomats in Canada indicating involvement in the plot, was gathered by Canadian officials, allied officials said.
While Secretary of State Antony J. Blinken has called on India to cooperate with the Canadian investigation, American officials have largely tried to avoid triggering any diplomatic blowback from India. But the disclosure of the involvement of U.S. intelligence risks ensnaring Washington in the diplomatic battle between Canada and India at a time when it is keen to develop New Delhi as a closer partner.
The United States did not learn about the plot, or evidence pointing to India’s involvement in it, until after operatives had killed the Sikh leader, Hardeep Singh Nijjar, allied officials said.`}
        articleId={"article-1"}
        selectionLabel={"Option A"}
        onSelection={handleSelection}
      />
      <ArticleDisplaySection
        title={
          "U.S. Provided Canada With Intelligence on Killing of Sikh Leader"
        }
        content={`American spy agencies provided information to Ottawa after the killing of a Sikh separatist leader in the Vancouver area, but Canada developed the most definitive intelligence that led it to accuse India of orchestrating the plot, according to Western allied officials.
In the aftermath of the killing, U.S. intelligence agencies offered their Canadian counterparts context that helped Canada conclude that India had been involved. Yet what appears to be the “smoking gun,” intercepted communications of Indian diplomats in Canada indicating involvement in the plot, was gathered by Canadian officials, allied officials said.
While Secretary of State Antony J. Blinken has called on India to cooperate with the Canadian investigation, American officials have largely tried to avoid triggering any diplomatic blowback from India. But the disclosure of the involvement of U.S. intelligence risks ensnaring Washington in the diplomatic battle between Canada and India at a time when it is keen to develop New Delhi as a closer partner.
The United States did not learn about the plot, or evidence pointing to India’s involvement in it, until after operatives had killed the Sikh leader, Hardeep Singh Nijjar, allied officials said.`}
        articleId={"article-2"}
        selectionLabel={"Option B"}
        onSelection={handleSelection}
      />
    </div>
  );
}
