import { DrillComponent } from "./pages/drills/drill.component";
import { DrillListComponent } from "./pages/drills/drill-list.component";

export const routes = [
    { path: "", component: DrillListComponent },    
    { path: "drill", component: DrillComponent }

];

export const navigatableComponents = [
    DrillComponent,
    DrillListComponent
];
