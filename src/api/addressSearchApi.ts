import type { Address, Feature, LatLng } from '../model/model';

// API call function with AbortController support
export async function fetchSearchResults(query: string, center: LatLng, signal: AbortSignal): Promise<Address[]> {
  if (query.length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lat=${center.lat}&lon=${center.lng}&lang=en`,
      { signal } // pass abort signal
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const results: Address[] = data.features.map((feature: Feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      const { name = '', street = '', housenumber = '', postcode = '', city = '', country = '' } = feature.properties;
      const addressDetails = [
        name,
        street && housenumber ? `${street} ${housenumber}` : street || housenumber,
        postcode && city ? `${postcode} ${city}` : postcode || city,
        country
      ]
        .filter(Boolean)
        .join(', ');
      return { displayName: addressDetails, lat, lng };
    });
    return results || [];
  } catch (err: any) {
    // AbortError is expected when request is canceled
    if (err.name !== 'AbortError') {
      console.error('Search API error:', err);
    }
    return [];
  }
}
