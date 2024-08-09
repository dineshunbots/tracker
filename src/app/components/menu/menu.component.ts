import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  logoImg: any = 'assets/imgs/person.svg';
  public menus = [

    { title: 'Home', url: '/',icon: 'home' },
  ];
  constructor() { }

  ngOnInit() {}



}
