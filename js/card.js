new Vue({
    el: '#app',
    data: {
        cards: [],
        url: '',
        fill: '',
        shape: '',
        cardSelection: [],
    },
    methods: {
        shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        },
        createCardsArray(){
            let shape, fill, number, color;
            let passedNine = 1;
            var colors = ['red','purple','green'];
            var colorIndex = 0;
            let cardURL = 'https://puzzles.setgame.com/images/setcards/small/';
            for (let i = 1; i <= 81; i++) {

                if (i >= 1 && i <= 27 ) {
                    fill = "solid";
                }
                if (i > 27 && i <= 54) {
                    fill = "stripe";
                }
                if (i > 54 && i <= 81) {
                    fill = "blank";
                } 
            
                if (passedNine == 1 || passedNine == 4 || passedNine == 7) {
                    shape = "squiggle";
                } else if ([2, 5, 8].indexOf(passedNine) !== -1) {
                    shape = "diamond";
                } else if (passedNine == 3 || passedNine == 6 || passedNine == 9) {
                    shape = "oval";
                }

                if (i % 9 == 0) {
                    passedNine += 1;
                }

                if(i%3==0){
                    number = 3;
                }
                else if(i%3==1){
                    number = 1;
                }
                else if(i%3==2){
                    number = 2;
                }

                color = colors[colorIndex];
                if (i%3==0){
                    if (colorIndex==2){
                        colorIndex = 0;
                    }
                    else{
                        colorIndex +=1;
                    }
                }

                if (i < 10) {
                    this.cards.push({ 
                        url: cardURL + '0' + i + '.gif',
                        fill: fill,
                        shape: shape, 
                        number: number,
                        color: color,
                    });
                } else {
                    this.cards.push({ 
                        url: cardURL + i + '.gif',
                        fill: fill,
                        shape: shape, 
                        number: number,
                        color: color,
                    });
                    
                }

            }
            this.cards = this.cards.slice(0,12);
        },
        selectedBox(currCard) {
            this.cardSelection.push(currCard);
            this.$set(currCard, 'selected', !currCard.selected);

        }
    },
    created (){
        this.createCardsArray();
        this.shuffleArray(this.cards);


    },
})