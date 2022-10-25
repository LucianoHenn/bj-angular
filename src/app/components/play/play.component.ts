import { Component, OnInit } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {


  cards: Card[] = []

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

  constructor() {
  }

  ngOnInit(): void {
    this.resetGame()
  }

  resetGame(): void{
    this.cards = [];
    this.yourCards = [];
    this.dealerCards = [];
    this.yourScore = 0;
    this.dealerScore = 0;
    this.message = ''
    this.gameIsOver = false
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        let value = j > 10 ? 10 : (j === 1 ? 11 : j)
        this.cards.push({suit: this.suits[i], number: j, value});
      }
    }
    this.addOneCard(false)
    this.addOneCard(true)
    this.addOneCard(true)
  }

  addOneCard(player: boolean){
    let currentCard = this.getOneCard();
    if(player){
      this.yourCards.push(currentCard)
    }else{
      this.dealerCards.push(currentCard);
    }
    this.calculateScore(player)
  }

  calculateScore(player: boolean){
    let hasAce = false;
    
    if(player){
      this.yourScore = 0;
      this.yourCards.forEach(element => {
        console.log(element)
        if(element.value === 11) hasAce = true
        this.yourScore+= element.value
        console.log(this.yourScore)
      });
      if(this.yourScore > 21 && hasAce){
        this.turnAceToOne(player)
        this.calculateScore(player)
      }
    }else{
      this.dealerScore = 0;
      this.dealerCards.forEach(element => {
        console.log(element)
        if(element.value === 11) hasAce = true
        this.dealerScore+= element.value
        console.log(this.dealerScore)
      });
      if(this.dealerScore > 21 && hasAce){
        this.turnAceToOne(player)
        this.calculateScore(player)
      }
    }
 
  }

  turnAceToOne(player: boolean){
      if(player)
        for(let i = 0 ; i<this.yourCards.length ; i++){
          if(this.yourCards[i].value === 11){
            this.yourCards[i].value = 1
            break
          }
        }
      else
      for(let i = 0 ; i<this.dealerCards.length ; i++){
        if(this.dealerCards[i].value === 11){
          this.dealerCards[i].value = 1
          break
        }
      }
  }

  getOneCard(): Card{
    let index = Math.floor(Math.random()*this.cards.length)
    let card: Card = this.cards[index] 
    this.cards.splice(index,1)
    return card;
  }

  hit(){
    this.addOneCard(true)
    if(this.yourScore > 21){
      this.gameIsOver=true
      this.perdio = true;
      this.gano = false;
      this. empate = false;
    }else if(this.yourScore === 21) this.dealersTurn()
  }

  dealersTurn(){
    while(this.dealerScore<17){
      this.addOneCard(false)
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
    this.dealersTurn()
  }

}
