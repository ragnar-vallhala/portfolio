const titles = ["Ashutosh Vishwakarma", "Coder | Developer"]
let i = 0;
function change_title() {
  i++;
  i %= titles.length;
  document.getElementById('title').innerHTML = titles[i];
}

const title_change = setInterval(change_title, 5000);
