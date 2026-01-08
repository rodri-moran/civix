import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { StatisticsService } from '../../services/statistics.service';
import { RouterLink } from '@angular/router';

Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class StatisticsComponent implements OnInit {
  fastestSquadTime = '0';
  fastestSquad = 'A';
  avgResolutionTimeHours = '-';
  statusData: { [key: string]: number } = {};
  squadData: { [key: string]: number } = {};
  totalReports = 0;

  constructor(private service: StatisticsService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.renderPieChartStatus();
    this.renderBarChartSquad();
    this.renderTotalReports();
    this.renderAverageResolutionTime();
    this.loadFastestSquad();
  }
  // === TORTA ===
  renderPieChartStatus() {
    this.service.getCountOfReportsByStatus().subscribe((response) => {
      this.statusData = response;

      new Chart('pieChartStatus', {
        type: 'pie',
        data: {
          labels: ['Pendiente', 'En proceso', 'Resuelto'],
          datasets: [
            {
              data: [
                this.statusData['PENDING'],
                this.statusData['IN_PROCESS'],
                this.statusData['RESOLVED'],
              ],
              backgroundColor: ['#0D6EFD', '#60A5FA', '#34D399'],
            },
          ],
        },
      });
    });
  }

  // === BARRAS ===
  renderBarChartSquad() {
    this.service.getCountOfReportsBySquad().subscribe((response) => {
      this.squadData = response;
      console.log('response: ', this.squadData);

      new Chart('barChartSquad', {
        type: 'bar',
        data: {
          labels: Object.keys(this.squadData), // nombres
          datasets: [
            {
              label: 'Cantidad de reportes',
              data: Object.values(this.squadData),
              backgroundColor: '#0D6EFD',
            },
          ],
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true },
          },
        },
      });
    });
  }

  renderTotalReports() {
    this.service.getTotalReports().subscribe((response) => {
      this.totalReports = response;
    });
  }

  renderAverageResolutionTime() {
    this.service.getAverageResolutionTime().subscribe((response) => {
      let responseStr = '';
      const totalHours = response / 3600;
      const days = Math.floor(totalHours / 24);
      const hours = Math.floor(totalHours % 24);

      if (days > 0) {
        responseStr += days === 1 ? '1 día' : `${days} días`;
      }
      if (hours > 0) {
        responseStr += (responseStr ? ' ' : '') + `${hours} h`;
      }
      if (!responseStr) {
        responseStr = '0 h';
      }
      this.avgResolutionTimeHours = responseStr;
    });
  }

  loadFastestSquad() {
    this.service.getAverageResolutionTimeBySquad().subscribe((data) => {
      console.log('data de squad: ', data);
      let fastestSquad: string | null = null;
      let fastestSeconds = Number.MAX_VALUE;

      for (const squadName in data) {
        const seconds = data[squadName];

        if (seconds < fastestSeconds) {
          fastestSeconds = seconds;
          fastestSquad = squadName;
        }
      }

      this.fastestSquad = fastestSquad ?? 'Sin datos';

      if (fastestSeconds == Number.MAX_VALUE) {
        this.fastestSquadTime = this.formatSecondsToDaysHours(0);
      } else {
        this.fastestSquadTime = this.formatSecondsToDaysHours(fastestSeconds);
      }
    });
  }
  formatSecondsToDaysHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;

    if (days > 0) {
      return remainingHours > 0 ? `${days} días ${remainingHours} h` : `${days} días`;
    }

    return `${hours} h`;
  }
}
