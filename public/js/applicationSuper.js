const buttonMounth = document.querySelector('#btn-mounth');
const buttonWeek = document.querySelector('#btn-week');
const buttonThreDays = document.querySelector('#btn-three-day');
const customer = document.querySelector('#customers');
const body = document.querySelector('body');
const btnDownoloadListUsers = document.querySelector('#downoload-list');

async function generateDashBoard(data) {
  const allSumTd = document.querySelector('#sum');
  const allPurchasesTd = document.querySelector('#all-purchases');
  const responce = await fetch(`super/${data}`);
  const result = await responce.json();

  const { arrSum, sortData, allSum, countSum } = result.obj;

  allSumTd.innerHTML = allSum;
  allPurchasesTd.innerHTML = countSum;

  const prettyArrData = sortData.map((el) => el
    .toString()
    .match(/[A-z]{3}\s(\d{2})\s(\d{4})/gim)
    .join());

  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: prettyArrData,
      datasets: [
        {
          data: arrSum,
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

  const res = await responce.text();
  //  res = Handlebars.compile(res)
  body.innerHTML = res;
  // console.log(res)
  // body.append(res)
});

btnDownoloadListUsers.addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('super/downoload-list');
});
