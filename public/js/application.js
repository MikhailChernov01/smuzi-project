
const progBar = document.querySelector('#line');
const actBtn = document.querySelector('#bottle');


actBtn.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { inputNewCode } = actBtn;
  const response = await fetch('/users/bottle', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      inputNewCode: inputNewCode.value,
    })
  });
  const result = await response.json()
  let cnt = 1
  let tmpRes=0
  if (result) {
    progBar.style.width = tmpRes + `${cnt * 15}%`
    cnt++
  }

})

