import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  

  constructor(
    private http: HttpClient
    ) { }


  

loginService(loginData):Observable<HttpResponse<Config>>{
  return this.http.post<Config>('http://localhost:8000/signin',loginData,{observe:'response'});
   
}





getPeopleService(token,reqData):Observable<any> {
  const options = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token,
  }),
  params : new HttpParams().set('user',reqData)
}
console.log("-----------",options)
    return this.http.get('http://localhost:8000/people', options);
  }

addPersonSevice(formData,token):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  })
  return this.http.post('http://localhost:8000/people',formData, {headers:headers});
}  

deletePersonService(personData,token){
  const options = {
    headers :new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token

    }),
    body: personData
  };

  return this.http.delete('http://localhost:8000/people',options)
}

editPersonService(editperson,token):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  })
  return this.http.put('http://localhost:8000/people/'+ editperson.id,editperson, {headers:headers})
}

registerUser(userdata):Observable<any> {
  return this.http.post('http://localhost:8000/register',userdata)
}

getPeople() {
  return this.http.get('http://localhost:8000/test');
}

}

