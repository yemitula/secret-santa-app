import { Component } from '@angular/core';
import { SecretSantaService } from './services/secret-santa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  private _numParticipants: number = 0;
  assignments: Record<string, string> = {};

  constructor(private secretSantaService: SecretSantaService) {}

  get numParticipants(): number | null {
    return this._numParticipants === 0 ? null : this._numParticipants;
  }

  set numParticipants(value: number | null) {
    this._numParticipants = value === null ? 0 : value;
  }

  get hasAssignments(): boolean {
    return Object.keys(this.assignments).length > 0;
  }

  generateSecretSanta(): void {
    this.assignments = this.secretSantaService.generateAssignments(
      this._numParticipants
    );
  }
}
