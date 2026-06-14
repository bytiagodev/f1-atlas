import { Link } from "react-router";

export default function StandingsRow({
  position,
  name,
  nationality,
  extra,
  wins,
  points,
  link,
}) {
  return (
    <tr className="border-b border-white/[0.04]">
      <td className="py-2.5 pr-4 text-white/50">{position}</td>
      <td className="py-2.5 pr-4 font-medium">
        {link ? (
          <Link to={link} className="hover:text-white/70 transition-colors">
            {name}
          </Link>
        ) : (
          name
        )}
      </td>
      <td className="py-2.5 pr-4 text-white/45">{nationality}</td>
      {extra !== null && <td className="py-2.5 pr-4 text-white/45">{extra}</td>}
      <td className="py-2.5 pr-4 text-right text-white/50">{wins}</td>
      <td className="py-2.5 text-right font-medium">{points}</td>
    </tr>
  );
}