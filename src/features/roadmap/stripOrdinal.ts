export function stripOrdinal(name: string, position: number): string {
  const match = /^\s*(\d+)\.\s*/.exec(name);
  return match && Number(match[1]) === position ? name.slice(match[0].length) : name;
}
