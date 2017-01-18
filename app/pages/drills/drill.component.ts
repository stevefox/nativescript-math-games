import { Component, OnInit } from "@angular/core";

import { Problem } from '../../shared/problem/problem';
import { setInterval, clearInterval } from "timer";
import { Page  } from "ui/page";

@Component({
    selector: "drill",
    templateUrl: "pages/drills/drill.component.html",
})
export class DrillComponent implements OnInit {
    problem: Problem;
    guess: string;

    correct: number;
    total: number;

    timer: any;
    timed: boolean;
    countdown: number;
    maxCountdown: number;
    questionInProgress: boolean;

    constructor(private page: Page) {
    }

    ngOnInit() {
        // Create Data
        this.problem = new Problem();
        this.timed = false;
        this.generate();

        this.maxCountdown = 5000;
        this.countdown = 5000;

        this.correct = 0;
        this.total = 0;
        this.questionInProgress = false;
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
        this.problem.hintHtmlTemplate = `If 2<sup>x</sup> = ${this.problem.hint}, what is x?`;

        // Reset guess
        this.total += 1;
        this.guess = '';
        this.questionInProgress = true;

        this.setTimer();
    }

    setTimer() {
        // Reset the timer
        this.clearTimer();

        // Set update the counter every 20ms (50Hz)
        this.timer = setInterval(() => {
            if (this.timed) {
                if (this.questionInProgress) {
                    if (this.countdown < this.maxCountdown) {
                        // Count up to maxCountdown
                        this.countdown += 20;
                    } else {
                        // When time expires, check
                        this.check();
                    }
                }
            } else {
                this.countdown = 0;
            }
        }, 20);
    }

    clearTimer() {
        if (this.timer != null) {
            clearInterval(this.timer);
        }
        this.countdown = 0;        
    }

    check() {
        let numericGuess: number = +this.guess;
        if (numericGuess == this.problem.answer) {
            this.correct += 1;
            this.generate();
        } else if(this.countdown >= this.maxCountdown) {
            this.guess = '';            
            this.generate();
        } else {
            alert("Try again!");
        }
    }

    onCheckChange(event) {
        if (this.timed) {
            this.setTimer();
        } else {
            this.clearTimer();
        }
    }
}
