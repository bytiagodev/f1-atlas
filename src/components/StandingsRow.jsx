export default function StandingsRow({
  position,
  name,
  nationality,
  extra,
  wins,
  points,
}) {
  return (
    <tr className="border-b border-gray-800">
      <td className="py-2 pr-4">{position}</td>
      <td className="py-2 pr-4">{name}</td>
      <td className="py-2 pr-4">{nationality}</td>
      {extra !== null && <td className="py-2 pr-4">{extra}</td>}
      <td className="py-2 pr-4 text-right">{wins}</td>
      <td className="py-2 text-right">{points}</td>
    </tr>
  );
}
