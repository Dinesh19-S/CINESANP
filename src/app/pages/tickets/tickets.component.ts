import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  movie = '';
  screen = '';
  time = '';
  seats: string[] = [];
  total = '';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movie = params['movie'] || '';
      this.screen = params['screen'] || '';
      this.time = params['time'] || '';
      this.seats = params['seats'] ? params['seats'].split(',') : [];
      this.total = params['total'] || '';
    });
  }
}