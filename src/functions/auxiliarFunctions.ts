export function getPodiumPosition(position: number) {
  switch (position) {
    case 1:
      return "first";
    case 2:
      return "second";
    case 3:
      return "third";
    default:
      return "offThePodium";
  }
}

export function formatTime(minutes: number) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  return `${days}d : ${hours}h : ${mins}m`;
}
