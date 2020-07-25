const buttonMounth = document.querySelector('#btn-mounth'),
  buttonWeek = document.querySelector('#btn-week'),
  buttonThreDays = document.querySelector('#btn-three-day'),
  customer = document.querySelector('#customers'),
  body = document.querySelector('body'),
  btnDownoloadListUsers = document.querySelector('#downoload-list');
console.log(btnDownoloadListUsers);

async function generateDashBoard(data) {
  const responce = await fetch(`super/${data}`);
  const result = await responce.json();
  let prettyArrData = result.sortData.map((el) =>
    el
      .toString()
      .match(/[A-z]{3}\s(\d{2})\s(\d{4})/gim)
      .join()
  );
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: prettyArrData,
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
}
generateDashBoard('week');

buttonMounth.addEventListener('click', async () => {
  generateDashBoard('mounth');
});

buttonWeek.addEventListener('click', async () => {
  generateDashBoard('week');
});

buttonThreDays.addEventListener('click', async () => {
  generateDashBoard('threeDays');
});

customer.addEventListener('click', async (e) => {
  e.preventDefault();

  const responce = await fetch('super/customers');
  let res = await responce.text();
  //  res = Handlebars.compile(res)
  body.innerHTML = res;
  // console.log(res)
  // body.append(res)
});
