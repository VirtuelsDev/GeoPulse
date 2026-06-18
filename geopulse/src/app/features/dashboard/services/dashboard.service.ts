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

  constructor() {
    this.fetchKpis();
  }

  fetchKpis() {
    this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(m => ({
        label: m.label,
        value: `${m.value.toLocaleString()} ${m.unit}`,
        trend: m.trend,
        icon: 'analytics',
        color: '#6C5CE7'
      })))
    ).subscribe(metrics => {
      if (metrics.length > 0) {
        this.kpis.set(metrics);
      } else {
        this.kpis.set([
          { label: 'Population totale', value: '2 548 721 hab.', trend: 2.5, icon: 'people', color: '#6C5CE7' },
          { label: 'Croissance urbaine', value: '18.4 km²', trend: 12.7, icon: 'trending_up', color: '#00B894' },
          { label: 'Nouvelles constructions', value: '352', trend: 8.6, icon: 'business', color: '#FDCB6E' },
          { label: 'Zones à risque', value: '23', trend: -4.3, icon: 'warning', color: '#E17055' }
        ]);
      }
    });
  }
}
