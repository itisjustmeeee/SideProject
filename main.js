const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;
openBtn.addEventListener('click', () => {
 lastActive = document.activeElement;
 dlg.showModal();
затемнение
 dlg.querySelector('input,select,textarea,button')?.focus();
});
closeBtn.addEventListener('click', () => dlg.close('cancel'));
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value.trim();
    const topic = document.getElementById('topic').value.trim();

    let isValid = true;
    let errorMs = ''

    if (!name || name.length < 2){
        errorMs += 'Имя не должно быть короче 2 символов.\n';
        isValid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        errorMs += 'введите корректный email.\n';
        isValid = false;
    }
    if (!phone || !/^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/.test(phone)){
        errorMs += 'введите корректный номер в формате: +7 (XXX) XXX-XX-XX.\n';
        isValid = false;
    }
    if (!date){
        errorMs += 'выберите дату.\n';
        isValid = false;
    }
    if (!topic){
        errorMs += 'выберите тему.\n';
        isValid = false;
    }

    if (isValid){
        dialog.innerHTML = `
        <div class = "mock-page">
            <h1>Спасибо за заявку</h1>
            <p>Мы свяжемся с вами в близжайшее время</p>
            <button onclick = "this.closest('dialog').close()">Закрыть</button>
        </div>
        `;
    }
    else{
        alert('Ошибка: ' + errorMs);
    }

});
dlg.addEventListener('close', () => { lastActive?.focus(); });

const phone = document.getElementById('phone');
phone?.addEventListener('input', () => {
 const digits = phone.value.replace(/\D/g,'').slice(0,11);
 const d = digits.replace(/^8/, '7');
 const parts = [];
 if (d.length > 0) parts.push('+7');
 if (d.length > 1) parts.push(' (' + d.slice(1,4));
 if (d.length >= 4) parts[parts.length - 1] += ')';
 if (d.length >= 5) parts.push(' ' + d.slice(4,7));
 if (d.length >= 8) parts.push('-' + d.slice(7,9));
 if (d.length >= 10) parts.push('-' + d.slice(9,11));
 phone.value = parts.join('');
});
phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');