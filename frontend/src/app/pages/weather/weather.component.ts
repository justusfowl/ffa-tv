import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit, OnDestroy {

  currentTime : any = {dt: new Date()};

  // https://openweathermap.org/weather-conditions

  weatherCodes : any[] = [
    {
      "code" : 2, 
      "iconClass" : "mdi-weather-lightning-rainy",
      "imgBackground" : "storm.jpg"
    },
    {
      "code" : 3, 
      "iconClass" : "mdi-weather-partly-rainy",
      "imgBackground" : "drizzle.jpg"
    },
    {
      "code" : 5, 
      "iconClass" : "mdi-weather-pouring",
      "imgBackground" : "storm.jpg"
    },
    {
      "code" : 6, 
      "iconClass" : "mdi-snowflake",
      "imgBackground" : "snowing.jpg"
    },
    {
      "code" : 7, 
      "iconClass" : "mdi-weather-fog",
      "imgBackground" : "fog.jpg"
    },
    {
      "code" : 800, 
      "iconClass" : "mdi-weather-sunny",
      "imgBackground" : "sunny.jpg"
    },
    {
      "code" : 8, 
      "iconClass" : "mdi-weather-cloudy",
      "imgBackground" : "cloudy.jpg"
    }
  ];

  sub : any;
  displayItem : any; 

  constructor(
    private playSrv : PlayService, 
    private route : ActivatedRoute
  ) {
    console.log("Loading...")
   }

  ngOnInit() {

    this.currentTime = {dt: new Date()}
    
    // Get parent ActivatedRoute of this route.
    this.sub = this.route.paramMap.subscribe((params : any) => {

      if (!this.playSrv.activeDisplay){
        if (!this.playSrv.isInit){
          this.playSrv.goToHome();
        }
        return;
      }

      if (this.playSrv.activeDisplay.type.type == 'weather'){
        this.displayItem = this.playSrv.activeDisplay;

        this.displayItem.weather.forecasts = [];

        for (var i=0; i<4; i++){
          if (this.displayItem.weather.daily[i]){
            this.displayItem.weather.forecasts.push(this.displayItem.weather.daily[i])
          }
        }
      }

    });
  }

  ngAfterViewInit(){
    // this.videoObj.nativeElement.play();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getIconClass(item){
    try{
      let stateCode = item.weather[0].id; 
      if (stateCode == 800){
        return "mdi mdi-weather-sunny";
      }else{
        let codeGroup = parseFloat(stateCode.toFixed().substring(0,1));
        let weatherTypeIdx = this.weatherCodes.findIndex(x => x.code == codeGroup);
        if (weatherTypeIdx > -1){
          return "mdi " + this.weatherCodes[weatherTypeIdx].iconClass;
        }else{
          return "mdi mdi-temperature-celsius"
        }
      }
    }catch(err){
      return "mdi mdi-temperature-celsius";
    }
  }

  getWeatherBackground(){

    try{
      let stateCode = this.displayItem.weather.current.weather[0].id; 
      if (stateCode == 800){
        return "../../assets/image/sunny.jpg";
      }else{
        let codeGroup = parseFloat(stateCode.toFixed().substring(0,1));
        let weatherTypeIdx = this.weatherCodes.findIndex(x => x.code == codeGroup);

        if (weatherTypeIdx > -1){
          return "../../assets/image/" + this.weatherCodes[weatherTypeIdx].imgBackground;
        }else{
          return "../../assets/image/sunny.jpg"
        }
      }
    }catch(err){
      return "../../assets/image/sunny.jpg"
    }

  }

  getDay(fcItem){

    let date = new Date(fcItem.dt*1000);
    
    let day = date.getDay();

    if (day == 1){
      return "Montag";
    }else if (day == 2){
      return "Dienstag";
    }else if (day == 3){
      return "Mittwoch";
    }else if (day == 4){
      return "Donnerstag";
    }else if (day == 5){
      return "Freitag";
    }else if (day == 6){
      return "Samstag";
    }else if (day == 7){
      return "Sonntag";
    }else{
      return ""
    }

  }

  getMonth(fcItem){
    let date = new Date(fcItem.dt*1000);
    
    let month = date.getMonth();

    if (month == 0){
      return "Jan";
    }else if (month == 1){
      return "Feb";
    }else if (month == 2){
      return "Mär";
    }else if (month == 3){
      return "Apr";
    }else if (month == 4){
      return "Mai";
    }else if (month == 5){
      return "Jun";
    }else if (month == 6){
      return "Jul";
    }else if (month == 7){
      return "Aug";
    }else if (month == 8){
      return "Sep";
    }else if (month == 9){
      return "Okt";
    }else if (month == 10){
      return "Nov";
    }else if (month == 11){
      return "Dez";
    }else{
      return ""
    }
  }

  getDayNumber(fcItem){
    let date = new Date(fcItem.dt*1000);
    return date.getDate()
  }

  getTodayDay(){
    
    let day = this.currentTime.dt.getDay();

    if (day == 1){
      return "Montag";
    }else if (day == 2){
      return "Dienstag";
    }else if (day == 3){
      return "Mittwoch";
    }else if (day == 4){
      return "Donnerstag";
    }else if (day == 5){
      return "Freitag";
    }else if (day == 6){
      return "Samstag";
    }else if (day == 7){
      return "Sonntag";
    }else{
      return ""
    }

  }

  getTime(currentTime){
    let time = currentTime.dt.toLocaleTimeString();
    return time.substring(0, time.lastIndexOf(":"));
  }

}
