import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  constructor() { }

  public space1: any = {img: 'tic'};
  public space2: any = {img: 'none'};
  public space3: any = {img: 'none'};
  public space4: any = {img: 'none'};
  public space5: any = {img: 'tac'};
  public space6: any = {img: 'none'};
  public space7: any = {img: 'none'};
  public space8: any = {img: 'none'};
  public space9: any = {img: 'none'};


  ngOnInit(): void {
  }

}
