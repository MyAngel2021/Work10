const lim = 6;
let n = lim + 1;
document.addEventListener('DOMContentLoaded', () => {
  const data = fetcApphData();
  if (data) {
    /*  console.log(data); */
    getFiltrProduct();
  } else {
    console.log('Ошибка');
  }
});
/* загрузка 6 товаров  */
const products_list = document.getElementById('products_list');
async function fetcApphData(limit = lim) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error('Oшибка: ${response.status}');
    }
    const data = await response.json();

    /*  console.log(data); */
    for (const item of data) {
      const li = document.createElement('li');
      li.className = 'products_item';
      li.id = 'products_item';
      li.innerHTML = `                        <p  class="products_id" >${item.id}</p>   
                                    <p id="products_category" class="products_category">${item.category}</p>
                                    <img src='${item.image}' alt="image" id="products_image" class="products_image">
                                    <h4 id="products_title" class="products_title">${item.title}</h4>
                                    <br>
                                    <p id="products_price" class="products_price">${item.price} USD</p>
                                    <br>
                                    <p id="products_description" class="products_description">${item.description}</p>
                                    <br>
                                    <button class="products_del_button" onclick="delProduct(${item.id})">Удалить товар</button>              
          `;
      /*  console.log(li); */
      products_list.appendChild(li);
    }
    return data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  }
}
/* загрузка 1 товара */

async function fetchNewData(idProduct) {
  try {
    /* console.log(idProduct);*/
    const response = await fetch(
      `https://fakestoreapi.com/products/${idProduct}`,
    );
    if (!response.ok) {
      throw new Error('Oшибка: ${response.status}');
    }
    const data = await response.json();
    const li = document.createElement('li');
    li.className = 'products_item';
    li.id = 'products_item';
    li.innerHTML = `                        <p  class="products_id" >${data.id}</p>   
                                    <p id="products_category" class="products_category">${data.category}</p>
                                    <img src='${data.image}' alt="image" id="products_image" class="products_image">
                                    <h4 id="products_title" class="products_title">${data.title}</h4>
                                    <br>
                                    <p id="products_price" class="products_price">${data.price} USD</p>
                                    <br>
                                    <p id="products_description" class="products_description">${data.description}</p>
                                    <br>
                                    <button class="products_del_button" onclick="delProduct(${data.id})>Удалить товар</button>              
          `;
    /*  console.log(li); */
    products_list.appendChild(li);

    return data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  }
}

/*  добавление товара */
const title = document.querySelector(`#products_title`);
const price = document.querySelector(`#products_price`);
const description = document.querySelector(`#products_description_txt`);
const category = document.querySelector(`#products_category`);
const products_add_button = document.querySelector(`.products_add_button`);

async function addProduct() {
  /* console.log ("нажата кнопка добавить товар"); 
    console.log (title.value,price.value,description.value,category.value);  */
  try {
    const response = await fetch(`https://fakestoreapi.com/products`, {
      method: 'POST',
      body: JSON.stringify({
        title: `${title.value}`,
        price: price.value,
        description: `${description.value}`,
        category: `${category.value}`,
      }),
    });
    const newProduct = await response.json();
    console.log(newProduct.id);

    alert(
      `товар ${title.value} с ценой ${price.value} в катерогию ${category.value} добавлен успешно!`,
    );
    title.value = '';
    price.value = 0.0;
    description.value = 'описание товара';
    category.value = '';
    location.reload();
    fetchNewData(newProduct.id); // Обновление списка товаров
  } catch (error) {
    console.error('Ошибка добавления товара', error);
  }
}
/* слушатель нажатия кнопки добавить товар и проверка на не пустые значения */
products_add_button.addEventListener(`click`, (event) => {
  event.preventDefault();
  if (title.value != '' && price.value != '' && category.value != '') {
    addProduct();
  } else {
    console.log(+price.value);
    if (title.value == '') {
      alert(' Название товара не может быть пустым! Заполните его пожалуйста.');
    } else if (price.value == '') {
      alert('Цена товара не может быть пустым! Заполните его пожалуйста. ');
    } else if (category.value == '') {
      alert('Выберите категорию товара.');
    }
  }
});

/*  фильтрация по категории  читаем категории из базы */

async function getFiltrProduct() {
  const category_chicdren = document.getElementById('categaries__list');

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/categories`,
    );
    if (!response.ok) {
      throw new Error('Oшибка: ${response.status}');
    }
    const data = await response.json();
    /*  console.log(data); */
    for (const item of data) {
      const option = document.createElement('option');
      option.className = 'categaries__item';
      option.value = item;
      option.innerHTML = ` ${item}`;
      category_chicdren.appendChild(option);
    }

    return data;
  } catch (error) {
    console.error('Ошибка загрузки категории товаров:', error);
  }
}
/*  фильтрация по категории  товаров из базы */
async function filtrProduct(f) {
  /*   console.log(f); */
  const n = f.categaries__list.selectedIndex;
  if (n) {
    const categ = f.categaries__list.options[n].value;

    const products_div = document.getElementById('products');
    const products_list = document.getElementById('products_list');

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${categ}`,
      );
      if (!response.ok) {
        throw new Error('Oшибка: ${response.status}');
      }
      const data = await response.json();
      console.log(data);
      products_list.remove();
      const ul = document.createElement('ul');
      ul.className = 'products_list';
      ul.id = 'products_list';
      products_div.prepend(ul);
      for (const item of data) {
        const li = document.createElement('li');
        li.className = 'products_item';
        li.id = 'products_item';
        li.innerHTML = `                <p  class="products_id" >${item.id}</p>   
                                        <p id="products_category" class="products_category">${item.category}</p>
                                        <img src='${item.image}' alt="image" id="products_image" class="products_image">
                                        <h4 id="products_title" class="products_title">${item.title}</h4>
                                        <br>
                                        <p id="products_price" class="products_price">${item.price} USD</p>
                                        <br>
                                        <p id="products_description" class="products_description">${item.description}</p>
                                        <br>
                                        <button class="products_del_button" onclick="delProduct(${item.id})">Удалить товар</button>              
              `;
        /* console.log(li); */

        ul.appendChild(li);
      }

      return data;
    } catch (error) {
      console.error('Ошибка загрузки товаров по категории:', error);
    }
  }
}

/* загрузить еще */
const main_button_load = document.querySelector('.main_button_load');

main_button_load.addEventListener(`click`, (event) => {
  event.preventDefault();
  for (let i = n; i < n + lim; i++) {
    fetchNewData(i);
  }
  n = n + lim;
});

/*  удаление товара */
async function delProduct(productId) {
  console.log(productId);
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE'
      });
    if (!response.ok) {
        throw new Error(`Oшибка: ${response.status}`);  }
        const data = await response.json();
        console.log(data);
    alert(`товар  ${productId} удален успешно!`);
  } catch (error) {
    console.error(`Ошибка удаления товара ${productId}`, error);
  }
}
