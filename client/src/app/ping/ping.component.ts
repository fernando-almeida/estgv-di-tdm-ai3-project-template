import { HttpClient } from '@angular/common/http';
// ...
export class AppComponent {
  constructor(public http: HttpClient) {}
  public ping() {
    this.http.get('https://example.com/api/things')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}