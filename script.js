document.addEventListener('DOMContentLoaded', function() {
    // Handle loading screen
    handleLoadingScreen();
    
    // Initialize slideshow
    initSlideshow();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Initialize destination detail modals
    initModals();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Auto-hide navigation on scroll
    initScrollNavigation();
    
    // Hide unnecessary buttons
    hideUnnecessaryButtons();
    
    // Add parallax scrolling effects
    initParallaxEffects();
    
    // Add reveal animations for sections
    initRevealAnimations();
    
    // Add tilt effect to cards
    initTiltEffect();

    // Initialize destination filters
    initDestinationFilters();

    // Make cuisine slider draggable
    initDraggableSlider();

    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize active menu tracking
    initActiveMenuTracking();
});

// Loading Screen Handler
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // More reliable loading approach - wait for content and resources
    window.addEventListener('load', function() {
        if (loadingScreen) {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                
                // Remove the loading screen from DOM after transition completes
                setTimeout(function() {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 600);
            }, 500); // Reduced waiting time for better UX
        }
    });
}

// Slideshow functionality with enhanced transitions
let slideIndex = 1;

function initSlideshow() {
    showSlides(slideIndex);
    
    // Use more efficient interval management
    let slideInterval = setInterval(function() {
        plusSlides(1);
    }, 6000);
    
    // Clear interval when tab is inactive to save resources
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            // Reset interval when tab becomes active again
            clearInterval(slideInterval);
            slideInterval = setInterval(function() {
                plusSlides(1);
            }, 6000);
        }
    });
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    if (dots && dots.length) {
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
    }
    
    // Add a small delay before showing the new slide for smoother transition
    setTimeout(() => {
        // Show the current slide and activate the corresponding dot
        slides[slideIndex - 1].classList.add('active');
        
        // Animate caption content with sequential animation
        const caption = slides[slideIndex - 1].querySelector('.slide-caption');
        if (caption) {
            caption.style.opacity = '0';
            caption.style.transform = 'translateY(20px)';
            
            const captionElements = caption.querySelectorAll('h2, p, button');
            
            setTimeout(() => {
                caption.style.opacity = '1';
                caption.style.transform = 'translateY(0)';
                
                captionElements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(15px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'all 0.4s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
            }, 300);
        }
        
        if (dots && dots.length) {
            dots[slideIndex - 1].classList.add('active');
        }
    }, 100);
}

// Mobile navigation functionality
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickInsideToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickInsideToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                
                // Reset menu icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                
                // Reset menu icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// Enhanced modal popup functionality
function initModals() {
    const modal = document.getElementById('destination-modal');
    if (!modal) return;
    
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    
    // Open modal on button click - consolidate all buttons with unified method
    const allDetailButtons = document.querySelectorAll('.btn-details, .btn-explore');
    allDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dataId = this.getAttribute('data-id') || 
                           this.getAttribute('data-target') ||
                           (this.closest('[data-id]') ? this.closest('[data-id]').getAttribute('data-id') : null);
            
            if (dataId) {
                // Load content based on data-id
                loadModalContent(dataId, modalBody);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
                
                // Add active class for animation
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        });
    });
    
    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === 'block') {
            closeModalHandler();
        }
    });
    
    function closeModalHandler() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
}

