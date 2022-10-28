import { Component, OnInit } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { Card } from 'src/app/models/card';
import { TokenService } from 'src/app/shared/token.service';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {


  cards: Card[] = [];
  token: string | null | undefined ;
  suits: String[] = ['clubs', 'spades', 'hearts', 'diamonds']
  yourCards: Card[] = []
  dealerCards: Card[] = []
  yourScore: number = 0
  dealerScore: number = 0
  gameIsOver: boolean = false;
  message: String = ''
  dealerAcesAmount: number = 0;
  empate = false;
  gano = false;
  perdio = false;

  constructor(private tokenService :TokenService, private gameService: GameService) {
  }

  private subscription = new Subscription();

  ngOnInit(): void {
    this.resetGame();
  }

  trearToken(){
   this.token = this.tokenService.getToken();
  }
  
  initGame(){
    this.gameService.play(this.token).subscribe({
      next: (response: any) => {
        console.log('game', response);
       response.userCards.forEach((card: any) => {
        this.yourCards.push(this.cards[card.card_id-1])
       });
       this.dealerCards.push(this.cards[response.dealerCard.card_id - 1])
       this.yourScore = response.userTotal;
       this.dealerScore = response.dealerCard.card_value;
      },
      error: (e)=> {
        console.log('error', e)
      }
    })
  }

  getAllCards(){
    this.subscription.add(
    this.gameService.getAllCards(this.token).subscribe({
      next: (cards: any) => {

       this.cards = cards[0];

      },
      error: (e)=> {
        console.log('error', e)
      }
    })
    )
  }

  resetGame(): void{
    this.trearToken();
    this.cards = [];
    this.yourCards = [];
    this.dealerCards = [];
    this.yourScore = 0;
    this.dealerScore = 0;
    this.message = ''
    this.gameIsOver = false
    this.getAllCards();
    this.initGame();
  }


  getOneCard(): Card{
    let index = Math.floor(Math.random()*this.cards.length)
    let card: Card = this.cards[index] 
    this.cards.splice(index,1)
    return card;
  }

  hit(){
    this.subscription.add(
      this.gameService.hit(this.token).subscribe({
        next: (response: any) => {
          let last = response.userCards.length - 1;
          this.yourCards.push(this.cards[response.userCards[last].card_id -1])
          this.yourScore = response.userTotal
          if(response.status == 'FINISHED' && response.result === 'LOST'){
            this.gameIsOver=true
            this.perdio = true;
            this.gano = false;
            this. empate = false;
          }
        },
        error: (e)=> {
          console.log('error', e)
        }
      })
      )
    if(this.yourScore > 21){
      this.gameIsOver=true
      this.perdio = true;
      this.gano = false;
      this. empate = false;
    }else if(this.yourScore === 21) this.dealersTurn()
  }

  dealersTurn(){
    while(this.dealerScore<17){
      
    }
    this.gameIsOver=true
    if(this.dealerScore > 21 || this.dealerScore < this.yourScore){
      this.gano = true;
      this.perdio = false;
      this. empate = false;
    }
    else if(this.dealerScore === this.yourScore){
      this.empate = true;
      this.gano = false;
      this.perdio = false;
    }
    else{
      this.perdio = true;
      this.gano = false;
      this.empate = false;
    }
  }

  reset(){
    this.resetGame()
  }

  stay(){
    this.subscription.add(
      this.gameService.stay(this.token).subscribe({
        next: (response: any) => {
          console.log('stay', response)
          this.gameIsOver=true
            this.gano = (response.result == "WON") ? true : false;
            this.perdio = response.result == "LOST" ? true : false;
            this. empate = response.result == "TIE" ? true : false;
          
          this.dealerScore = response.casinoTotal;
          response.casinoCards.shift()
          response.casinoCards.forEach((card: any) => {
            this.dealerCards.push(this.cards[card.card_id-1])
           });
        },
        error: (e)=> {
          console.log('error', e)
        }
      })
      )
  }

}
