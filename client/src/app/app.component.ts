/** @format */

import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    this.checkForSWUpdate();
  }

  checkForSWUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (
          confirm('Existe uma nova versão do app. Deseja carregá-la agora?')
        ) {
          window.location.reload();
        }
      });
    }
  }
}
