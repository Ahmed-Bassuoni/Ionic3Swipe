import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Views Elements
  @ViewChild('swingStack') swingStack: SwingStackComponent;
  @ViewChildren('swingCards') swingCards: QueryList<SwingCardComponent>;

  // Publick Variables
  public cards: Array<any> = [];
  public stackConfig: StackConfig = {};
  public recentCard: string = '';

  constructor(public navCtrl: NavController, public http: Http) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onCardMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ionViewDidEnter() {
    // Listen to stack throw event
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{ email: '' }];
    this.addNewCards(1);
  }

  /**
   * Called whenever a card is draged.
   * @param {any} elem - html element draged 
   * @param {number} x - x axis value. 
   * @param {number} y - y axis value.
   * @param {number} r - rotate degree value. 
   */
  onCardMove(elem: any, x: number, y: number, r: number) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    elem.style.background = color;
    elem.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

  }

  /**
   * Convert decimal value to Hex value
   * @param {number} decimal - decimal value
   * @param  {number} padding - 
   */
  decimalToHex(decimal: number, padding: number) {
    var hex = Number(decimal).toString(16);
    padding = !!padding && padding != 0 ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;

  }

  /**
   * Get users from API and add it to the cards list
   * @param {number} count - how many users to get.
   */
  addNewCards(count: number) {
    //uses random user api, modify this to get real users.
    this.http.get('https://randomuser.me/api/?results=' + count)
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          val.postion = 'human resources manager';
          val.experies = [
            'recruitment',
            'guitar',
            'learning and development'
          ]
          val.intrests = [
            'HRMS',
            'CrossFit',
            'Youga'
          ]
          this.cards.push(val);
        }
        console.log(this.cards);
      })
  }

  meet() {
    this.cards.pop();
    this.addNewCards(1);
  }

  pass() {
    this.cards.pop();
    this.addNewCards(1);
  }



}
