fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('caseGrid');
    data.cases.forEach(c => {
      const percent = Math.round((c.collected / c.target) * 100);
      let orgsHtml = '';
      c.orgs.forEach(org => {
        if (org.link) {
          orgsHtml += `<div class="org-card"><div class="org-name">${org.name}</div><a href="${org.link}" target="_blank" class="org-link">اضغط هنا</a></div>`;
        } else {
          orgsHtml += `<div class="org-card"><div class="org-name">${org.name}</div><div class="org-number">${org.number}</div></div>`;
        }
      });
      
      grid.innerHTML += `
        <div class="case-card">
          <img src="${c.image}" alt="${c.title}">
          <h4>${c.title}</h4>
          <p>${c.description}</p>
          <div class="progress">
            <div class="progress-bar" style="width: ${percent}%"></div>
          </div>
          <p class="amount">تم جمع ${c.collected} من ${c.target} جنيه</p>
          <div class="donate-info">
            <h4>💳 للتبرع</h4>
            ${orgsHtml}
          </div>
          <button onclick="shareApp()" class="share-btn">📱 شارك التطبيق</button>
        </div>
      `;
    });
  })
  .catch(err => console.error('خطأ:', err));

function shareApp() {
  const text = '🤲 تطبيق خير - ساعد من يحتاجك!\n';
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({ title: 'تطبيق خير', text: text, url: url });
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(text + url), '_blank');
  }
}
