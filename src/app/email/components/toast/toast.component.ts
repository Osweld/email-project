import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import {Toast} from 'bootstrap';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

 toastAlert:boolean = false;

  isSuccess(isSuccess :boolean){
    this.toastAlert = isSuccess;
  }

  showToast(){
    var toastElList = [].slice
                .call(document.querySelectorAll('.toast'));
            var toastList = toastElList.map(toastEl => {
                return new bootstrap.Toast(toastEl)
            })
            toastList.forEach(toast => toast.show())

  }


}
