const API_URL = '/api';
let isLoginMode = true;

window.onload = () => { if (localStorage.getItem('token')) showApp(); };

// ИСПРАВЛЕННАЯ ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const title = document.getElementById('auth-title');
    const authBtn = document.getElementById('auth-btn');
    const toggleLink = document.getElementById('toggle-link');

    if (isLoginMode) {
        // Если переходим в режим ВХОДА
        title.innerText = 'Welcome back';
        authBtn.innerText = 'Sign In';
        toggleLink.innerText = 'Create Account'; // Снизу предлагаем создать аккаунт
    } else {
        // Если переходим в режим РЕГИСТРАЦИИ
        title.innerText = 'Create account';
        authBtn.innerText = 'Sign Up';
        toggleLink.innerText = 'Already have an account? Sign In'; // Снизу предлагаем войти
    }
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) return alert("Please fill all fields");

    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    try {
        const res = await fetch(API_URL + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username: email.split('@')[0] })
        });
        const data = await res.json();
        if (res.ok) {
            if (isLoginMode) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('username', data.username);
                showApp();
            } else { 
                alert("Success! Now please Sign In."); 
                toggleAuthMode(); // После регистрации автоматически переключаем на вход
            }
        } else { alert(data.message); }
    } catch (e) { alert("Connection Error"); }
}

function showApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    document.getElementById('user-display').innerText = localStorage.getItem('username');
    if (localStorage.getItem('role') === 'admin') {
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminData();
    }
    loadBooks();
}

async function loadBooks() {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();
    const isAdmin = localStorage.getItem('role') === 'admin';
    document.getElementById('bookList').innerHTML = books.map(b => `
        <div class="book-card">
            <h3>${b.title}</h3>
            <span class="author-tag">By ${b.author?.name || 'Unknown'}</span>
            <div class="card-actions">
                <button class="btn-sm-card main" onclick="window.open('${b.pdfUrl}')">Read</button>
                <button class="btn-sm-card" onclick="showBookDetails('${b._id}')">About</button>
                <button class="btn-sm-card" onclick="showAuthorDetails('${b.author?._id}')">Author</button>
            </div>
            ${isAdmin ? `<button class="btn-del-full" onclick="deleteConfirm('${b._id}')">Delete Book</button>` : ''}
        </div>
    `).join('');
}

// МОДАЛЬНЫЕ ОКНА
function openModal(html) {
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').style.display = 'flex';
}
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

async function showBookDetails(id) {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();
    const b = books.find(x => x._id === id);
    openModal(`<h2>${b.title}</h2><p style="color:#94a3b8; margin:20px 0;">${b.description}</p><button class="btn btn-main" style="height:45px" onclick="window.open('${b.pdfUrl}')">Read Full PDF</button>`);
}

async function showAuthorDetails(id) {
    const res = await fetch(`${API_URL}/authors`);
    const authors = await res.json();
    const a = authors.find(x => x._id === id);
    if(a) openModal(`<h2>${a.name}</h2><p style="color:#94a3b8; margin:20px 0;">${a.bio}</p><hr style="border:0; border-top:1px solid #333;"><p style="margin-top:20px;"><b>Popular Books:</b> ${a.popularBooks}</p>`);
}

function deleteConfirm(id) {
    openModal(`<h3>Delete book?</h3><p style="margin:15px 0; color:#94a3b8;">This cannot be undone.</p><button class="btn btn-main" style="background:#ff4d4d; color:#fff; height:45px" onclick="confirmDelete('${id}')">Confirm Delete</button>`);
}

async function confirmDelete(id) {
    await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    closeModal(); loadBooks();
}

// АДМИН ПАНЕЛЬ
async function loadAdminData() {
    const res = await fetch(`${API_URL}/authors`);
    const authors = await res.json();
    document.getElementById('aSelect').innerHTML = authors.map(a => `<option value="${a._id}">${a.name}</option>`).join('');
}

async function addAuthor() {
    const res = await fetch(`${API_URL}/authors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name: aName.value, bio: aBio.value, popularBooks: aPopular.value })
    });
    if(res.ok) { alert("Saved"); loadAdminData(); }
}

async function addBook() {
    const res = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ title: bTitle.value, genre: bGenre.value, description: bDesc.value, pdfUrl: bPdf.value, author: aSelect.value })
    });
    if(res.ok) { alert("Published"); loadBooks(); }
}

function logout() { localStorage.clear(); location.reload(); }