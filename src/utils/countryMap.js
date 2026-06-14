const countryToISO = {
  "Australia": "au",
  "Austria": "at",
  "Azerbaijan": "az",
  "Bahrain": "bh",
  "Belgium": "be",
  "Brazil": "br",
  "Canada": "ca",
  "China": "cn",
  "France": "fr",
  "Germany": "de",
  "Hungary": "hu",
  "India": "in",
  "Italy": "it",
  "Japan": "jp",
  "Mexico": "mx",
  "Monaco": "mc",
  "Netherlands": "nl",
  "Portugal": "pt",
  "Qatar": "qa",
  "Russia": "ru",
  "Saudi Arabia": "sa",
  "Singapore": "sg",
  "South Africa": "za",
  "South Korea": "kr",
  "Spain": "es",
  "Sweden": "se",
  "Switzerland": "ch",
  "Thailand": "th",
  "Turkey": "tr",
  "UAE": "ae",
  "UK": "gb",
  "USA": "us",
};

export function getCountryISO(country) {
  return countryToISO[country] || null;
}

export function getFlagUrl(country, size = 40) {
  const iso = getCountryISO(country);
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}