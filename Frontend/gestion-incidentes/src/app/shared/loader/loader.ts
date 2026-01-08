import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.css'],
  imports: [FormsModule, CommonModule],
  
})
export class LoaderComponent {
  @Input() isLoading = false;
}
