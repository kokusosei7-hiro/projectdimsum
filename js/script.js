
        // --- 1. PRODUCT DATA ARRAY ---
        const productsData = [
            {
                id: 1,
                name: "Dimsum Goreng Keju Lumer Isi 4",
                category: "kukus",
                price: 18000,
                rating: 4.9,
                badge: "Terlaris",
                badgeColor: "bg-brand-amber text-brand-darkred",
                desc: "Siomay ayam kukus lembut isi 4 pcs dengan daging tebal dan bumbu otentik.",
                image: "image/Dimsum Goreng Keju Lumer Mentai isi 4.jpg"
            },
            {
                id: 2,
                name: "Paket All Dimsum",
                category: "kukus",
                price: 24000,
                rating: 5.0,
                badge: "Rekomendasi Pas Lagi Barengan",
                badgeColor: "bg-brand-crimson text-white",
                desc: "Kulit Hakau bening kenyal isi udang utuh segar pilihan isi 4 pcs.",
                image: "image/All Dimsum.jpg"
            },
            {
                id: 3,
                name: "Dimsum Original Isi 6",
                category: "kukus",
                price: 26000,
                rating: 4.9,
                badge: "Favorit",
                badgeColor: "bg-orange-500 text-white",
                desc: "Siomay ayam disiram saus mentai creamy lezat & torched sempurna isi 4 pcs.",
                image: "image/Dimsum Original Isi 6.jpg"
            },
            {
                id: 4,
                name: "Dimsum Goreng Keju lumer Isi 4",
                category: "goreng",
                price: 22000,
                rating: 4.8,
                badge: "Renyah",
                badgeColor: "bg-yellow-600 text-white",
                desc: "Olahan ayam & udang dibalut kulit tahu renyah garing isi 3 pcs.",
                image: "image/Dimsum Goreng Keju Lumer.jpg"
            },
            {
                id: 5,
                name: "Mix Platter",
                category: "goreng",
                price: 21000,
                rating: 4.7,
                badge: "Baru",
                badgeColor: "bg-green-600 text-white",
                desc: "Ekado krispi isi daging olahan dan telur puyuh utuh isi 3 pcs.",
                image: "image/Mix Platter.jpg"
            },
            {
                id: 6,
                name: "Dimsum Mozzarella Lumer",
                category: "kukus",
                price: 25000,
                rating: 4.9,
                badge: "Special",
                badgeColor: "bg-purple-600 text-white",
                desc: "Siomay ayam dengan keju mozzarella melimpah yang meleleh saat digigit isi 4 pcs.",
                image:"image/isi lumer.jpg"
               
            },
            {
                id: 7,
                name: "Paket Mix Narawi (12 Pcs)",
                category: "paket",
                price: 58000,
                rating: 5.0,
                badge: "Hemat 15%",
                badgeColor: "bg-red-600 text-white",
                desc: "Kombinasi siomay ayam, hakau, mentai, & lumpia kulit tahu lengkap dengan saus.",
                image: "image/order.jpg"
            },
            {
                id: 8,
                name: "Saus Merah Spesial Narawi",
                category: "saus",
                price: 8000,
                rating: 4.9,
                badge: "Pelengkap",
                badgeColor: "bg-brand-darkred text-white",
                desc: "Botol saus cabai otentik resep rahasia Narawi pedas, gurih & manis (100ml).",
                image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500"
            }
        ];

        // --- 2. STATE MANAGEMENT ---
        let activeCategory = 'all';
        let searchQuery = '';

        // --- STREAMING_CHUNK:Adding application core functions... ---
        // Helper function for IDR Currency Formatting
        function formatRupiah(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            }).format(amount);
        }

        // Render Products Grid based on Filter & Search
        function renderProducts() {
            const grid = document.getElementById('product-grid');
            const emptyState = document.getElementById('empty-state');

            const filtered = productsData.filter(p => {
                const matchCategory = activeCategory === 'all' || p.category === activeCategory;
                const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    p.desc.toLowerCase().includes(searchQuery.toLowerCase());
                return matchCategory && matchSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = '';
                emptyState.classList.remove('hidden');
                return;
            }

            emptyState.classList.add('hidden');
            grid.innerHTML = filtered.map(product => `
                <div class="glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-brand-creamdark/80">
                    <div>
                        <!-- Product Image & Badge -->
                        <div class="relative h-48 overflow-hidden bg-gray-100">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 menu-dimsum-sound">
                            <span class="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold rounded-full ${product.badgeColor} shadow-md">
                                ${product.badge}
                            </span>
                            <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow">
                                <span class="text-brand-amber">★</span> ${product.rating}
                            </div>
                        </div>

                        <!-- Product Content -->
                        <div class="p-5">
                            <h3 class="font-bold text-lg text-brand-darkred mb-1 group-hover:text-brand-crimson transition-colors">${product.name}</h3>
                            <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">${product.desc}</p>
                        </div>
                    </div>

                    <!-- Price -->
                    <div class="p-5 pt-0 flex items-center justify-between border-t border-gray-100/50 mt-auto">
                        <div>
                            <span class="text-[10px] text-gray-400 block font-medium">Harga</span>
                            <span class="text-base font-extrabold text-brand-crimson">${formatRupiah(product.price)}</span>
                        </div>
                        <span class="px-4 py-2.5 bg-brand-creamdark text-brand-darkred text-xs font-bold rounded-xl">Tersedia</span>
                    </div>
                </div>
            `).join('');
        }

        // Category Filter Controller
        function setCategory(cat) {
            activeCategory = cat;
            document.querySelectorAll('.category-btn').forEach(btn => {
                if (btn.dataset.category === cat) {
                    btn.classList.add('bg-brand-crimson', 'text-white');
                    btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-brand-creamdark');
                } else {
                    btn.classList.remove('bg-brand-crimson', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-brand-creamdark');
                }
            });
            renderProducts();
        }

        // Search Controller
        function filterProducts() {
            searchQuery = document.getElementById('search-input').value;
            renderProducts();
        }

        function focusSearch() {
            const searchInput = document.getElementById('search-input');
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Toast Notification Helper
        function showToast(msg) {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-5 right-5 bg-brand-darkred text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-2 transform translate-y-10 opacity-0 transition-all duration-300';
            toast.innerHTML = `<i class="fa-solid fa-circle-check text-brand-amber"></i> <span>${msg}</span>`;
            
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove('translate-y-10', 'opacity-0');
            }, 10);

            setTimeout(() => {
                toast.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        }

        // Initialize Page
        window.onload = function() {
            renderProducts();
        }

        const clickSound = document.getElementById("clickSound");
        const hoverSound = document.getElementById("hoverSound");
        const dimsumSound = document.getElementById("dimsumSound");

        // Sound khusus gambar/menu dimsum.
        document.addEventListener("mouseover", function (event) {
            const menuImage = event.target.closest(".menu-dimsum-sound");
            const homeImage = event.target.closest(".dimsum-hover-sound");

            // Hover menu makanan
            if (menuImage && !menuImage.dataset.soundPlayed) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
                menuImage.dataset.soundPlayed = "true";
            }

            // hover gambar dimsum di Beranda
            if (homeImage && !homeImage.dataset.soundPlayed) {
                dimsumSound.currentTime = 0;
                dimsumSound.play().catch(() => {});
                homeImage.dataset.soundPlayed = "true";
            }
        });

        document.addEventListener("mouseout", function (event) {
            const menuImage = event.target.closest(".menu-dimsum-sound");
            const homeImage = event.target.closest(".dimsum-hover-sound");

            if (menuImage) delete menuImage.dataset.soundPlayed;
            if (homeImage) delete homeImage.dataset.soundPlayed;
        });


        document.querySelectorAll(".nav-sound").forEach(element => {
            element.addEventListener("click", () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
            });
        });

        document.querySelectorAll(".hover-sound").forEach(element => {
            element.addEventListener("mouseenter", () => {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
            });
        });

        document.querySelectorAll(".dimsum-hover-sound").forEach(element => {
            element.addEventListener("mouseenter", () => {
                dimsumSound.currentTime = 0;
                dimsumSound.play().catch(() => {});
            });
        });

        document.querySelectorAll(".category-btn").forEach(button => {
            button.addEventListener("click", () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
            });
        });
    
