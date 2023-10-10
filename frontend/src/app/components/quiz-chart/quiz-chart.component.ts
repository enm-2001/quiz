import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-chart',
  templateUrl: './quiz-chart.component.html',
  styleUrls: ['./quiz-chart.component.css']
})
export class QuizChartComponent implements OnInit{

  categories!: any
  title = 'ng2-charts-demo';
  resLabelsQuiz: any = []
  resDataQuiz: any = []
  resLabelsMarks: any = []
  resDataMarks: any = []
  lineLabelsDate: any = []
  lineDataDate: any = []

  public barChartLegendQuiz = true;
  public barChartLegendMarks = true;
  public lineChartLegend = true;

  public barChartPluginsQuiz = [];
  public barChartPluginsMarks = [];

  barChartDataQuiz : ChartConfiguration<'bar'>['data'] = {labels: [], datasets: []}
  barChartDataMarks : ChartConfiguration<'bar'>['data'] = {labels: [], datasets: []}
  lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  
  public barChartOptionsQuiz: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartOptionsMarks: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  
  constructor(private quizService: QuizService, private categoryService: CategoryService) {
  }
  
  getQuizByCategory(){

    this.quizService.getQuiz().subscribe(
      (response: any) => {
        // console.log((response));
        response.forEach((res: any) => {
            this.resLabelsQuiz.push(res.cname)
            this.resDataQuiz.push(Number(res.count))
          });

          this.categories.forEach((cat: any) => {
            if(!this.resLabelsQuiz.includes(cat.cname)){
              this.resLabelsQuiz.push(cat.cname)
              this.resDataQuiz.push(0)
            }
          })
          // console.log(this.resLabelsQuiz);
          // console.log(this.resDataQuiz);
          this.barChartDataQuiz = {
  
            labels: this.resLabelsQuiz,
            datasets: [
              { data: this.resDataQuiz, label: 'Number of quizes-categories', backgroundColor: 'rgba(174, 68, 90, 0.6)' },
            ]
          };
              
        
      }
    )
  }

  getMarksByCategory(){
    this.quizService.getMarksByCategory().subscribe(
      (response: any) => {
        // console.log((response));
        response.forEach((res: any) => {
         
          this.resLabelsMarks.push(res.cname)
          this.resDataMarks.push(Number(res.marks))
        });
        this.categories.forEach((cat: any) => {
          if(!this.resLabelsMarks.includes(cat.cname)){
            this.resLabelsMarks.push(cat.cname)
            this.resDataMarks.push(0)
          }
        })
        this.barChartDataMarks = {

          labels: this.resLabelsMarks,
          datasets: [
            { data: this.resDataMarks, label: 'Average marks-categories', 
              backgroundColor: 'rgba(174, 68, 90, 0.6)',
               },
          ]
        };
        
        
        
      }
    )
  }

  getQuizByDate(){
    this.quizService.getQuizByDate().subscribe(
      (response: any) => {
        console.log((response));
        response.forEach((res: any) => {
         
          this.lineLabelsDate.push(res.date)
          this.lineDataDate.push(Number(res.count))
        });

        this.lineChartData = {

          labels: this.lineLabelsDate,
          datasets: [
            {
              data: this.lineDataDate,
              label: 'No of quizes-date',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(174, 68, 90, 0.6)'
            }
          ]
        };
   console.log(this.lineChartData);
   
      }
    )
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response
      }
    )
  }
  ngOnInit(): void {
    this.getCategories()
    this.getQuizByCategory()
    this.getMarksByCategory()
    this.getQuizByDate()
  }
}
