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