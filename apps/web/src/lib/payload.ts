export const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000';

export async function getPayloadData(collection: string, slug?: string) {
  try {
    const url = slug 
      ? `${PAYLOAD_URL}/api/${collection}?where[slug][equals]=${slug}`
      : `${PAYLOAD_URL}/api/${collection}`;
    
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${collection}: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    return null;
  }
}
