import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

@Component({
    selector: "list",
    templateUrl: "pages/drills/drill-list.component.html",
    styleUrls: ["pages/drills/drill-list.component.css"]
})
export class DrillListComponent implements OnInit {
    drills: Array<Object> = [];

    drillType: string;

    constructor(private page: Page, private router: Router) {

    }

    ngOnInit() {
        // Setup Formatting
        this.page.actionBarHidden = true;

        // Mock up hard-coded list of drills
        this.drillType = 'drill';
        this.drills.push({ name: "Powers of 2", route: "/drill" });
    }

    onTapDrill(route) {
        console.log(route);
        this.router.navigate([route]);
    }
}
