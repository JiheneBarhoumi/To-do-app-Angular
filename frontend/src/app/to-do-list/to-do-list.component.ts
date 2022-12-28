import { Component, OnInit } from '@angular/core';
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  tasks: Task[]=[];
  task= new Task();
  editTask= new Task();
  isVisible=false;
  constructor(private service : TaskService) { }

  ngOnInit(): void {
    this.getAll();
  }
  /*** get all tasks ***/
  getAll(){
    this.service.getTasks().subscribe(res=>{
      this.tasks=res;
    },error => {
      alert("Could not load tasks..");
    })
  }

  /*** add task ***/
  add(){
    this.service.addTask(this.task).subscribe(res=>{
     this.getAll();
     this.task= new Task();
    },error => {
      alert("Could not add task..");
    })
  }

  /*** update task ***/
  update(task:Task){
    let title = prompt("edit your task",task.title);
    task.title=title||task.title;
    this.service.updateTask(task).subscribe(res=>{
      this.isVisible=false;
      this.getAll();
    },error => {
      alert("Could not update task..");
    })
  }


  /*** delete task ***/
  delete(id:number){
    this.service.deleteTask(id).subscribe((res)=>{
      this.getAll();
    },error => {
      alert("Could not delete task..");
    });

  }



}