// Load content into the modal based on the ID with enhanced animations
function loadModalContent(id, modalBody) {
    // Content for different destinations
    const contentMap = {
        'dai-noi': {
            title: 'Đại Nội Huế',
            image: 'assets/images/dai-noi-detail.jpg',
            description: `
                <p>Đại Nội Huế hay còn gọi là Hoàng thành Huế là công trình kiến trúc nghệ thuật đặc sắc nhất của triều Nguyễn, được UNESCO công nhận là Di sản Văn hóa Thế giới.</p>
                <p>Với diện tích hơn 500ha, Đại Nội Huế gồm 3 phần chính: Kinh thành, Hoàng thành và Tử Cấm Thành với tổng cộng 147 công trình kiến trúc lớn nhỏ.</p>
                <h4>Điểm tham quan nổi bật:</h4>
                <ul>
                    <li>Ngọ Môn - cổng chính vào Hoàng thành</li>
                    <li>Điện Thái Hòa - nơi đăng quang và thiết triều của vua</li>
                    <li>Thế Miếu - nơi thờ các vị vua triều Nguyễn</li>
                    <li>Cung Diên Thọ - nơi ở của Hoàng Thái hậu</li>
                    <li>Hiển Lâm Các - Điện Phụng Tiên</li>
                </ul>
                <h4>Thông tin tham quan:</h4>
                <p><strong>Địa chỉ:</strong> Đường Đinh Tiên Hoàng, phường Thuận Thành, TP Huế</p>
                <p><strong>Giờ mở cửa:</strong> 7:00 - 17:30 hàng ngày</p>
                <p><strong>Giá vé:</strong> 200.000 VNĐ/người lớn, 40.000 VNĐ/học sinh sinh viên</p>
            `
        },
        'thien-mu': {
            title: 'Chùa Thiên Mụ',
            image: 'assets/images/thien-mu-detail.jpg',
            description: `
                <p>Chùa Thiên Mụ (chùa Linh Mụ) là ngôi chùa cổ nằm trên đồi Hà Khê, bên bờ sông Hương, cách trung tâm thành phố Huế khoảng 5km về phía tây.</p>
                <p>Được xây dựng vào năm 1601 dưới triều chúa Nguyễn Hoàng, chùa Thiên Mụ là ngôi chùa cổ nhất ở Huế với tháp Phước Duyên 7 tầng cao 21m, đã trở thành biểu tượng của cố đô Huế.</p>
                <h4>Điểm tham quan nổi bật:</h4>
                <ul>
                    <li>Tháp Phước Duyên 7 tầng</li>
                    <li>Đại hồng chung nặng hơn 2 tấn</li>
                    <li>Bia Thiên Mụ tự</li>
                    <li>Chiếc xe Austin của Hòa thượng Thích Quảng Đức</li>
                </ul>
                <h4>Thông tin tham quan:</h4>
                <p><strong>Địa chỉ:</strong> Đồi Hà Khê, phường Kim Long, TP Huế</p>
                <p><strong>Giờ mở cửa:</strong> 7:30 - 17:30 hàng ngày</p>
                <p><strong>Giá vé:</strong> Miễn phí</p>
            `
        },
        'lang-tu-duc': {
            title: 'Lăng Tự Đức',
            image: 'assets/images/lang-tu-duc-detail.jpg',
            description: `
                <p>Lăng Tự Đức là một trong những lăng tẩm đẹp nhất của các vua triều Nguyễn, được vua Tự Đức xây dựng từ năm 1864-1867.</p>
                <p>Khác với các lăng mộ khác, Lăng Tự Đức được xây dựng để vua sử dụng khi còn sống, là nơi vua thường xuyên lui tới để làm việc, đọc sách, ngâm thơ và nghỉ ngơi.</p>
                <h4>Điểm tham quan nổi bật:</h4>
                <ul>
                    <li>Hồ Lưu Khiêm - hồ nước rộng lớn với đảo Tịnh Khiêm ở giữa</li>
                    <li>Điện Hòa Khiêm - nơi vua làm việc và sinh hoạt</li>
                    <li>Xung Khiêm Tạ - nhà thủy tạ giữa hồ, nơi vua đọc sách</li>
                    <li>Khiêm Cung Ký - bài bia do chính vua Tự Đức soạn</li>
                </ul>
                <h4>Thông tin tham quan:</h4>
                <p><strong>Địa chỉ:</strong> Lê Ngô Cát, phường Thủy Xuân, TP Huế</p>
                <p><strong>Giờ mở cửa:</strong> 7:00 - 17:30 hàng ngày</p>
                <p><strong>Giá vé:</strong> 150.000 VNĐ/người lớn, 30.000 VNĐ/học sinh sinh viên</p>
            `
        },
        'thuan-an': {
            title: 'Biển Thuận An',
            image: 'assets/images/thuan-an-detail.jpg',
            description: `
                <p>Biển Thuận An là một trong những bãi biển đẹp nhất ở Huế, cách trung tâm thành phố khoảng 15km về phía đông.</p>
                <p>Với bãi cát trắng trải dài, nước biển trong xanh và không gian yên bình, biển Thuận An là điểm đến lý tưởng để nghỉ ngơi, tắm biển và thưởng thức hải sản tươi ngon.</p>
                <h4>Điểm tham quan nổi bật:</h4>
                <ul>
                    <li>Bãi biển dài với cát trắng mịn</li>
                    <li>Làng chài Thuận An với nhiều nhà hàng hải sản</li>
                    <li>Cồn Tè - cồn cát giữa cửa biển</li>
                    <li>Đầm Chuồn với nghề nuôi hàu, tôm, cua</li>
                </ul>
                <h4>Thông tin tham quan:</h4>
                <p><strong>Địa chỉ:</strong> Phường Thuận An, TP Huế</p>
                <p><strong>Thời điểm đẹp nhất:</strong> Tháng 4-8 hàng năm</p>
                <p><strong>Giá vé:</strong> Miễn phí</p>
            `
        },
        'nha-nhac': {
            title: 'Nhã nhạc cung đình Huế',
            image: 'assets/images/nha-nhac-detail.jpg',
            description: `
                <p>Nhã nhạc cung đình Huế là loại hình âm nhạc được sử dụng trong các nghi lễ của triều đình nhà Nguyễn, đã được UNESCO công nhận là Di sản Văn hóa Phi vật thể của nhân loại năm 2003.</p>
                <p>Với lịch sử phát triển hơn 400 năm, nhã nhạc được xem là loại hình nghệ thuật tiêu biểu của nền văn hóa cung đình Việt Nam thời phong kiến.</p>
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                    <li>Sử dụng nhiều nhạc cụ truyền thống như đàn tranh, đàn bầu, trống, chiêng...</li>
                    <li>Biểu diễn trong các nghi lễ tế tự, lễ hội hoàng cung</li>
                    <li>Kết hợp âm nhạc với múa</li>
                </ul>
                <h4>Nơi xem biểu diễn:</h4>
                <p>Du khách có thể xem biểu diễn nhã nhạc cung đình tại Đại Nội Huế vào các buổi tối hoặc trong các lễ hội như Festival Huế.</p>
            `
        },
        'thu-cong': {
            title: 'Nghề thủ công truyền thống Huế',
            image: 'assets/images/thu-cong-detail.jpg',
            description: `
                <p>Huế nổi tiếng với nhiều làng nghề thủ công truyền thống lâu đời, tạo ra các sản phẩm tinh xảo mang đậm bản sắc văn hóa cố đô.</p>
                <p>Các làng nghề không chỉ là nơi sản xuất những sản phẩm đặc trưng mà còn là điểm tham quan hấp dẫn cho du khách muốn tìm hiểu về văn hóa truyền thống.</p>
                <h4>Các làng nghề nổi bật:</h4>
                <ul>
                    <li>Làng hoa giấy Thanh Tiên - nổi tiếng với nghề làm hoa giấy tinh xảo</li>
                    <li>Làng nón Tây Hồ - sản xuất nón lá truyền thống</li>
                    <li>Làng đúc đồng Phường Đúc - với kỹ thuật đúc đồng tinh xảo</li>
                    <li>Làng hương Thủy Xuân - sản xuất nhang trầm hương thơm ngát</li>
                </ul>
                <h4>Sản phẩm đặc trưng:</h4>
                <p>Du khách có thể mua về làm quà các sản phẩm như nón lá, tranh thêu, đồ gốm, hoa giấy, đồ đồng, nhang trầm hương...</p>
            `
        },
        'le-hoi': {
            title: 'Lễ hội truyền thống Huế',
            image: 'assets/images/le-hoi-detail.jpg',
            description: `
                <p>Huế là vùng đất giàu truyền thống văn hóa với nhiều lễ hội đặc sắc được tổ chức quanh năm, phản ánh đời sống tinh thần phong phú của người dân xứ Huế.</p>
                <p>Các lễ hội không chỉ mang giá trị tâm linh, tín ngưỡng mà còn là dịp để người dân và du khách giao lưu, trải nghiệm nét đẹp văn hóa đặc trưng của cố đô.</p>
                <h4>Các lễ hội tiêu biểu:</h4>
                <ul>
                    <li>Festival Huế - lễ hội văn hóa nghệ thuật quốc tế được tổ chức 2 năm/lần</li>
                    <li>Lễ hội Điện Hòn Chén - tổ chức vào tháng 3 và tháng 7 âm lịch</li>
                    <li>Tết Nguyên đán - với nhiều hoạt động đặc sắc như trưng bày cây kiểng, hoa Tết...</li>
                    <li>Lễ Phật Đản - tổ chức tại các chùa với nghi lễ tắm Phật</li>
                </ul>
                <h4>Festival Huế:</h4>
                <p>Là sự kiện văn hóa nghệ thuật lớn nhất của Huế, Festival Huế thu hút hàng nghìn nghệ sĩ trong và ngoài nước tham gia với nhiều chương trình biểu diễn đặc sắc.</p>
            `
        },
        'bun-bo': {
            title: 'Bún bò Huế',
            image: 'assets/images/bun-bo-detail.jpg',
            description: `
                <p>Bún bò Huế là món ăn truyền thống nổi tiếng của xứ Huế, được biết đến rộng rãi trong và ngoài nước. Món ăn này gây ấn tượng bởi hương vị đậm đà, cay nồng đặc trưng.</p>
                <p>Một tô bún bò Huế đạt chuẩn phải có nước dùng trong veo màu đỏ cam từ sả và ớt, vị ngọt từ xương, cùng với các thành phần như bắp bò, giò heo, chả cua, tiết, huyết...</p>
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                    <li>Nước dùng đỏ cam, vị cay nồng từ sả và ớt</li>
                    <li>Bún gạo tròn và to hơn bún phở</li>
                    <li>Nhiều loại thịt: bắp bò, giò heo, chả cua...</li>
                    <li>Ăn kèm rau sống, giá đỗ, bắp chuối thái lát</li>
                </ul>
                <h4>Địa chỉ nổi tiếng:</h4>
                <p>Một số quán bún bò nổi tiếng ở Huế: Bún bò Mụ Rơi (11 Lý Thường Kiệt), Bún bò Bà Mỹ (17 Huỳnh Thúc Kháng), Bún bò chú Há (11A Lê Thánh Tôn)...</p>
            `
        },
        'banh-khoai': {
            title: 'Bánh khoái Huế',
            image: 'assets/images/banh-khoai-detail.jpg',
            description: `
                <p>Bánh khoái là một trong những món ăn đặc trưng của ẩm thực Huế, có hình dáng tương tự như bánh xèo nhưng nhỏ hơn và có hương vị đặc biệt riêng.</p>
                <p>Bánh được làm từ bột gạo, trộn với nghệ để có màu vàng đẹp mắt, chiên giòn với nhân tôm, thịt, giá đỗ, trứng cút và ăn kèm với rau sống cùng nước chấm đặc biệt.</p>
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                    <li>Bánh có màu vàng nghệ, giòn rụm</li>
                    <li>Nhân bánh gồm tôm, thịt, trứng cút, giá đỗ</li>
                    <li>Ăn kèm với rau sống, chuối xanh, khế chua</li>
                    <li>Nước chấm làm từ gan heo, tôm, đậu phộng rang</li>
                </ul>
                <h4>Địa chỉ nổi tiếng:</h4>
                <p>Một số quán bánh khoái nổi tiếng: Bánh khoái Lạc Thiện (6 Đinh Tiên Hoàng), Bánh khoái Hoa Đông (104 Chi Lăng), Bánh khoái Hương Giang (11 Phó Đức Chính)...</p>
            `
        },
        'com-hen': {
            title: 'Cơm hến Huế',
            image: 'assets/images/com-hen-detail.jpg',
            description: `
                <p>Cơm hến là món ăn bình dân đặc trưng của người Huế, được chế biến từ nguyên liệu chính là hến (một loại nhuyễn thể nhỏ sống trong sông) kết hợp với cơm nguội và nhiều gia vị đặc biệt.</p>
                <p>Món ăn tuy đơn giản nhưng lại có hương vị phong phú, hài hòa giữa vị cay, mặn, ngọt, chua, thơm của các loại gia vị và nguyên liệu.</p>
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                    <li>Cơm trộn với hến luộc, nước hến, ruốc, lạc rang, mắm ruốc</li>
                    <li>Ăn kèm rau thơm, giá đỗ, bắp chuối bào, khế chua</li>
                    <li>Rưới nước mắm, ớt và trang trí với tóp mỡ</li>
                    <li>Thường ăn cùng nước hến nóng</li>
                </ul>
                <h4>Địa chỉ nổi tiếng:</h4>
                <p>Một số quán cơm hến nổi tiếng: Cơm hến bà Cam (cồn Hến), Cơm hến bà Vi (đường Phạm Hồng Thái), Cơm hến Nam Phổ (kiệt 17 Phạm Hồng Thái)...</p>
            `
        }
    };
    
    const content = contentMap[id];
    
    if (content) {
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${content.title}</h2>
            </div>
            <div class="modal-image">
                <img src="${content.image}" alt="${content.title}">
            </div>
            <div class="modal-description">
                ${content.description}
            </div>
        `;
        
        // Add animation classes to modal content with staggered timing
        const modalHeader = modalBody.querySelector('.modal-header');
        const modalImage = modalBody.querySelector('.modal-image');
        const modalDescription = modalBody.querySelector('.modal-description');
        
        setTimeout(() => {
            if (modalHeader) modalHeader.classList.add('fade-in');
            setTimeout(() => {
                if (modalImage) modalImage.classList.add('fade-in');
                setTimeout(() => {
                    if (modalDescription) modalDescription.classList.add('fade-in');
                    
                    // Animate list items with staggered effect
                    const listItems = modalDescription.querySelectorAll('ul li');
                    listItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 100 * index);
                    });
                }, 150);
            }, 150);
        }, 100);
    } else {
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Thông tin đang được cập nhật</h2>
            </div>
            <p>Xin lỗi, thông tin chi tiết về mục này đang được cập nhật. Vui lòng quay lại sau.</p>
        `;
    }
}

