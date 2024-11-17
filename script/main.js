let products ={}
let productsArray = new Array;
let n = 7;
document.addEventListener("DOMContentLoaded", () =>
{
    fetcApphData();

}
);

async function fetchData() {
    const list = document.querySelector('.products_item');
    console.log (list);
/*    if(list!="null") {
        list.remove();
    }
        */
    fetcApphData();
}
async function fetcApphData(limit =6) {
    const products_list = document.getElementById('products_list');
    try {
        let response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
        if (!response.ok) {
            throw new Error('Oшибка: ${response.status}');
        }
        let data = await response.json();

            console.log(data);
         for ( let item of data) { 
            const li =document.createElement('li');
            li.className = 'products_item';
            li.innerHTML =
           `                        <p  class="products_id" >${item.id}</p>   
                                    <p id="products_category" class="products_category">${item.category}</p>
                                    <img src='${item.image}' alt="image" id="products_image" class="products_image">
                                    <h4 id="products_title" class="products_title">${item.title}</h4>
                                    <br>
                                    <p id="products_price" class="products_price">${item.price}</p>
                                    <br>
                                    <p id="products_description" class="products_description">${item.description}</p>

                                    <br>
                                    <button class="products_del_button">Удалить товар</button>              
          `;
          console.log(li);
          products_list.appendChild(li);
        } 
        return data;
        } catch(error) {
        console.error('Ошибка:', error);
        }
}
/* добавление товара */ 
const title = document.querySelector(`#products_title`);
const price = document.querySelector(`#products_price`);
const description = document.querySelector(`#products_description_txt`);
const category = document.querySelector(`#products_category`);
const products_add_button = document.querySelector(`.products_add_button`);

async function fetchNewData(idNewProduct) {
    try {
       /* console.log(idNewProduct);*/
        let response = await fetch(`https://fakestoreapi.com/products/${idNewProduct}`)
        if (!response.ok) {
            throw new Error('Oшибка: ${response.status}');
        }
        let data = await response.json();

            console.log(data);
         
            const li =document.createElement('li');
            li.className = 'products_item';
            li.innerHTML =
           `                        <p  class="products_id" >${data.id}</p>   
                                    <p id="products_category" class="products_category">${data.category}</p>
                                    <img src='${data.image}' alt="image" id="products_image" class="products_image">
                                    <h4 id="products_title" class="products_title">${data.title}</h4>
                                    <br>
                                    <p id="products_price" class="products_price">${data.price}</p>
                                    <br>
                                    <p id="products_description" class="products_description">${data.description}</p>

                                    <br>
                                    <button class="products_del_button">Удалить товар</button>              
          `;
          console.log(li);
          products_list.appendChild(li);
     
        return data;
        } catch(error) {
        console.error('Ошибка:', error);
        }
}



async function addProduct () {
   /* console.log ("нажата кнопка добавить товар"); */
    console.log (title.value,price.value,description.value,category.value); 
    try {
        const response = await fetch(`https://fakestoreapi.com/products` , {
            method: "POST",
                body: JSON.stringify
                ({
                title: `${title.value}`,
                price: price.value, 
                description: `${description.value}`, 
                category: `${category.value}`
            }), 
        });
        const newProduct = await response.json();
        console.log(newProduct.id);
        
        alert("товар добавлен успешно!");
        title.value='';
        price.value=0.0;
        description.value='описание товара';
        category.value='';
        
        fetchNewData(newProduct.id); // Обновление списка товаров
        
               

    } catch (error) {
        console.error ("Ошибка добавления товара", error);   
    }
}
/* слушатель нажатия кнопки добавить товар и проверка на не пустые значения */
products_add_button.addEventListener(`click`,(event) => {
    event.preventDefault();
    if (title.value !="" && price.value !="" && category.value!="") {
        addProduct();
    } else {
        console.log(+price.value);
        if (title.value =="") {
            alert(" Название товара не может быть пустым! Заполните его пожалуйста.");
        } else if (price.value =="") {
            alert("Цена товара не может быть пустым! Заполните его пожалуйста. ");
        } else if (category.value=="") {
            alert ("Выберите категорию товара.");
        }
    }
})  


/*  фильтрация по категории */ 

const buttonFiltr = document.querySelector('.main_button_filtr');
async function filtrProduct(category) {
   
        const products_list = document.getElementById('products_list');
        const children = document.getElementsByClassName('products_item');
       /* children.remove();*/
        console.log ( children);
       
        try {
            let response = await fetch(`https://fakestoreapi.com/products/category/${category.value}`)
            if (!response.ok) {
                throw new Error('Oшибка: ${response.status}');
            }
            let data = await response.json();
    
                console.log(data);
             for ( let item of data) { 
                const li =document.createElement('li');
                li.className='products_item';
                li.innerHTML =
               `                        <p  class="products_id" >${item.id}</p>   
                                        <p id="products_category" class="products_category">${item.category}</p>
                                        <img src='${item.image}' alt="image" id="products_image" class="products_image">
                                        <h4 id="products_title" class="products_title">${item.title}</h4>
                                        <br>
                                        <p id="products_price" class="products_price">${item.price}</p>
                                        <br>
                                        <p id="products_description" class="products_description">${item.description}</p>
    
                                        <br>
                                        <button class="products_del_button">Удалить товар</button>              
              `;
              console.log(li);
             
              products_list.appendChild(li);
            } 
            const productId = document.querySelector('.products_id');

            return data;
            } catch(error) {
            console.error('Ошибка:', error);
            }
}
console.log(buttonFiltr);
buttonFiltr.addEventListener(`click`,(event) => {
    const form = document.forms[1];
    const category = form.elements.categaries;
    event.preventDefault();
    console.log (form,category.value);   
    filtrProduct(category);
})  

/* загрузить еще */
const main_button_load = document.querySelector(".main_button_load");
console.log (main_button_load);

main_button_load.addEventListener(`click`,(event) => {
    event.preventDefault();
    for (let i=n; i<n+6; i++)
    { 
        fetchNewData(i);
   };
    n=n+6;
})
/*  удаление товара */

const productId = document.querySelector('.products_id');
const products_del_button = document.querySelector('.products_del_button');
console.log (productId,products_del_button);
async function delProduct(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId.value}` , {
            method: "DELETE" })
        .then(res=>res.json()) 
        .then(json=>console.log(json))
              
        alert("товар удален успешно!");
        fetchData(); // Обновление списка товаров
    } catch (error) {
        console.error ("Ошибка удаления товара", error);   
    }
}
/*
products_del_button.addEventListener(`click`,(event) => {
    event.preventDefault();
    delProduct(productId);
})   
 */
