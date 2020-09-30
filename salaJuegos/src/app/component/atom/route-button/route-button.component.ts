import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-route-button',
  templateUrl: './route-button.component.html',
  styleUrls: ['./route-button.component.scss']
})
export class RouteButtonComponent implements OnInit {

  @Input() label : string;
  @Input() route : string;

  constructor() { }

  ngOnInit(): void {
  }

}
