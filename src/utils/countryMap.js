const countryToISO = {
  "Argentina": "ar",
  "Australia": "au",
  "Austria": "at",
  "Azerbaijan": "az",
  "Bahrain": "bh",
  "Belgium": "be",
  "Brazil": "br",
  "Canada": "ca",
  "China": "cn",
  "Colombia": "co",
  "France": "fr",
  "Germany": "de",
  "Hungary": "hu",
  "India": "in",
  "Indonesia": "id",
  "Italy": "it",
  "Japan": "jp",
  "Korea": "kr",
  "Malaysia": "my",
  "Mexico": "mx",
  "Monaco": "mc",
  "Morocco": "ma",
  "Netherlands": "nl",
  "New Zealand": "nz",
  "Peru": "pe",
  "Philippines": "ph",
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

function getCountryISO(country) {
  return countryToISO[country] || null;
}

export function getFlagUrl(country, size = 40) {
  const iso = getCountryISO(country);
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}
