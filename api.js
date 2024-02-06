document.addEventListener("DOMContentLoaded", () => {
    fetchProducts(); // เรียกใช้งานเมื่อหน้าเว็บโหลดเพื่อแสดงสินค้าทั้งหมด
    fetchAllCategories();
});

// ฟังก์ชั่นแสดงสินค้าทั้งหมด
const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error:', error));
}

// ฟังก์ชั่นแสดงสินค้าตามหมวดหมู่
const fetchProductsByCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error:', error));
}

// ฟังก์ชั่นแสดงสินค้าบนหน้าเว็บ
const displayProducts = (products) => {
    const app = document.getElementById('app');
    app.innerHTML = ''; // ล้างข้อมูลสินค้าเก่าออกก่อนแสดงผลลัพธ์ใหม่
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 25)}</h3>
            <p class="price">ราคา ${product.price} บาท</p>
        `;
        app.appendChild(card);
    });
}

// ฟังก์ชั่นดึงข้อมูลหมวดหมู่สินค้าและแสดงปุ่มสำหรับแต่ละหมวดหมู่
const fetchAllCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesContainer = document.getElementById('categories');
            categoriesContainer.classList.add('categories');
            if (!categoriesContainer) return;
            categoriesContainer.innerHTML = categories.map(category => `<li><button class="category-btn">${category}</button></li>`).join('');
            // เพิ่ม event listeners สำหรับปุ่มทุกปุ่ม
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => fetchProductsByCategory(btn.textContent));
            });
        })
        .catch(error => console.error('Error:', error));
}
