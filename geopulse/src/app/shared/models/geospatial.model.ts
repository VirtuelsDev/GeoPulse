export interface Territory {
  id: number;
  code: string;
  name: string;
  type: string;
  country: string;
  region?: string;
  population?: number;
  areaKm2?: number;
  latitude?: number;
  longitude?: number;
  boundary?: any; // GeoJSON
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Layer {
  id: string;
  name: string;
  type: 'vector' | 'raster';
  visible: boolean;
  opacity: number;
}
