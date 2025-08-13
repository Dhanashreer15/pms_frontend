import { Component, OnInit } from '@angular/core';
import { Portfolio, PortfolioService } from '../portfolio.service';
import { Theme } from '../models/theme.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[] = [];
  isLoading = true;

  showPortfolioForm: boolean = false;

  // ✅ Define theme separately using Theme model
  theme: Theme = {
    id: 0,
    name: '',
    description: '',
    riskLevel: '',
    investmentHorizon: ''
  };

  // ✅ Use theme reference inside newPortfolio
  newPortfolio: Portfolio = {
    id: 0,
    name: '',
    type: '',
    currency: '',
    benchmark: '',
    exchange: '',
    initialInvestment: 0,
    currentValue: 0,
    rebalancingFrequency: '',
    status: '',
    theme: {} as Theme // will be assigned in ngOnInit
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.newPortfolio.theme = this.theme;
    this.fetchPortfolios();
  }

  fetchPortfolios(): void {
    this.portfolioService.getPortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching portfolios:', err);
        this.isLoading = false;
      }
    });
  }

  createPortfolio(): void {
    this.portfolioService.createPortfolio(this.newPortfolio).subscribe({
      next: (data) => {
        console.log('Portfolio created:', data);
        this.showPortfolioForm = false;
        this.fetchPortfolios();
      },
      error: (err) => {
        console.error('Error creating portfolio:', err);
      }
    });
  }

  deletePortfolio(id: number): void {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      this.portfolioService.deletePortfolio(id).subscribe({
        next: () => {
          this.portfolios = this.portfolios.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error deleting portfolio:', err);
        }
      });
    }
  }

 
  

  showThemeForm: boolean = false;
  submitTheme(): void {
    this.portfolioService.createPortfolio(this.newPortfolio).subscribe({
      next: (data) => {
        console.log('Theme submitted:', data);
        this.showThemeForm = false;
        this.fetchPortfolios();
      },
      error: (err) => {
        console.error('Error submitting theme:', err);
      }
    });
  }
  

  

}
