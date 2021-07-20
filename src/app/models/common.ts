export function randomNumber(base: number = 0, modifier: number = 0): number {
  return base + Math.round(Math.random() * modifier);
}
