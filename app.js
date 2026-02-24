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
                            <a href="./detail.html" class="btn-primary btn-small">Ver Detalhes</a>
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
                            <a href="./detail.html" class="btn-primary btn-small">Ver Detalhes</a>
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
                            <a href="./detail.html" class="btn-primary btn-small">Ver Detalhes</a>
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