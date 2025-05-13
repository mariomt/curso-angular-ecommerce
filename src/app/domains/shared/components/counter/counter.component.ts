import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // 1. Primer en ejecutarse
    // NO ASYNC
    // Se ejecuta una vez
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // 2. Antes y durante el renderizado
    // Se ejecuta varias veces
    console.log('ngOnChanges');
    console.log(changes);
    console.log('-'.repeat(10));
    const duration = changes['duration'];
    if (duration) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // 3. despues del renderizado
    // ASYNC, then, subscribe, await
    // se ejecuta una vez
    console.log('ngOnInit');
    console.log('duration=>', this.duration);
    console.log('-'.repeat(10));
    this.counterRef = window.setInterval(() => {
      this.counter.update((count) => count + 1);
    }, 1000)
  }

  ngAfterViewInit() {
    // 4. Despues de que se renderiza el componente y
    // despues de que se renderizan los hijos
    // ASYNC, then, subscribe, await
    // se ejecuta una vez
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // 5. Cuando se destruye el componente
    // Se ejecuta una vez
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }


  doSomething() {
    console.log('doSomething');
    console.log('-'.repeat(10));
  }
}
