import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)',  width: '100%'}),
        animate(500,  keyframes(
          [
           style({ transform: 'translateX(-100%)' , width: '110%'}),
           style({ transform: 'translateX(0%)'    , width: '110%'}),
           style({ transform: 'translateX(0%)'    , width: '95%'}),
           style({ transform: 'translateX(0%)'    , width: '105%'}),
           style({ transform: 'translateX(0%)'    , width: '100%'}),
          ])
        )
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public menuOn: boolean = false;

  public routes: any[] = [
    {title: 'PRODUCT', router: '/product'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
