import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  people:any;
  formData:any;
  editData:any;
  openform:boolean=false;
  token:any;
  user:any;
  //edit data 
  edit = {
    id:'',
    firstname:'',
    lastname:'',
    contactinfo:
      {
        city:'',
        zipcode:'',
        phone:'',
       }
  }
  

  addContactForm = this.fb.group({
    id : [''],
    firstname : [''],
    lastname : [''],
    city : [''],
    zipcode : [''],
    phone : [''],
  });

  editContactForm = this.fb.group({
    editid : [''],
    editfirstname : [''],
    editlastname : [''],
    editcity : [''],
    editzipcode : [''],
    editphone : [''],
  })
 


constructor(
  private service:CommonService,
  private fb: FormBuilder,
  private appState: StateService
  ){
  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.user = this.appState.get('User')
  this.getPeople();
}

onClickEditForm(editdata){
  this.openform=true; 
  this.edit.id = editdata.id
  this.edit.firstname = editdata.firstname
  this.edit.lastname = editdata.lastname
  this.edit.contactinfo.city = editdata.contactinfo.city
  this.edit.contactinfo.zipcode = editdata.contactinfo.Zipcode
  this.edit.contactinfo.phone = editdata.contactinfo.phone
  console.log(this.edit)

}


  getPeople(){
   
    this.token = this.appState.get("Token")
    this.service.getPeopleService(this.token,this.user).subscribe(
      (data)=>{
        this.people = data;
      }
    )
  }

  addPerson() {
    // TODO: Use EventEmitter with form value
    this.token = this.appState.get("Token")
    this.formData = {
      'id' : this.addContactForm.controls.id.value,
      'firstname': this.addContactForm.controls.firstname.value,
      'lastname': this.addContactForm.controls.lastname.value,
      'user':this.user,
      'contactinfo': {
          'city': this.addContactForm.controls.city.value,
          'zipcode': this.addContactForm.controls.zipcode.value,
          'phone': this.addContactForm.controls.phone.value, 
    } 
    }
    this.addContactForm.reset();
    this.service.addPersonSevice(this.formData,this.token).subscribe(
      (data) => {
        this.getPeople();
      }
    )
    }

    editPerson(){
      this.token = this.appState.get("Token")
        this.editData = { 
          'id' : this.editContactForm.controls.editid.value,
          'firstname': this.editContactForm.controls.editfirstname.value,
          'lastname': this.editContactForm.controls.editlastname.value,
          'contactinfo': {
              'city': this.editContactForm.controls.editcity.value,
              'zipcode': this.editContactForm.controls.editzipcode.value,
              'phone': this.editContactForm.controls.editphone.value, 
        }
      }
        this.service.editPersonService(this.editData,this.token).subscribe(
          (data) => {
            this.getPeople();
            this.openform = false;
          }
        )
    }

  deletePerson(id){
    this.token = this.appState.get("Token")
    this.service.deletePersonService(id,this.token).subscribe(
      (data) => {
        this.getPeople();
      }
    )
  }
}
