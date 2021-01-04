import { Injectable } from '@angular/core';
import { Rank } from '../_models/rank';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GridtService {

  constructor() { }

  loadSortableScripts() {
    const dynamicScripts = ['https://www.kryogenix.org/code/browser/sorttable/sorttable.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  sortRanksByDateDesc(ranks: Rank[]) {
    return ranks.sort((a, b) => {
      return <any>new Date(b.created) - <any>new Date(a.created);
    });
  }

  dateFormatter(date) {
    var format = 'MM/dd/yyyy';
    var locale = 'en-US';
    var formattedDate = formatDate(date, format, locale);
    return formattedDate;
  }

}
