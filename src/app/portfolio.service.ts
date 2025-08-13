import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Portfolio {
  theme: import("c:/Users/2000160739/Desktop/PMS_Backup/pms_frontend/pms/src/app/models/theme.model").Theme;
  id: number;
  name: string;
  type: string;
  currency: string;
  benchmark: string;
  exchange: string;
  initialInvestment: number;
  currentValue: number;
  rebalancingFrequency: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:8080/api/portfolios'; // Adjust your backend URL here

  constructor(private http: HttpClient) {}

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.baseUrl);
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.baseUrl, portfolio);
  }
  

  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
