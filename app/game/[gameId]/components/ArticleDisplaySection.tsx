"use client";

/**
 * Component properties for ArticleDisplaySection.
 */
interface ArticleDisplaySectionProps {
  /**
   * The ID of the article.
   */
  articleId: string;
  /**
   * The label for the selection button.
   *
   * @example "Option 1"
   */
  selectionLabel: string;
  /**
   * The title of the article.
   */
  title: string;
  /**
   * The plain text content of the article.
   */
  content: string;
  /**
   * Callback for when this article is selected.
   */
  onSelection: (articleId: string) => void;
}

/**
 * A section that displays some article metadata and a snippet.
 */
export default function ArticleDisplaySection({
  articleId,
  title,
  content,
  selectionLabel,
  onSelection,
}: ArticleDisplaySectionProps) {
  const handleSelection = () => {
    onSelection(articleId);
  };

  return (
    <section className="flex-1">
      <div className="p-6 bg-slate-200 rounded-xl space-y-6">
        <div className="text-title-large">{title}</div>
        <div className="text-body-medium">{content}</div>
      </div>
      <div>
        <button
          className="px-4 py-2 outline outline-2 outline-primary text-primary hover:bg-primary hover:text-on-primary transition ease-in-out rounded-md"
          onClick={handleSelection}
        >
          {selectionLabel}
        </button>
      </div>
    </section>
  );
}
