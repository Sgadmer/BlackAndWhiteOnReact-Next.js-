export default function markLooserNamePlate(name, namesRef, isRemoveAttrOnly) {

    let namesArrayNODE = namesRef.current.children;
    let namesAttributes;
    let attributeMatchingCount = 0;

    for (let currentName of namesArrayNODE) {


        if (currentName.hasAttribute('cardtype')) {
            namesAttributes = currentName.attributes;
            attributeMatchingCount = 0;

     
            
            for (let attr of namesAttributes) {
                if (attr.value == name) attributeMatchingCount++;
             
            }

            if (attributeMatchingCount && !isRemoveAttrOnly) {
                currentName.setAttribute('playerLose', true);
            }
        }

    }
}