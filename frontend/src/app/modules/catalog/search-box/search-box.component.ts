import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Product } from "../../../models/Product";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"]
})
export class SearchBoxComponent implements OnInit {
  @Input() dataToFilter: Observable<Product[]>;
  @Output() onFilteredData: EventEmitter<Observable<Product[]>>;

  private isTyping = false;

  constructor() {
    this.onFilteredData = new EventEmitter<Observable<Product[]>>();
  }

  ngOnInit() {}

  onKey(event: Event): void {
    let output$ = this.dataToFilter.pipe(
      map((products: Product[]) =>
        products.filter(p =>
          p.title
            .toLowerCase()
            .includes((event.target as HTMLInputElement).value.toLowerCase())
        )
      )
    );

    this.onFilteredData.emit(output$);
  }
}
