import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './catalog/catalog.component';
import { Component } from '@angular/core';

@Component({
  selector: 'store-root',
  templateUrl: './store.component.html'
})
export class StoreComponent {
  title = 'store works!';
}
