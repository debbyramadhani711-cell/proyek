// 1. Ambil data daftar nama dari memori browser. Jika kosong, buat daftar default.
let daftarSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || ["Andi Pratama", "Budi Santoso"];
const tbody = document.querySelector("#kasTable tbody");

// 2. Fungsi utama untuk mencetak tabel ke layar
function renderTabel() {
    tbody.innerHTML = ""; // Bersihkan isi tabel sebelum dicetak ulang

    daftarSiswa.forEach((nama, index) => {
        let tr = document.createElement("tr");
        let idAman = nama.replace(/\s+/g, ''); // Hilangkan spasi untuk ID memori (Contoh: yanto)
        
        tr.innerHTML = `
            <td>${nama}</td>
            <td><input type="checkbox" data-id="${idAman}-m1" class="kas-check"></td>
            <td><input type="checkbox" data-id="${idAman}-m2" class="kas-check"></td>
            <td><input type="checkbox" data-id="${idAman}-m3" class="kas-check"></td>
            <td><input type="checkbox" data-id="${idAman}-m4" class="kas-check"></td>
            <td><button onclick="hapusSiswa(${index})" class="btn-hapus" title="Hapus Siswa">❌</button></td>
        `;
        tbody.appendChild(tr);
    });

    aktifkanLogikaCentang();
}

// 3. Fungsi untuk menyimpan status centang
function aktifkanLogikaCentang() {
    const checkboxes = document.querySelectorAll(".kas-check");
    checkboxes.forEach(box => {
        const statusTersimpan = localStorage.getItem(box.dataset.id);
        if (statusTersimpan === "true") box.checked = true;

        box.addEventListener("change", function() {
            localStorage.setItem(this.dataset.id, this.checked);
        });
    });
}

// 4. Fitur Tambah Siswa Baru
document.getElementById("btnTambah").addEventListener("click", () => {
    const inputNama = document.getElementById("namaBaru");
    const namaBaru = inputNama.value.trim();
    
    if(namaBaru !== "") {
        daftarSiswa.push(namaBaru); // Tambahkan ke daftar
        localStorage.setItem("dataSiswa", JSON.stringify(daftarSiswa)); // Simpan daftar terbaru ke memori
        inputNama.value = ""; // Kosongkan kolom input
        renderTabel(); // Cetak ulang tabel agar nama baru muncul
    }
});

// 5. Fitur Hapus Siswa
window.hapusSiswa = function(index) {
    const namaSiswa = daftarSiswa[index];
    if(confirm(`Yakin ingin menghapus ${namaSiswa} dari daftar kelas?`)) {
        // Hapus memori centangnya sekalian agar bersih
        let idAman = namaSiswa.replace(/\s+/g, '');
        localStorage.removeItem(`${idAman}-m1`);
        localStorage.removeItem(`${idAman}-m2`);
        localStorage.removeItem(`${idAman}-m3`);
        localStorage.removeItem(`${idAman}-m4`);

        daftarSiswa.splice(index, 1); // Coret namanya dari daftar
        localStorage.setItem("dataSiswa", JSON.stringify(daftarSiswa)); // Simpan perubahan ke memori
        renderTabel(); // Cetak ulang tabel
    }
};

// 6. Tombol Reset Semua Centang Bulan Ini (Hanya menghapus centang, nama tetap aman)
document.getElementById("resetBtn").addEventListener("click", () => {
    if(confirm("Yakin mereset SEMUA centang kas bulan ini? (Nama siswa tidak akan hilang)")) {
        daftarSiswa.forEach(nama => {
            let idAman = nama.replace(/\s+/g, '');
            localStorage.removeItem(`${idAman}-m1`);
            localStorage.removeItem(`${idAman}-m2`);
            localStorage.removeItem(`${idAman}-m3`);
            localStorage.removeItem(`${idAman}-m4`);
        });
        renderTabel();
    }
});

// 7. Jalankan cetak tabel saat web pertama kali dibuka
renderTabel();
