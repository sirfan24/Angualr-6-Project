import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { IEmployee } from './IEmployee';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    constructor(private httpClient:HttpClient){}

    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<IEmployee[]> {
        return this.httpClient.get<IEmployee[]>(this.baseUrl)
                .pipe(catchError(this.handleError));
    }

    getEmployee(id:number):Observable<IEmployee> {
        return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
                .pipe(catchError(this.handleError));
    }

    addEmployee(employee: IEmployee):Observable<IEmployee> {
        return this.httpClient.post<IEmployee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
                .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: IEmployee):Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}` , employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
                .pipe(catchError(this.handleError));
    }

    deleteEmployee(id:number):Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
                .pipe(catchError(this.handleError));
    }


    private handleError(erroeResponse: HttpErrorResponse){
        if(erroeResponse.error instanceof ErrorEvent) {
            console.error('Client side error: ', erroeResponse.error)
        }else{
            console.error('Server Side error: ', erroeResponse);
        }

        return throwError('There is a problem with the service')
    }
}