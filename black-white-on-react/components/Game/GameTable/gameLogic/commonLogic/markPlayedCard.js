import { getSessionStorage } from "../../../../../servicesAndUtilities/sessionStorageHelper";

export default function playedCardMarker(cardsRef, summ) {
    let userData = getSessionStorage();
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

            card.setAttribute('cardPlayed', true);
            card.innerHTML = card.innerHTML + `<br> --------- <br>` + summ;
            break;

        }
    }
}