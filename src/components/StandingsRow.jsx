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
    <tr className="border-b border-gray-800">
      <td className="py-2 pr-4">{position}</td>
      <td className="py-2 pr-4">
        {link ? (
          <Link to={link} className="hover:text-white underline">
            {name}
          </Link>
        ) : (
          name
        )}
      </td>
      <td className="py-2 pr-4">{nationality}</td>
      {extra !== null && <td className="py-2 pr-4">{extra}</td>}
      <td className="py-2 pr-4 text-right">{wins}</td>
      <td className="py-2 text-right">{points}</td>
    </tr>
  );
}