export default function hoverNameOperator(name, namesRef, isRemoveAttrOnly) {

    let namesArrayNODE = namesRef.current.children;
    let namesAttributes;
    let attributeMatchingCount = 0;

    for (let currentName of namesArrayNODE) {

        namesAttributes = currentName.attributes;
        attributeMatchingCount = 0;

        for (let attr of namesAttributes) {
            if (attr.value == name) attributeMatchingCount++;
            if (attr.value == 'namePlate') {
                attributeMatchingCount++;
                if (currentName.hasAttribute('namePlateHovered')) {
                    currentName.removeAttribute('namePlateHovered');
                }
            }
        }

        if (attributeMatchingCount == 2 && !isRemoveAttrOnly) {
            currentName.setAttribute('namePlateHovered', true);
        }
    }
}