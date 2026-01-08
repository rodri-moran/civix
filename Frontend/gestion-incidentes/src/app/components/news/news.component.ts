import { Component, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NewDto } from '../../dtos/NewDto.dto';
import { NewService } from '../../services/new.service';
import { FormsModule } from '@angular/forms';
import { NewResponseDto } from '../../dtos/NewResponseDto.dto';
import { RouterLink } from '@angular/router';
declare const bootstrap: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule, RouterLink],
})
export class NewsComponent implements OnInit {
  categories = [
    'Tecnología',
    'Gestión Pública',
    'Capacitación',
    'Transparencia',
    'Obras y Servicios',
    'Seguridad',
    'Ambiente',
    'Economía',
    'Otra',
  ];

  news: NewResponseDto[] = [];
  selectedNewsId: number = 0;
  selectedCategory: string = '';
  customCategory: string = '';

  newNews: NewDto = {
    title: '',
    description: '',
    category: '',
  };
  constructor(private newService: NewService) {}

  ngOnInit() {
    this.loadNews();
  }

  createNews() {
    const finalCategory =
      this.selectedCategory === 'Otra' ? this.customCategory : this.selectedCategory;

    this.newNews.category = finalCategory;

    this.newService.createNew(this.newNews).subscribe({
      next: (data) => {
        console.log('response: ', data);

        this.newNews = { title: '', description: '', category: '' };
        this.selectedCategory = '';
        this.customCategory = '';

        const modalElement = document.getElementById('createNewsModal');
        const modalInstance =
          bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();

        this.showSuccessNewsModal();

        this.loadNews();
      },
      error: (err) => {
        console.error('Error al crear la noticia: ', err);
      },
    });
  }

  deleteNews(id: number) {
    this.newService.deleteNew(id).subscribe({
      next: (data) => {         
        this.showSucessDeleteResourceToast();
        this.news = this.news.filter((n) => n.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar noticia: ', err);
      },
    });
  }

  loadNews() {
    this.newService.getAllNews().subscribe((response) => {
      this.news = response;
    });
  }
  showSuccessNewsModal(): void {
    const el = document.getElementById('successModalNews');
    const successModal = new bootstrap.Modal(el);

    successModal.show();

    setTimeout(() => successModal.hide(), 3000);
  }

  showSucessDeleteResourceToast() {
    const toastEl = document.getElementById('toastSuccessDelete');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }
}
