import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public merchantName: string = 'You do know this name is dynamical right?';

  constructor(private readonly _route: ActivatedRoute) {
  }

  public ngOnInit() {
    this._route.queryParams.subscribe( params => {
      this.merchantName = params['merchantName'];
    });
  }

}
