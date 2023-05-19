import { Component } from '@angular/core';
import { AppService } from './app.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-assessment';
  isShow: boolean = false;
  isEditShow:boolean=false;
  userData: any[] = [];
  pageSlice: any[] = [];

  constructor(private appService: AppService,private router:Router) {}

  ngOnInit(): void {
    this.appService.getData().subscribe((data) => {
      this.userData = data;
      this.pageSlice = this.userData.slice(0, 50);
    });
  }

  $OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.userData.length) {
      endIndex = this.userData.length;
    }
    this.pageSlice = this.userData.slice(startIndex, endIndex);
  }

  deleteUser(id: string) {
    const user = this.userData!.find(x => x.id === id);

    this.appService.deleteData(id)
        .pipe(first())
        .subscribe(() => this.userData = this.userData!.filter(x => x.id !== id));
}
}
