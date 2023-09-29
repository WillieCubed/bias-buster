/**
 * Component properties for the InviteOthersLinkBox component.
 */
interface InviteOthersLinkBoxProps {
  /**
   * The ID of the game session.
   */
  gameId: string | null;
}

/**
 * A box that displays a link that can be used to invite others to join a game.
 *
 * If the game ID is not available, the box will display a placeholder.
 */
export default function InviteOthersLinkBox({
  gameId,
}: InviteOthersLinkBoxProps) {
  const gameIdSegment = gameId ? `${gameId}` : "...";

  const gameUrlBase = `${
    process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_APP_URL
  }/game/`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${gameUrlBase}${gameIdSegment}`);
  };

  return (
    <div className="space-y-4" onClick={copyToClipboard}>
      <div className="text-label-large">Invite others to join</div>
      <div className="inline-block p-4 space-x-2 rounded-lg bg-surface-foreground cursor-pointer hover:text-primary">
        <span className="text-title-medium">
          {gameUrlBase}
          <span>{gameIdSegment}</span>
        </span>
      </div>
    </div>
  );
}
