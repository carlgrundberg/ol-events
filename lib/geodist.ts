const earthRadius = 6371000;

export type Coords = [number, number];

function getDistance(start: Coords, end: Coords) {
  const latDelta = ((end[0] - start[0]) * Math.PI) / 180;
  const lonDelta = ((end[1] - start[1]) * Math.PI) / 180;
  const lat1Rad = (start[0] * Math.PI) / 180;
  const lat2Rad = (end[0] * Math.PI) / 180;
  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance / 10000;
}

export default getDistance;
