export default function funalSumCardPutter(cardsRef, cardsInfo) {
    let cardsArrayNODE = cardsRef.current.children;
    let cardAttributes;
    let nameMatch = false;



    for (let card of cardsArrayNODE) {


        if (!card.hasAttribute('cardtype')) {
            cardAttributes = card.attributes;
            nameMatch = false;

            for (let userId in cardsInfo) {
                let currentCardInfo = cardsInfo[userId];

                for (let attr of cardAttributes) {
                    if (attr.value == currentCardInfo.name) nameMatch = true;;

                }

                if (nameMatch) {

                    let cardPosition = card.getAttribute('cardposition');
                    let originalCardValue = currentCardInfo[`card${cardPosition}`];
                    let userCardvalue = currentCardInfo[`playerCard${cardPosition}`];

                    let isUserLied = originalCardValue == userCardvalue;
                    card.setAttribute('finalSummLied', !isUserLied);
                    card.innerHTML = originalCardValue + `<br> --------- <br>` + userCardvalue;
                    break;
                }

            }

        }

    }
}