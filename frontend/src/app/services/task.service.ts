import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/task";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = environment.url+'/tasks';

  constructor(private http: HttpClient) { }

  // get tasks
  public getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.url);
  }

  // add task
  public addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.url,task);
  }

  //update task
  public updateTask(task:Task):Observable<Task>{
    return this.http.put<Task>(this.url+'/'+task.id,task);
  }

  //delete task
  public deleteTask(id:number):Observable<Task[]>{
    return this.http.delete<Task[]>(this.url + '/' + id);
  }
}
