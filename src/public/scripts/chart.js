const ChartClassContainer = 'chart-container';
const HeaderClass = 'chart-header';
const BodyClass = 'chart-body';
const ElemClass = 'chart-elem-container';

const ChartTitle = 'chart-title';
const ChartCloseButton = 'chart-close-btn';

let ChartContainer;
let ChartHeader;
let ChartBody;

document.addEventListener('click', function (event) {
    if (event.target.classList.contains(ChartCloseButton)) {
        ChartDestroy();
    }
});


export function AddChart(title, data) {
    AddChartContainer();
    AddChartHeader();
    AddHeaderContent(title);
    AddChartBody();
    BuildChart(data);
}

function AddChartContainer() {
    const div = document.createElement('div');
    div.classList.add(ChartClassContainer);
    document.body.appendChild(div);

    ChartContainer = document.getElementsByClassName(ChartClassContainer)[0];
}

function AddChartHeader() {
    const div = document.createElement('div');
    div.classList.add(HeaderClass);
    ChartContainer.appendChild(div);

    ChartHeader = document.getElementsByClassName(HeaderClass)[0];
}

function AddHeaderContent(title) {
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    titleDiv.classList.add(ChartTitle);

    const closeButton = document.createElement('div');
    closeButton.textContent = "Закрыть";
    closeButton.classList.add(ChartCloseButton);
    closeButton.classList.add('transition');

    ChartHeader.appendChild(titleDiv);
    ChartHeader.appendChild(closeButton);
}

function AddChartBody() {
    const div = document.createElement('div');
    div.classList.add(BodyClass);
    ChartContainer.appendChild(div);

    ChartBody = document.getElementsByClassName(BodyClass)[0];
}

function CreateElem(date, value, graphValue) {
    const elemData = document.createElement('div');
    elemData.textContent = date;

    const elemValue = document.createElement('div');
    elemValue.setAttribute("style", "width: 40px; height: " + graphValue + "%;background: black;color: white;text-align: center;padding-top: 10px;");
    elemValue.textContent = value;

    const elemContainer = document.createElement('div');
    elemContainer.classList.add(ElemClass);

    elemContainer.appendChild(elemValue);
    elemContainer.appendChild(elemData);

    ChartBody.appendChild(elemContainer);
}

function BuildChart(data) {
    const DataWithDate = data.map(elem => parseDate(elem.Date));

    const dateCounts = DataWithDate
        .filter((date, index) => DataWithDate.findIndex((d) => d.toISOString() === date.toISOString()) === index)
        .map((date) => ({
            date,
            count: DataWithDate.filter((d) => d.toISOString() === date.toISOString()).length
        }))
        .reduce((acc, obj) => {
            const totalCount = acc.reduce((acc2, obj2) => acc2 + obj2.count, 0);
            const percentage = totalCount === 0 ? 100 : (obj.count / totalCount) * 100;
            acc.push({
                ...obj,
                percentage
            });
            return acc;
        }, [])
        .sort((a, b) => b.count - a.count);

    for (let i = 0; i < dateCounts.length; i++) {
        CreateElem(1, dateCounts[i].count, dateCounts[i].percentage);
        console.log(dateCounts[i].percentage);
    }
}

function ChartDestroy() {
    if (ChartContainer) {
        ChartContainer.parentNode.removeChild(ChartContainer);
    }
}

function parseDate(date) {
    const dateParts = date.split(/[\/ :]/);

    const trueDate = new Date();
    trueDate.setDate(dateParts[0]);
    trueDate.setMonth(dateParts[1] - 1);
    trueDate.setFullYear(dateParts[2]);

    return trueDate;
}