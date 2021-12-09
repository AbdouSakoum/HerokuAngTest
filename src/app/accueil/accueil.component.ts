import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title = 'image1'
  myImg:string = "assets/images/image1.jpg";
  
  constructor() { }

  ngOnInit(): void {
  }

}
