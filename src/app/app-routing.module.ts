import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

const routes: Routes = [
{
  path:"add",
  component:ModalComponent
},
{
  path:"edit/:id",
  component:ModalComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
