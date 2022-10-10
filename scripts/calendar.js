const lectureNodes = []

//run on body load
document.body.onload = () => {
    listenForPageContentMutations()
}

function listenForPageContentMutations(){
    const targetNode = document.getElementById("page-content")

    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(findLectureNodes);

    //listen for change in page-content
    observer.observe(targetNode, config);
}

function findLectureNodes(mutationList, observer) {
    for (let i of mutationList) {
        const node = i.target
        if (node.className.includes("fc-time-grid-event")) {
            if (!lectureNodes.includes(node)) {
                lectureNodes.push(node)
                //add function below that should be run when a node is found
                darkenBackgroundColor(node)
                addLectureDuration(node)
            }
        }
    }
}

function addLectureDuration(node){
    const timeString = node.children[0].children[0].innerText
    const timeStrings = timeString.split(" - ")

    const firstTime = timeStringToDate(timeStrings[0])
    const lastTime = timeStringToDate(timeStrings[1])

    const minutes = (lastTime - firstTime) / 1000 / 60

    node.children[0].children[0].innerText += ` | ${minutes} min`
}

//Takes in string formatted as "19:45"
function timeStringToDate(timeString){
    const HH = timeString.split(":")[0]
    const mm = timeString.split(":")[1]
    return new Date(`2000-01-01T${HH}:${mm}:00`)
}

function darkenBackgroundColor(node) {
    const styleString = node.style["background-color"]
    lectureNodes.push(node)
    const stringValues = styleString.split("rgb(")[1].split(")")[0].split(", ")

    const intValues = stringValues.map(val => {
        return parseInt(val)
    })

    //change background and border color
    node.style["background-color"] = `rgb(${2 / 3 * intValues[0]}, ${2 / 3 * intValues[1]}, ${2 / 3 * intValues[2]})`
    node.style["border-color"] = `rgb(${2 / 3 * intValues[0]}, ${2 / 3 * intValues[1]}, ${2 / 3 * intValues[2]})`
}