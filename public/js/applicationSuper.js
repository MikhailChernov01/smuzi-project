const buttonMounth = document.querySelector('#btn-mounth');
const buttonWeek = document.querySelector('#btn-week');
const buttonThreDays = document.querySelector('#btn-three-day');
const customer = document.querySelector('#customers');
let body = document.querySelector('body')

async function generateDashBoard(data) {
  const responce = await fetch(`super/${data}`);
  const result = await responce.json();
  // let regData = result.sortData.map(
  //   (el) => el.match(/(\d{2})\s(\d{4})/g).join('')
  // \s((\d{2}):){2}(\d{2})
  // );
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: result.sortData,
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
e.preventDefault()
 
 const responce = await fetch('super/customers')
 let res = await responce.text()
//  res = Handlebars.compile(res)
 body.innerHTML = res;
// console.log(res)
// body.append(res)
});