(async () => {
  const responce = await fetch('super/chart');
  const result = await responce.json();
  console.log(result.sum)
  console.log()
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: result.data,
      datasets: [
        {
          data: result.sum,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
})();
