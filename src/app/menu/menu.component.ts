import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
items: MenuItem[] | undefined;
sidebarVisible: boolean = false;
lastUpdate!: string;
BI ="BI"
constructor(private router: Router) {
  this.getLastUpdate();
}
ngOnInit() {
  this.items = [   {
    label: 'דף הבית',
    icon: 'pi pi-fw pi-home',
    command: () => this.navigate(''),    
  },
      {
      label: 'תינוקות יונקים אחוז הנקה לפי גיל',
      command: () => this.navigate("chart1")
      },
      {
        label: 'תינוקות יונקים מגמה שנתית לפי גיל',
        command: () => this.navigate("chart2")
      },
      {
        label: 'הפרש ציון מהממוצע הארצי לפי מאפיני מוסד',
        command: () => this.navigate("chart3")
      }
  ]
}
menuIcon: string = 'pi pi-bars';
toggleSidebar(): void {
  this.sidebarVisible = !this.sidebarVisible;
}
getLastUpdate(){
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hour = String(currentDate.getHours()).padStart(2, '0'); 
  this.lastUpdate = `${year}-${month}-${day} ${hour}:00`;
}
navigate(link:string) {
  this.sidebarVisible = false
  this.router.navigate([link]);
}
}