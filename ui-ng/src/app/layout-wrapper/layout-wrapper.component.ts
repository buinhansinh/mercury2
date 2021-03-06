import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '../company/contact-form/contact-form.component';
import { ProductFormComponent } from '../company/product-form/product-form.component';
import { ServiceFormComponent } from '../company/service-form/service-form.component';
import { AuthenticationService } from '../db/authentication.service';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.css']
})
export class LayoutWrapperComponent {
  title = 'app';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.router = router;
  }

  openAddContactDialog() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '800px',
      // height: "768px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '800px',
      // height: "768px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddServiceDialog() {
    const dialogRef = this.dialog.open(ServiceFormComponent, {
      width: '800px',
      // height: "768px",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  routeTo(path) {
    // alert(path);
    this.router.navigate([{ outlets: { primary: path, toolbar: path } }]);
  }

  onLogout() {
    this.authService.logout();
  }
}
