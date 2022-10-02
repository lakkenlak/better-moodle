//run on body load
document.body.onload = () => {
    darkenEventColors()
}

function darkenEventColors(){
    const targetNode = document.getElementById("page-content")
    
    const config = { attributes: true, childList: true, subtree: true };

    function callback(mutationList, observer){
        for(let i of mutationList) {
            const eventNode = i.target
            if(eventNode.className.includes("fc-time-grid-event")) {
                darkenBackgroundColor(eventNode)
            }
        }
    }

    const observer = new MutationObserver(callback);

    //listen for change in page-content
    observer.observe(targetNode, config);

    function darkenBackgroundColor(node){
        const styleString = node.style["background-color"]

        if(styleString != null && !node.className.includes("better-moodle-mutated")) {
            node.className += "better-moodle-mutated" //add a class to prevent the node getting its color changed multiple times
            const stringValues = styleString.split("rgb(")[1].split(")")[0].split(", ")

            const intValues = stringValues.map( val => {
                return parseInt(val)
            })

            //change background and border color
            node.style["background-color"] = `rgb(${2/3*intValues[0]}, ${2/3*intValues[1]}, ${2/3*intValues[2]})`
            node.style["border-color"] = `rgb(${2/3*intValues[0]}, ${2/3*intValues[1]}, ${2/3*intValues[2]})`
        }
    }
}