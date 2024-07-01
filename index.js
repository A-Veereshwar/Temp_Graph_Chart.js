
tempChart();

async function tempChart(){
    const ctx = document.getElementById('chart').getContext('2d');
        const dataOutput = await tempData();
        const chart = new Chart(ctx, {
          autoPadding: true,
          type: 'line',
          data: {
            labels: dataOutput.x_axis,
            datasets: [
              {
                label: 'Global Average Temperature',
                data: dataOutput.y_axis,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
              },
              {
                label: 'Northern Hemisphere Average Temperature',
                data: dataOutput.northernTemp,
                fill: false,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.5)',
                borderWidth: 1
              },
              {
                label: 'Southern Hemisphere Average Temperature',
                data: dataOutput.southernTemp,
                fill: false,
                borderColor: 'rgba(88, 214, 141, 1)',
                backgroundColor: 'rgba(88, 214, 141, 0.5)',
                borderWidth: 1
              }
            ]

          },options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value+"℃";
                        }
                    }
                }
            }
        }
        });
}
async function tempData() {

    const x_axis = [];
    const y_axis = [];
    const northernTemp = [];
    const southernTemp = [];
    const data = await fetch('ZonAnn.Ts+dSST.csv');
    const response = await data.text();
    const table = response.split('\n').splice(1);

    table.forEach( row => {
        const Col = row.split(',');
        const year = Col[0];
        x_axis.push(year);
        y_axis.push(parseFloat(Col[1])+14);
        northernTemp.push(parseFloat(Col[2])+14);
        southernTemp.push(parseFloat(Col[3])+14);
    });

    return {x_axis, y_axis, northernTemp, southernTemp};
}