import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Kpi {
  label: string;
  value: string;
  trend: number;
  icon: string;
  color: string;
}

export interface Analysis {
  title: string;
  type: string;
  date: string;
  status: 'Terminé' | 'En cours' | 'Échec';
}

export interface Alert {
  criticality: 'Faible' | 'Moyen' | 'Élevé' | 'Critique';
  location: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/territories/metrics/';

  kpis = signal<Kpi[]>([]);

  constructor() {
    this.fetchKpis();
  }

  fetchKpis() {
    const iconMap: Record<string, string> = {
      'population_total': 'people',
      'urban_growth': 'trending_up',
      'new_constructions': 'business',
      'risk_zones': 'warning'
    };

    const colorMap: Record<string, string> = {
      'population_total': '#6C5CE7',
      'urban_growth': '#00B894',
      'new_constructions': '#FDCB6E',
      'risk_zones': '#E17055'
    };

    this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(m => ({
        label: m.label,
        value: `${m.value.toLocaleString()} ${m.unit}`,
        trend: m.trend,
        icon: iconMap[m.name] || 'analytics',
        color: colorMap[m.name] || '#636E72'
      })))
    ).subscribe(metrics => {
      if (metrics.length > 0) {
        this.kpis.set(metrics);
      } else {
        // Fallback to mock if API returns nothing (e.g. fresh install)
        this.kpis.set([
          { label: 'Population totale', value: '2 548 721 hab.', trend: 2.5, icon: 'people', color: '#6C5CE7' },
          { label: 'Croissance urbaine', value: '18.4 km²', trend: 12.7, icon: 'trending_up', color: '#00B894' },
          { label: 'Nouvelles constructions', value: '352', trend: 8.6, icon: 'business', color: '#FDCB6E' },
          { label: 'Zones à risque', value: '23', trend: -4.3, icon: 'warning', color: '#E17055' }
        ]);
      }
    });
  }

  analyses = signal<Analysis[]>([
    { title: 'Impact d\'un nouveau parc urbain', type: 'Simulation', date: '12/06/2026', status: 'Terminé' },
    { title: 'Densification secteur Nord', type: 'Analyse foncière', date: '11/06/2026', status: 'Terminé' },
    { title: 'Accessibilité aux écoles', type: 'Analyse transport', date: '10/06/2026', status: 'En cours' }
  ]);

  alerts = signal<Alert[]>([
    { criticality: 'Élevé', location: 'Quartier 12 - Nord', date: 'Il y a 2h' },
    { criticality: 'Moyen', location: 'Zone Industrielle Est', date: 'Il y a 5h' },
    { criticality: 'Critique', location: 'Bassin versant Sud', date: 'Hier' }
  ]);

  growthData = signal({
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [12, 12.5, 13.2, 14.1, 14.8, 15.5, 16.2, 16.8, 17.3, 17.8, 18.2, 18.4]
  });
}
