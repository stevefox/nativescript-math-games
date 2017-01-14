import { Component } from "@angular/core";
import { setTimeout } from "timer";

class Problem {
    hint: number;
    answer: number;
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    problem: Problem;
    guess: string;

    constructor() {
        this.problem = new Problem();
        this.generate();
        this.guess = ''
    }

    private _generate_exponent() {
        return Math.floor(Math.random()*11);
    }
    
    public generate() {
        // Create a new problem
        let next_answer: number = this._generate_exponent();

        // Don't allow the same question twice in a row
        while (next_answer == this.problem.answer) {
            next_answer = this._generate_exponent();
        }

        // Configure the new problem
        this.problem.answer = next_answer;
        this.problem.hint = Math.pow(2, this.problem.answer);

        // Reset guess
        this.guess = '';
    }

    check() {
        let numericGuess: number = +this.guess;
        if (numericGuess == this.problem.answer) {
            this.generate();
        } else {
            alert(`Wrong! Guess again!`);
            this.guess = '';
        }
    }
}
