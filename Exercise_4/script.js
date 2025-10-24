// Đợi cho đến khi toàn bộ tài liệu HTML được tải xong
document.addEventListener("DOMContentLoaded", function() {

    // --- PHẦN 1: XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM ---

    // Lấy các phần tử DOM cần thiết
    const addProductBtn = document.getElementById('addProductBtn'); // Nút "Thêm sản phẩm"
    const addProductForm = document.getElementById('addProductForm'); // Form thêm
    const cancelBtn = document.getElementById('cancelBtn'); // Nút "Hủy" trong form

    // Gắn sự kiện 'click' cho nút "Thêm sản phẩm"
    addProductBtn.addEventListener('click', function() {
        // Chuyển đổi (thêm/xóa) class 'hidden' để ẩn/hiện form
        addProductForm.classList.toggle('hidden');
    });

    // Gắn sự kiện 'click' cho nút "Hủy"
    cancelBtn.addEventListener('click', function() {
        // Luôn thêm class 'hidden' để ẩn form
        addProductForm.classList.add('hidden');
        // Xóa sạch nội dung các ô input trong form
        addProductForm.reset();
    });

    addProductForm.addEventListener('submit', function(event) {
        
        // 1. Ngăn chặn hành vi mặc định (tải lại trang) 
        event.preventDefault();

        // 2. Lấy giá trị từ các ô input
        const name = document.getElementById('newName').value.trim(); 
        const price = document.getElementById('newPrice').value.trim(); 
        const desc = document.getElementById('newDesc').value.trim(); 
        
        // Lấy phần tử để hiển thị lỗi
        const errorMsg = document.getElementById('errorMsg'); 

        // 3. Validate (Kiểm tra) dữ liệu
        
        // Kiểm tra tên rỗng
        if (name === "" || price === "") {
            errorMsg.textContent = "Lỗi: Tên sản phẩm và Giá không được để trống!";
            return; // Dừng hàm, không thêm sản phẩm
        }
        
        // Kiểm tra giá có phải là số và lớn hơn 0 không
        if (isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = "Lỗi: Giá phải là một số dương hợp lệ!";
            return; // Dừng hàm
        }

        // 4. Nếu hợp lệ:
        // Xóa thông báo lỗi (nếu có)
        errorMsg.textContent = "";

        // 5. Tạo phần tử HTML mới cho sản phẩm
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item';

        // Dùng template string (innerHTML) để tạo nội dung bên trong
        newProduct.innerHTML = `
            <h3 class="product-name">${name}</h3>
            <p class="product-desc">${desc || 'Không có mô tả.'}</p>
            <p class="product-price">Giá: ${Number(price).toLocaleString('vi-VN')} VNĐ</p>
        `;
        // (Chúng ta dùng toLocaleString để format giá tiền cho đẹp, ví dụ: 150000 -> 150.000)

        // 6. Thêm sản phẩm mới vào ĐẦU danh sách
        const productListContainer = document.getElementById('product-items-container');
        productListContainer.prepend(newProduct);

        // 7. Dọn dẹp: Reset form và ẩn đi
        addProductForm.reset(); // Xóa nội dung các ô input
        addProductForm.classList.add('hidden'); // Ẩn form
    });
    // --- PHẦN 2: XỬ LÝ TÌM KIẾM (LỌC) SẢN PHẨM ---

    // Lấy ô input tìm kiếm
    const searchInput = document.getElementById('searchInput');

    // Gắn sự kiện 'keyup' (kích hoạt mỗi khi người dùng gõ một phím)
    searchInput.addEventListener('keyup', function() {
        
        // Lấy giá trị trong ô tìm kiếm, chuyển về chữ thường và bỏ khoảng trắng thừa
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Lấy TẤT CẢ các sản phẩm đang có trên trang
        const allProducts = document.querySelectorAll('.product-item');

        // Lặp qua từng sản phẩm
        allProducts.forEach(function(product) {
            // Lấy nội dung text của tên sản phẩm (class .product-name)
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            
            // Kiểm tra xem tên sản phẩm có chứa từ khóa tìm kiếm không
            if (productName.includes(searchTerm)) {
                // Nếu có, hiển thị sản phẩm
                product.style.display = 'block';
            } else {
                // Nếu không, ẩn sản phẩm đi
                product.style.display = 'none';
            }
        });
    });
    
}); // Kết thúc sự kiện DOMContentLoaded