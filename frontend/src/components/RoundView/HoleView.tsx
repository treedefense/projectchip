export function HoleView({ id, par, strokes }: { id: number; par: number; strokes: number; }) {
  return <div>Hole {id}: {strokes} / {par}</div>;
}
