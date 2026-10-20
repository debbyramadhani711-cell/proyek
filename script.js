// 1. Data daftar siswa di kelasmu
const daftarSiswa = [
    "Andi Pratama", 
    "Budi Santoso", 
    "Citra Lestari", 
    "Dina Mariana",
    "Eko Purnomo"
];

const tbody = document.querySelector("#kasTable tbody");

// 2. Fungsi untuk menampilkan baris nama siswa ke dalam tabel HTML
daftarSiswa.forEach((nama, index) => {
    let tr = document.createElement("tr");
    
    // Membuat kolom nama dan 4 kolom checkbox menggunakan template literal
    tr.innerHTML = `
        <td>${nama}</td>
        <td><input type="checkbox" data-id="siswa${index}-minggu1" class="kas-check"></td>
        <td><input type="checkbox" data-id="siswa${index}-minggu2" class="kas-check"></td>
        <td><input type="checkbox" data-id="siswa${index}-minggu3" class="kas-check"></td>
        <td><input type="checkbox" data-id="siswa${index}-minggu4" class="kas-check"></td>
    `;
    tbody.appendChild(tr);
});

// 3. Logika LocalStorage (Simpan data di browser)
const checkboxes = document.querySelectorAll(".kas-check");

checkboxes.forEach(box => {
    // Cek apakah sebelumnya kotak ini sudah dicentang dan tersimpan di memori
    const statusTersimpan = localStorage.getItem(box.dataset.id);
    
    if (statusTersimpan === "true") {
        box.checked = true; // Munculkan centangnya jika data di memori adalah "true"
    }

    // Setiap kali bendahara mengklik kotak, langsung simpan statusnya ke memori
    box.addEventListener("change", function() {
        localStorage.setItem(this.dataset.id, this.checked);
    });
});

// 4. Tombol untuk menghapus semua data (saat ganti bulan)
document.getElementById("resetBtn").addEventListener("click", () => {
    if(confirm("Apakah kamu yakin ingin mereset semua data kas bulan ini?")) {
        localStorage.clear(); // Hapus memori
        location.reload();    // Refresh halaman agar kembali kosong
    }
});
