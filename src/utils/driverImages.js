// F1 CDN driver headshot mapping (2026 grid)
// Uses Cloudinary transforms for face-centered thumbnails

const CDN_BASE =
  "https://media.formula1.com/image/upload/c_fill,w_90,h_90,g_auto/q_auto/f_auto";
const CDN_FALLBACK =
  "d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp";
const CDN_PATH = "v1740000001/common/f1/2026";

const DRIVERS = {
  VER: { team: "redbullracing", code: "maxver01" },
  HAD: { team: "redbullracing", code: "isahad01" },
  RUS: { team: "mercedes", code: "georus01" },
  ANT: { team: "mercedes", code: "andant01" },
  LEC: { team: "ferrari", code: "chalec01" },
  HAM: { team: "ferrari", code: "lewham01" },
  NOR: { team: "mclaren", code: "lannor01" },
  PIA: { team: "mclaren", code: "oscpia01" },
  ALO: { team: "astonmartin", code: "feralo01" },
  STR: { team: "astonmartin", code: "lanstr01" },
  GAS: { team: "alpine", code: "piegas01" },
  COL: { team: "alpine", code: "frocol01" },
  OCO: { team: "haasf1team", code: "estoco01" },
  BEA: { team: "haasf1team", code: "olibea01" },
  LAW: { team: "racingbulls", code: "lialaw01" },
  LIN: { team: "racingbulls", code: "arvlin01" },
  HUL: { team: "audi", code: "nichul01" },
  BOR: { team: "audi", code: "gabbor01" },
  ALB: { team: "williams", code: "alealb01" },
  SAI: { team: "williams", code: "carsai01" },
  BOT: { team: "cadillac", code: "valbot01" },
  PER: { team: "cadillac", code: "serper01" },
};

export function getDriverImageUrl(driverCode) {
  const driver = DRIVERS[driverCode];
  if (!driver) return null;
  return `${CDN_BASE}/${CDN_FALLBACK}/${CDN_PATH}/${driver.team}/${driver.code}/2026${driver.team}${driver.code}right.webp`;
}
