const params = new URLSearchParams(window.location.search);
const product_id = params.get("id");

if (product_id) {
    showProductsDetail(product_id);
}

function returnURL(path){
    return `https://api.escuelajs.co/api/v1/${path}`
}


show3RecentProducts();
showAllProducts();
listCategoriesInSelect();


// INDEX.HTML


function show3RecentProducts(){
    let path = "products?offset=0&limit=3&sortBy=creationAt&order=desc"
    fetch(returnURL(path))
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados!");
            }
            return response.json();
        })
        .then(data => {
            let cards = ""

            data.forEach(element => {
                let card = `
                    <article class="card placeholder-card">
                        <div class="card-img-wrapper">
                            <img src="./img/nophoto.png" alt="Loading" class="card-img">
                        </div>
                        <div class="card-content">
                            <span class="card-category">${element.category.name}</span>
                            <h3 class="card-title">${element.title}</h3>
                            <div class="card-footer">
                            <span class="card-price">R$ ${element.price}</span>
                            <a href="./detail.html?id=${element.id}" class="btn-primary btn-small">Ver Detalhes</a>
                            </div>
                        </div>
                    </article>
                    `
                cards += card
            });

            document.getElementById("featured-list").innerHTML = cards

        })
        .catch(error => {
            console.log(error);
        })
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// MENU.HTML

function showAllProducts(){
    let path = "products"
    fetch(returnURL(path))
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados!");
            }
            return response.json();
        })
        .then(data => {
            let cards = ""

            data.forEach(element => {
                let card = `
                    <article class="card placeholder-card">
                        <div class="card-img-wrapper">
                            <img src="./img/nophoto.png" alt="Loading" class="card-img">
                        </div>
                        <div class="card-content">
                            <span class="card-category">${element.category.name}</span>
                            <h3 class="card-title">${element.title}</h3>
                            <div class="card-footer">
                            <span class="card-price">R$ ${element.price}</span>
                            <a href="./detail.html?id=${element.id}" class="btn-primary btn-small">Ver Detalhes</a>
                            </div>
                        </div>
                    </article>
                    `
                cards += card
            });

            document.getElementById("products-list").innerHTML = cards

        })
        .catch(error => {
            console.log(error);
        })
}

function listCategoriesInSelect(){
    let path = "categories"
    fetch(returnURL(path))
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados!");
            }
            return response.json();
        })
        .then(data => {
            let options = '<option value="">Todas as Categorias</option>'

            data.forEach(element => {
                let option = `
                    <option value="${element.id}">${element.name}</option>
                    `
                options += option
            });

            document.getElementById("category-filter").innerHTML = options

        })
        .catch(error => {
            console.log(error);
        })
}

function filterProducts(product_id){
    let path = product_id
        ? `products?categoryId=${product_id}`
        : `products`; 
        
    fetch(returnURL(path))
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados!");
            }
            return response.json();
        })
        .then(data => {
            let cards = ""

            data.forEach(element => {
                let card = `
                    <article class="card placeholder-card">
                        <div class="card-img-wrapper">
                            <img src="./img/nophoto.png" alt="Loading" class="card-img">
                        </div>
                        <div class="card-content">
                            <span class="card-category">${element.category.name}</span>
                            <h3 class="card-title">${element.title}</h3>
                            <div class="card-footer">
                            <span class="card-price">R$ ${element.price}</span>
                            <a href="./detail.html?id=${element.id}" class="btn-primary btn-small">Ver Detalhes</a>
                            </div>
                        </div>
                    </article>
                    `
                cards += card
            });

            document.getElementById("products-list").innerHTML = cards

        })
        .catch(error => {
            console.log(error);
        })
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// DETAIL.HTML

function showProductsDetail(product_id){
    let path = `products/${product_id}`

    fetch(returnURL(path))
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados!");
            }
            return response.json();
        })
        .then(data => {
            let info = `
                    <img src="./img/nophoto.png" alt="Loading" class="detail-img">
                    <div class="detail-info">
                        <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">Categoria: ${data.category.name}</span>
                        <h1>${data.title}</h1>
                        <div class="detail-price">R$ ${data.price}</div>
                        <p class="detail-description">${data.description}</p>
                        <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
                    </div>
                    `
            document.getElementById("product-detail").innerHTML = info

        })
        .catch(error => {
            console.log(error);
        })
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// DARK/LIGHT THEME

function toggleTheme(){
    const currentTheme = document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark"
     document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}