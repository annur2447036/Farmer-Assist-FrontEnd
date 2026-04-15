import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
export interface ICustomer {
  address: string;
  city: string;
  contact: number;
  email: string;
  name: string;
  password: string;
}
export interface ILogin{
  email:string;
  password :string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  private apiurl =`${API_BASE_URL}/customers`;
  constructor(private http:HttpClient){

  }
  register(Customer :ICustomer):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiurl}/register`, Customer);
  }

  login(request:ILogin):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiurl}/login`,request)
  }
  
}


