
const budgetForm = document.querySelector('#budget-form');
const categoryForm = document.querySelector('#category-form');
const categoryList = document.querySelector('#category-list');
const pieChart = document.querySelector('#pie-chart').getContext('2d');

let budget = 0;
let categories = [];

budgetForm.addEventListener('submit', event => {
  event.preventDefault();
  budget = parseFloat(document.querySelector('#budget-amount').value);
  budgetForm.style.display = 'none';
  categoryForm.style.display = 'block';
  updatePieChart();
});

categoryForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#category-name').value;
  const amount = parseFloat(document.querySelector('#category-amount').value);
  categories.push({ name, amount });
  document.querySelector('#category-name').value = '';
  document.querySelector('#category-amount').value = '';
  updateCategoryList();
  updatePieChart();
});

function updateCategoryList() {
  categoryList.innerHTML = '';
  for (const category of categories) {
    const li = document.createElement('li');
    li.textContent = `${category.name}: $${category.amount.toFixed(2)}`;
    categoryList.appendChild(li);
  }
}

function updatePieChart() {
  const data = {
    labels: categories.map(category => category.name),
    datasets: [{
      data: categories.map(category => category.amount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8DB600', '#E62E00', '#E6B3B3', '#B3E6B3', '#B3B3E6', '#E6E6B3']
    }]
  };
  const options = {
    title: {
      display: true,
      text: `Budget: $${budget.toFixed(2)}`,
      fontSize: 18
    }
  };
  if (window.pieChart) {
    window.pieChart.destroy();
  }
  window.pieChart = new Chart(pieChart, {
    type: 'pie',
    data: data,
    options: options
  });
}