// Enhanced smooth scrolling functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Auto-hide navigation on scroll down, show on scroll up with enhanced transitions
function initScrollNavigation() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > 150) {
            // Scrolling down & past threshold
            header.classList.add('header-hidden');
        } else {
            // Scrolling up or at top
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// Hide unnecessary buttons and add enhanced UI elements
function hideUnnecessaryButtons() {
    // Hide dot navigation on small screens
    if (window.innerWidth < 768) {
        const dotsContainer = document.querySelector('.dots-container');
        if (dotsContainer) {
            dotsContainer.style.display = 'none';
        }
    }
    
    // Add "Back to top" button with enhanced animation
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.display = 'none'; // Initially hidden
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position with smooth transitions
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'translateY(0)';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when button is clicked with enhanced animation
    backToTopButton.addEventListener('click', function() {
        // Create a ripple effect
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 600);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add floating highlight effect to buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x-pos', `${x}px`);
            this.style.setProperty('--y-pos', `${y}px`);
        });
    });
}

// Optimize parallax scrolling effects using requestAnimationFrame
function initParallaxEffects() {
    // Use IntersectionObserver for better performance
    const parallaxSections = document.querySelectorAll('[data-speed]');
    let ticking = false;
    
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Store whether section is visible for use in scroll handler
            entry.target.isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    
    // Observe all sections with parallax effect
    parallaxSections.forEach(section => {
        parallaxObserver.observe(section);
        section.isVisible = false; // Initialize visibility
    });
    
    // More efficient scroll handler using requestAnimationFrame
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollPosition = window.pageYOffset;
                
                // Only update visible sections
                parallaxSections.forEach(section => {
                    if (section.isVisible) {
                        const sectionTop = section.offsetTop;
                        const speed = section.getAttribute('data-speed') || 0.1;
                        const yPos = (scrollPosition - sectionTop) * speed;
                        
                        if (section.querySelector('.section-title')) {
                            section.querySelector('.section-title').style.transform = `translateY(${yPos}px)`;
                        }
                    }
                });
                
                // Handle hero parallax - only if visible and not on mobile
                const hero = document.querySelector('#hero');
                if (hero && scrollPosition < window.innerHeight && window.innerWidth > 768) {
                    const heroImage = hero.querySelector('.slide.active img');
                    if (heroImage) {
                        heroImage.style.transform = `scale(1.05) translateY(${scrollPosition * 0.15}px)`;
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Reveal animations for sections as they scroll into view
function initRevealAnimations() {
    // Create intersection observer with proper options
    const options = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };
    
    // Target sections
    const sections = document.querySelectorAll('section');
    
    // Handle section reveal with intersection observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                sectionObserver.unobserve(entry.target);
                
                // Reveal child elements in sequence
                const elements = entry.target.querySelectorAll('.culture-feature, .destination-card, .cuisine-slide, .tip-card');
                elements.forEach((el, i) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100 + i * 100);
                });
            }
        });
    }, options);
    
    // Set initial states and observe
    sections.forEach(section => {
        section.classList.add('section-hidden');
        
        // Set initial state of child elements
        const elements = section.querySelectorAll('.culture-feature, .destination-card, .cuisine-slide, .tip-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        });
        
        sectionObserver.observe(section);
    });
}

