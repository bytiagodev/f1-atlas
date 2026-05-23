export const API_BASE = "https://api.jolpi.ca/ergast/f1/";

export async function fetchF1(endpoint) {
  const response = await fetch(API_BASE + endpoint);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.MRData;
}