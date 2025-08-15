import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from '../models/portfolio.model';
import { PortfolioHolding } from '../models/portfolio-holding.model';
import { HoldingService } from '../holding.service';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html'
})
export class HoldingComponent implements OnInit {
  portfolioId!: number;
  portfolio!: Portfolio;
  holdings: PortfolioHolding[] = [];

  constructor(
    private route: ActivatedRoute,
    private holdingService: HoldingService
  ) {}

  ngOnInit(): void {
    this.portfolioId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPortfolioDetails();
    this.loadHoldings();
  }

  loadPortfolioDetails(): void {
    this.holdingService.getPortfolio(this.portfolioId)
      .subscribe(data => this.portfolio = data);
  }

  loadHoldings(): void {
    this.holdingService.getHoldingsByPortfolioId(this.portfolioId)
      .subscribe(data => this.holdings = data);
  }

  editHolding(holding: PortfolioHolding): void {
    // Implement edit logic
  }

  deleteHolding(id: number): void {
    // Implement delete logic
  }


  

}


