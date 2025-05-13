import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrls: ['./wave-audio.component.css']
})
export class WaveAudioComponent {

  @Input() audioUrl: string = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
    });

    this.ws.on('play', () => {
      this.isPlaying.set(true);
    });
    this.ws.on('pause', () => {
      this.isPlaying.set(false);
    });
  }

  playPause() {
    this.ws.playPause();
  }
}
