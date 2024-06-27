export function getPodiumPosition(position: number) {
  switch (position) {
    case 1:
      return 'first'
    case 2:
      return 'second' 
    case 3:
      return 'third'
    default:
      return 'offThePodium'
  }
}