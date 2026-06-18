export interface Territory {
  id: string;
  name: string;
  boundary: any; // GeoJSON
  center: [number, number];
}

export interface Layer {
  id: string;
  name: string;
  type: 'vector' | 'raster';
  visible: boolean;
  opacity: number;
}
