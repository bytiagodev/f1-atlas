<p align="center">
  <img src="./docs/f1-atlas-banner.webp" alt="F1 Atlas" width="100%"/>
</p>

<h1 align="center">F1 Atlas</h1>
<h3 align="center">Every season. Every race. Every driver.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/since-1950-e10600?style=for-the-badge&labelColor=15151e" />
  <img src="https://img.shields.io/badge/75+-seasons-white?style=for-the-badge&labelColor=15151e" />
  <img src="https://img.shields.io/badge/open-data-e10600?style=for-the-badge&labelColor=15151e" />
</p>

<p align="center">
  <a href="https://bytiagodev.github.io/f1-atlas"><strong>[ View Live ]</strong></a>
</p>

---

## The Atlas

Formula 1 has been racing since 1950. That is over seven decades of grand prix weekends, world champions, legendary circuits, and teams that came and went. F1 Atlas puts all of it in one place.

This is not a live race tracker. It is not a fan wiki. It is an atlas. You open it, you pick a year, and you start exploring. The data does the talking.

---

## What You Will Find

You land on the current season. The full race calendar is laid out in front of you: every round, every circuit, every date. Races that have already happened are marked. Races still to come sit waiting.

Tap into a race and you get the complete picture. The finishing order, the qualifying breakdown with Q1, Q2, and Q3 times, grid positions, time gaps, points scored. Everything that happened that weekend, in one place.

Switch to the standings and the championship unfolds. Drivers and constructors ranked by points, wins tallied, the title fight told in numbers. Tap any driver's name and you are looking at their full season: every race they entered, where they qualified, where they finished, how many points they scored.

Then there is the season selector. Change the year and the entire app updates. 2024. 2012. 1988. 1950. Same interface, different era. Over seven decades of racing, all navigable from a single dropdown.

---

## Under the Hood

| What | How |
|------|-----|
| **The chassis** | React 19 + Vite 6 |
| **The livery** | Tailwind CSS v4 with a custom editorial palette |
| **The grid** | React Router 7, declarative mode |
| **The telemetry** | [Jolpica F1 API](https://github.com/jolpica/jolpica-f1), the community successor to Ergast |
| **The garage** | GitHub Pages |

No backend. No authentication. No API keys. Everything runs client-side.

---

## On the Radar

A few ideas that belong in this app but have not been built yet.

**Head-to-head.** Pick two drivers, compare their results side by side across a full season. See who had the edge and where.

**Favourites.** Bookmark the drivers and races you care about. Persisted across sessions so they are there when you come back.

**Circuit history.** Tap a circuit and see every winner who has ever raced there. Decades of history at one track.

**Pit stop strategy.** Visualise tyre choices and pit stop timing for any race. See the strategy unfold.

**Sprint results.** Some weekends have sprint races. Show them when the data is there.

**Search.** Find any driver by name, across every season in the database.

---

<p align="center">
  <sub>All race data is provided by the <a href="https://github.com/jolpica/jolpica-f1">Jolpica F1 API</a>, the community-maintained successor to the Ergast API.</sub>
</p>
<p align="center">
  <sub>F1 Atlas is an independent, non-commercial project built out of love for the sport and its history. It is not affiliated with or endorsed by Formula 1, the FIA, or any team, driver, or rights holder. Formula 1 and F1 are trademarks of Formula One Licensing BV.</sub>
</p>