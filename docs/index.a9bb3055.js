document.addEventListener("DOMContentLoaded",function(){fetch("https://dummyjson.com/products",t).then(t=>{if(t.ok)return t.json();throw Error("HTTP error")}).then(t=>{!function(t){let o=t.results.map(t=>r(t)).join(""),e=document.querySelector(".productCard");null!==e?e.innerHTML=o:console.log("Element not found")}({results:t.products})}).catch(t=>{console.log("Could not fetch products:",t)})});const t={method:"GET",headers:{"Content-type":"application/json; charset=UTF-8"}},o=document.querySelector("#form"),e=document.querySelector(".productCard");function r(t){let o=t.images.length>0?t.images[0]:"src/media/placeholder.jpeg",e=t.stock<10?"Only a few left!":"";return`
    <div class="product">
        <img src="${o}" alt="${t.title}" class="productImage">
        <h2 class="productTitle">${t.title}</h2>
        <p class="productDescription pFont">${t.description}</p>
        <p class="productRating pFont">Rating: ${t.rating}</p>
        <p class="productStock pFont">In stock: ${t.stock}</p>
        <p class="lowstock pFont">${e}</p>
        <p class="productCategory pFont">Category: ${t.category}</p>
        <div><button class="cartButton pFont">Add to cart</button></div>
    </div>
  `}console.log(e),o.addEventListener("submit",n=>{n.preventDefault();let c=document.querySelector("#searchInput").value;fetch(`https://dummyjson.com/products/search?q=${c}`,t).then(t=>{if(t.ok)return t.json();throw Error("HTTP error")}).then(t=>{if(e){let o=t.products.map(t=>r(t)).join("");e.innerHTML=o}}).catch(t=>{console.log("Could not display product:",t)}),o.reset()});
//# sourceMappingURL=index.a9bb3055.js.map
