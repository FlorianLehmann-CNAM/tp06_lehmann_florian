import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from "../../../models/User";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
  user: Observable<User>;

  constructor() {}

  ngOnInit(): void {}

  onUserChanged(user: Observable<User>): void {
    this.user = user;
  }
}
