import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { CatalogueComponentRoutingModule } from "./catalog-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpServiceService } from "../../services/http-service.service";
import { SearchBoxComponent } from "./search-box/search-box.component";
import { DetailProductComponent } from "./detail-product/detail-product.component";
import { ApiHttpInterceptor } from 'src/app/services/api-http-interceptor';

@NgModule({
  declarations: [
    ProductListComponent,
    SearchBoxComponent,
    DetailProductComponent
  ],
  imports: [CommonModule, CatalogueComponentRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    },
    HttpServiceService
  ]
})
export class CatalogModule {}
