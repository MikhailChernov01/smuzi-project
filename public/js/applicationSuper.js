(async () => {
  const responce = await fetch('super/chart');
  const result = await responce.json();
  console.log(result);
  let regData = result.sortData.map(
    (el) => el.match(/(\d{2})\s(\d{4})/g).join('')
    // \s((\d{2}):){2}(\d{2})
  );
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: regData,
      datasets: [
        {
          data: result.arrSum,
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
