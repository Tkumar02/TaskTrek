import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-today',
  templateUrl: './plan-today.component.html',
  styleUrls: ['./plan-today.component.css']
})
export class PlanTodayComponent {
  ngOnInit(): void {
    const todayDate = new Date()
    console.log(todayDate.toISOString().split('T')[0])
  }
}