// Add tilt effect to cards for a dynamic 3D feel - optimized version
function initTiltEffect() {
    const cards = document.querySelectorAll('.destination-card, .culture-feature, .cuisine-slide, .tip-card');
    
    // Check if device is touch-only and skip tilt effect if so
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }
    
    const tiltSettings = {
        max: 8,     // max tilt rotation (degrees)
        perspective: 1000,   // transform perspective, the lower the more extreme the tilt gets
        scale: 1.03,    // 2 = 200%, 1.5 = 150%, etc
        speed: 500,   // transition speed
        easing: 'cubic-bezier(.03,.98,.52,.99)'    // easing for transition
    };
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
            card.style.willChange = 'transform';
        });
        
        card.addEventListener('mousemove', handleTilt);
        
        card.addEventListener('mouseleave', () => {
            resetTilt.call(card);
            card.style.willChange = 'auto';
        });
    });
    
    function handleTilt(e) {
        const el = this;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // More efficient calculation with limits
        const tiltX = Math.max(Math.min((y - yc) / 20, tiltSettings.max), -tiltSettings.max);
        const tiltY = Math.max(Math.min(-(x - xc) / 20, tiltSettings.max), -tiltSettings.max);
        
        // Apply the tilt effect more efficiently
        el.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${tiltSettings.scale})`;
    }
    
    function resetTilt() {
        this.style.transition = `transform ${tiltSettings.speed}ms ${tiltSettings.easing}`;
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// Fix destination filters with better transition handling
function initDestinationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destinations-grid .destination-card');

    // Function to properly hide/show cards with transitions
    function filterDestinations(filter) {
        destinationCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            // Handle visibility and transitions properly
            if (filter === 'all' || categories.includes(filter)) {
                // Show card with transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.style.display = 'block';
                
                // Force reflow
                void card.offsetWidth;
                
                // Apply visible state
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                // Hide card with transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                // Remove from layout after transition
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter cards
            const filter = button.getAttribute('data-filter');
            filterDestinations(filter);
        });
    });
    
    // Initialize with "all" filter active
    filterDestinations('all');
}

// Make cuisine slider draggable
function initDraggableSlider() {
    const slider = document.querySelector('.cuisine-slider');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('grabbing');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('grabbing');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('grabbing');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // The multiplier makes it scroll faster
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Initialize custom cursor
function initCustomCursor() {
    // Check if device is touch-only and skip cursor customization if so
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.style.cursor = 'auto';
        return;
    }

    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'custom-cursor-outer';
    document.body.appendChild(cursorOuter);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    document.body.appendChild(cursorInner);

    // Use direct positioning instead of transform for better reliability
    document.addEventListener('mousemove', e => {
        cursorOuter.style.left = `${e.clientX}px`;
        cursorOuter.style.top = `${e.clientY}px`;
        
        cursorInner.style.left = `${e.clientX}px`;
        cursorInner.style.top = `${e.clientY}px`;
    });

    const hoverElements = document.querySelectorAll(
        'a, button, .destination-card, .culture-feature, .cuisine-slide, .tip-card, .stat-item, .social-icons a'
    );

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('hover');
        });
    });
}

// Add a function to create water ripple effect on hover for certain elements
document.addEventListener('DOMContentLoaded', function() {
    const rippleElements = document.querySelectorAll('.btn-explore, .btn-details');
    
    rippleElements.forEach(el => {
        el.addEventListener('mouseenter', createRipple);
    });
    
    function createRipple(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});

// Initialize active menu tracking based on scroll position
function initActiveMenuTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        // Get current scroll position
        let scrollY = window.pageYOffset;
        
        // Loop through sections to find the one in view
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
        
        // Handle case when at top of page
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Activate home link if it exists
            const homeLink = document.querySelector('.main-nav a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    });
}
