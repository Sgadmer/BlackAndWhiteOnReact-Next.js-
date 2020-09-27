export default function hoverCardOperator(name, cardPos, cardsRef, hoverCase) {

    let cardsArrayNODE = cardsRef.current.children;
    let cardAttributes;
    let attributeMatchingCount = 0;

    for (let card of cardsArrayNODE) {

        cardAttributes = card.attributes;
        attributeMatchingCount = 0;

        for (let attr of cardAttributes) {
            if (attr.value == name) attributeMatchingCount++;
            if (attr.value == cardPos) attributeMatchingCount++;
        }

        if (attributeMatchingCount == 2) {
           
            switch (hoverCase) {
                case true:
                    card.setAttribute('cardHovered', true);
                    break;
                case false:
                    card.removeAttribute('cardHovered');
                    break;
                default:
                    break;
            }
            break;

        }
    }
}