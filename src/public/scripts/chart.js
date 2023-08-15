const ChartClassContainer = 'chart-container';
const HeaderClass = 'chart-header';
const ChartTitle = 'chart-title';
const ChartCloseButton = 'chart-close-btn';

let ChartContainer;
let ChartHeader;

document.addEventListener('click', function (event) {
    if (event.target.classList.contains(ChartCloseButton)) {
        ChartDestroy();
    }
});


export function AddChart(title) {
    AddChartContainer();
    AddChartHeader();
    AddHeaderContent(title);
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

function ChartDestroy() {
    if (ChartContainer) {
        ChartContainer.parentNode.removeChild(ChartContainer);
    }
}