import { Injectable } from '@angular/core';

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

}
