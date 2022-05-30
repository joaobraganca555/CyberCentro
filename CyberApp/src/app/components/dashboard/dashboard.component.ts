import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data: any[];

  public data2 = [

    {Franchise: "Marvel Universe All Films", TotalWorldBoxOfficeRevenue: 22.55, HighestGrossingMovieInSeries: 2.8 },
    {Franchise: "Star Wars",                 TotalWorldBoxOfficeRevenue: 10.32, HighestGrossingMovieInSeries: 2.07},
    {Franchise: "Harry Potter",              TotalWorldBoxOfficeRevenue: 9.19,  HighestGrossingMovieInSeries: 1.34},
    {Franchise: "Avengers",                  TotalWorldBoxOfficeRevenue: 7.76,  HighestGrossingMovieInSeries: 2.8 },
    {Franchise: "Spider Man",                TotalWorldBoxOfficeRevenue: 7.22,  HighestGrossingMovieInSeries: 1.28},
    {Franchise: "James Bond",                TotalWorldBoxOfficeRevenue: 7.12,  HighestGrossingMovieInSeries: 1.11}
  ];

  public data3: any;

  constructor() {
    this.data = [
      { Year: "2009", Europe: 31 },
      { Year: "2010", Europe: 43 },
      { Year: "2011", Europe: 66 },
      { Year: "2012", Europe: 69 },
      { Year: "2013", Europe: 58 },
      { Year: "2014", Europe: 40 },
      { Year: "2015", Europe: 78 },
      { Year: "2016", Europe: 13 },
      { Year: "2017", Europe: 78 },
      { Year: "2018", Europe: 40 },
      { Year: "2019", Europe: 80 },
    ];

    this.data3 = [
      { Value: 25, Label: "Residential" },
      { Value: 12, Label: "Heating" },
      { Value: 11, Label: "Lighting" },
      { Value: 18, Label: "Other" },
      { Value: 37, Label: "Cooling" }
  ];
  }

  ngOnInit(): void {
  }

}
