import { Component, OnDestroy } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy {
  minutes: number = 25;
  seconds: number = 0;
  isTimerRunning: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private timerSubscription: Subscription | undefined;
  audio: HTMLAudioElement = new Audio();

  constructor() {
    this.audio.src = 'assets/alarm.mp3';
  }

  startTimer() {
    this.isTimerRunning = true;
    this.timerSubscription = interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.seconds === 0) {
          if (this.minutes === 0) {
            this.pauseTimer();
            this.playAlarm();
            this.showSweetAlert();
            return;
          } else {
            this.minutes--;
            this.seconds = 59;
          }
        } else {
          this.seconds--;
        }
      });
  }

  pauseTimer() {
    this.isTimerRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.minutes = 25;
    this.seconds = 0;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  incrementMinutes() {
    this.minutes++;
  }

  decrementMinutes() {
    if (this.minutes > 0) {
      this.minutes--;
    }
  }

  incrementSeconds() {
    this.seconds += 10;
    if (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes++;
    }
  }

  decrementSeconds() {
    if (this.seconds >= 10) {
      this.seconds -= 10;
    } else {
      if (this.minutes > 0) {
        this.minutes--;
        this.seconds += 50;
      }
    }
  }

  playAlarm() {
    this.audio.play();
  }

  showSweetAlert() {
    Swal.fire({
      title: 'Pomodoro Terminado!',
      text: 'Clique no botão para parar o alarme.',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Parar Alarme'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stopAlarm();
      }
    });
  }

  stopAlarm() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
