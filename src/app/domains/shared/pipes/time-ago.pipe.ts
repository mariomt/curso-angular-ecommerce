import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const now = new Date(Date.now());
    const years = now.getFullYear() - date.getFullYear();

    if (years > 0) {
      return years + ' year' + ((years > 1) ? 's':'') + ' ago';
    } else {
      const months = now.getMonth() - date.getMonth();
      if (months > 0) {
        return months + ' month' + ((months > 1) ? 's':'') + ' ago';
      } else {
        const days = now.getDate() - date.getDate();
        if (days > 7) {
          let weeks = Math.floor(days / 7);
          return weeks + 'week' + ((weeks > 1) ? 's':'') + ' ago';
        } else if(days > 0) {
          return days + ' day' + ((days > 1) ? 's':'') + ' ago';
        } else {
          const hours = now.getHours() - date.getHours();
          if(hours > 0) {
            return hours + ' hour' + ((hours > 1) ? 's':'') + ' ago';
          } else {
            const minutes = now.getMinutes() - date.getMinutes();
            if (minutes > 0) {
              return minutes + ' minute' + ((minutes > 1) ? 's':'') + ' ago';
            } else {
              const seconds = now.getSeconds() - date.getSeconds();
              if (seconds > 0) {
                return seconds + ' second' + ((seconds > 1) ? 's':'') + ' ago';
              } else {
                return '0 seconds ago'
              }
            }
          }
        }
      }
    }
  }

}
