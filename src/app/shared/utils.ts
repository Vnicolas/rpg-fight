import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export const backendUrl = 'http://localhost:3000/';

export function handleHttpErrors(error: HttpErrorResponse): Observable<never> {
  return throwError(error.error.message);
}
