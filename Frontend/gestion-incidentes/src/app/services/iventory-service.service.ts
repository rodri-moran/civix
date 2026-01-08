import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMovementDto } from '../dtos/inventory-movement.dto';
import { ResourceDto } from '../dtos/ResourceDto';
import { InventoryMovementResponseDto } from '../dtos/InventoryMovementResponse.dto';
import { ResourceCreateDto } from '../dtos/resource-create.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IventoryServiceService {
private baseUrl = `${environment.apiUrl}/api/inventory`
constructor(private http :HttpClient) { }

    private authHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createResource(resourceCreate : ResourceCreateDto) : Observable<ResourceCreateDto>{

    return this.http.post<ResourceCreateDto>(
      this.baseUrl + '/admin',
      resourceCreate,
      this.authHeaders()
    );
  }

  getAllResources() : Observable<ResourceDto[]> {
    return this.http.get<ResourceDto[]>(
      `${this.baseUrl}/squad/getAll`,
      this.authHeaders()
    )
  }

  registerMovement(movement: InventoryMovementDto){    
    return this.http.post(
      `${this.baseUrl}/squad/movements`,
      movement,
      this.authHeaders()
    );
  }

  getAllMovements() : Observable<InventoryMovementResponseDto[]>{
    return this.http.get<InventoryMovementResponseDto[]>(
      `${this.baseUrl}/admin/movements`,
      this.authHeaders()
    )
  }

  deleteResource(id: number) {
  return this.http.delete(`${this.baseUrl}/admin/delete/${id}`,
    this.authHeaders()
  );
}
}