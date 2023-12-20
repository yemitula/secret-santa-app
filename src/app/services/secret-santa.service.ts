import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {
  generateAssignments(numParticipants: number): Record<string, string> {
    if (numParticipants < 2) {
      throw new Error(
        'There must be at least two participants for Secret Santa.'
      );
    }

    const participants = Array.from(
      { length: numParticipants },
      (_, i) => i + 1
    );
    const gifts = [...participants];
    this.shuffleArray(gifts);

    return participants.reduce((acc, participant, index) => {
      if (participant === gifts[index]) {
        const nextIndex = (index + 1) % numParticipants;
        [gifts[index], gifts[nextIndex]] = [gifts[nextIndex], gifts[index]];
      }
      acc[`Participant ${participant}`] = `Gift ${gifts[index]}`;
      return acc;
    }, {} as Record<string, string>);
  }

  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
