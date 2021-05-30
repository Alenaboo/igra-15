import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThunderSelectorService {
  private BASE_URL = "https://images.unsplash.com";
  private AVAILABLE_PICS = [
    "1622217817913-6f314cc142d5",
    "1526336024174-e58f5cdd8e13",
    "1565520651265-1148c3b277f4",
    "1464820453369-31d2c0b651af",
    "1515173792234-45cf00e907eb",
    "1513326738677-b964603b136d",
  ];
  constructor() { }

  public chooseBg(size: number = 800): string {
    return `${this.BASE_URL}/photo-${this.choosePic()}?auto=format&fit=crop&w=${size}&h=${size}`;
  }

  private choosePic(): string {
    return this.AVAILABLE_PICS[ Math.round(Math.random() * (this.AVAILABLE_PICS.length - 1)) ];
  }
}
