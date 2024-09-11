import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { API_URL } from './config';

interface UserServicesResponse {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: Profile[],
}

interface UserServiceResponse {
  data: Profile,
}

interface UserServiceUpdate {
  email: string,
  first_name: string,
  last_name: string,
  id?: number,
  avatar?: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  getProfiles(page: number = 1) {
    return this.http.get<UserServicesResponse>(`${API_URL}users?page=${page}`)
  }

  getProfilesFromId(id: number) {
    return this.http.get<UserServiceResponse>(`${API_URL}users/${id}`)
  }

  deleteProfiles(id?: number) {
    return this.http.delete(`${API_URL}users/${id}`)
  }

  updateProfiles(
    id: number,
    payload: UserServiceUpdate,
  ) {
    return this.http.put<UserServiceUpdate>(`${API_URL}users/${id}`, payload)
  }
}


