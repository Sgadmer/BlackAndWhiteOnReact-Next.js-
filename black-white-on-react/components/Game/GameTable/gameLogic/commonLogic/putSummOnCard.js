/*Помещает сумму выбранную игроком на сыгранную карту у других игроков*/

export default function sumCardPutter(cardsRef, userData = usData, summ) {
    let cardsArrayNODE = cardsRef.current.children;
    let cardAttributes;
    let attributeMatchingCount = 0;
    let name = userData.name;
    let cardPos = userData.selectedCardPos;


    for (let card of cardsArrayNODE) {

        cardAttributes = card.attributes;
        attributeMatchingCount = 0;

        for (let attr of cardAttributes) {
            if (attr.value == name) attributeMatchingCount++;
            if (attr.value == cardPos) attributeMatchingCount++;
        }

        if (attributeMatchingCount == 2) {

            card.setAttribute('cardMarketBySumm', true);
            card.textContent = summ;
            break;

        }
    }
}