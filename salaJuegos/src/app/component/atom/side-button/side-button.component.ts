import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-button',
  templateUrl: './side-button.component.html',
  styleUrls: ['./side-button.component.scss']
})
export class SideButtonComponent implements OnInit {

  @Input() label : string;
  @Input() resuelve : string;

  constructor() { }

  ngOnInit(): void {
  }

}
