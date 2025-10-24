// Đợi cho đến khi toàn bộ tài liệu HTML được tải xong
document.addEventListener("DOMContentLoaded", function() {
    
    // Lấy DOM element chính, dùng chung cho nhiều hàm
    const productListContainer = document.getElementById('product-items-container');
    const addProductForm = document.getElementById('addProductForm'); // Form thêm
    const errorMsg = document.getElementById('errorMsg'); // Hiển thị lỗi

    /**
     * BÀI 5: Hàm LƯU danh sách sản phẩm vào localStorage
     */
    function saveProductsToStorage() {
        const allProducts = document.querySelectorAll('.product-item');
        const productsArray = [];
        
        // Lặp qua từng sản phẩm trên trang
        allProducts.forEach(function(product) {
            // Trích xuất dữ liệu
            const name = product.querySelector('.product-name').textContent;
            const desc = product.querySelector('.product-desc').textContent;
            const price = product.querySelector('.product-price').textContent;
            
            // Thêm vào mảng
            productsArray.push({
                name: name,
                desc: desc,
                price: price 
            });
        });
        
        // Chuyển mảng thành chuỗi JSON và lưu vào localStorage 
        localStorage.setItem('products', JSON.stringify(productsArray));
    }

    /**
     * BÀI 5 (ĐÃ CẬP NHẬT): Hàm TẢI sản phẩm từ localStorage
     * HOẶC TẠO MỚI nếu localStorage rỗng
     */
    function loadProductsFromStorage() {
        // Lấy dữ liệu chuỗi từ localStorage 
        const savedData = localStorage.getItem('products');
        
        let productsArray = []; // Mảng chứa sản phẩm

        // 1. KIỂM TRA NẾU CÓ DỮ LIỆU ĐÃ LƯU
        if (savedData) {
            // Nếu có, chuyển chuỗi JSON ngược lại thành mảng
            productsArray = JSON.parse(savedData);
        } 
        // 2. NẾU KHÔNG CÓ DỮ LIỆU (LẦN ĐẦU) -> TẠO DỮ LIỆU MẪU
        else {
            // Đây là lần đầu tiên người dùng vào trang (hoặc đã clear storage)
            productsArray = [
                {
                    name: "Sách Lập trình Web",
                    desc: "Hướng dẫn chi tiết về HTML, CSS và JavaScript.",
                    price: "Giá: 150.000 VNĐ"
                },
                {
                    name: "Sách Thuật toán",
                    desc: "Giới thiệu các thuật toán cơ bản và nâng cao trong lập trình.",
                    price: "Giá: 180.000 VNĐ"
                },
                {
                    name: "Sách Trí tuệ Nhân tạo",
                    desc: "Khám phá thế giới AI và Machine Learning với các ví dụ thực tế.",
                    price: "Giá: 220.000 VNĐ"
                },
                {
                    name: "Sách An toàn thông tin",
                    desc: "Bảo mật mạng và các phương pháp phòng chống tấn công.",
                    price: "Giá: 300.000 VNĐ"
                },
                {
                    name: "Sách Lập trình Mobile",
                    desc: "Kiến thức toàn diện về phát triển ứng dụng di động.",
                    price: "Giá: 150.000 VNĐ"
                }
            ];
            
            // Lưu ngay 5 sản phẩm mẫu này vào storage cho lần tải sau
            localStorage.setItem('products', JSON.stringify(productsArray));
        }
        
        // 3. VẼ LẠI GIAO DIỆN (Luôn chạy, bất kể là tải hay tạo mới)
        
        // Xóa sạch container (để đảm bảo không bị trùng lặp)
        productListContainer.innerHTML = ''; 

        // Lặp qua mảng sản phẩm
        productsArray.forEach(function(product) {
            // Tạo lại phần tử article cho mỗi sản phẩm
            const newProduct = document.createElement('article');
            newProduct.className = 'product-item';
            newProduct.innerHTML = `
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <p class="product-price">${product.price}</p>
            `;
            
            // Thêm sản phẩm vào danh sách (dùng appendChild để giữ đúng thứ tự)
            productListContainer.appendChild(newProduct);
        });
    }

    // --- BÀI 5: GỌI HÀM TẢI SẢN PHẨM KHI VỪA VÀO TRANG ---
    loadProductsFromStorage();


    // --- PHẦN 1: XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM ---

    // Lấy các phần tử DOM cần thiết
    const addProductBtn = document.getElementById('addProductBtn'); // Nút "Thêm sản phẩm"
    const cancelBtn = document.getElementById('cancelBtn'); // Nút "Hủy" trong form

    // Gắn sự kiện 'click' cho nút "Thêm sản phẩm"
    addProductBtn.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');
    });

    // Gắn sự kiện 'click' cho nút "Hủy"
    cancelBtn.addEventListener('click', function() {
        addProductForm.classList.add('hidden');
        addProductForm.reset();
        errorMsg.textContent = ""; // Xóa thông báo lỗi khi hủy
    });
    
    // --- PHẦN 4 (Bài 3 đã làm): XỬ LÝ SUBMIT FORM ---
    
    addProductForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        const name = document.getElementById('newName').value.trim(); 
        const price = document.getElementById('newPrice').value.trim(); 
        const desc = document.getElementById('newDesc').value.trim(); 
        
        // Validate dữ liệu
        if (name === "" || price === "") {
            errorMsg.textContent = "Lỗi: Tên sản phẩm và Giá không được để trống!";
            return; 
        }
        if (isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = "Lỗi: Giá phải là một số dương hợp lệ!";
            return; 
        }
        
        errorMsg.textContent = ""; // Xóa lỗi nếu hợp lệ

        // Tạo phần tử HTML mới
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item'; 
        newProduct.innerHTML = `
            <h3 class="product-name">${name}</h3>
            <p class="product-desc">${desc || 'Không có mô tả.'}</p>
            <p class="product-price">Giá: ${Number(price).toLocaleString('vi-VN')} VNĐ</p>
        `;

        // Thêm sản phẩm mới vào ĐẦU danh sách
        productListContainer.prepend(newProduct); 
        
        // BÀI 5: LƯU LẠI DANH SÁCH MỚI SAU KHI THÊM
        saveProductsToStorage();

        // Dọn dẹp: Reset form và ẩn đi
        addProductForm.reset(); 
        addProductForm.classList.add('hidden'); 
    });
    
    // --- PHẦN 2: XỬ LÝ TÌM KIẾM (LỌC) SẢN PHẨM ---

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Lấy TẤT CẢ các sản phẩm đang có trên trang (dù là tải từ localStorage hay mới thêm)
        const allProducts = document.querySelectorAll('.product-item');

        allProducts.forEach(function(product) {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
    
});