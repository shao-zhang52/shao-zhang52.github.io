const dict = {
    zh: { home: "首页", game: "小游戏", changelog: "更新日志", community: "社区", search: "搜索", placeholder: "搜索内容..." },
    en: { home: "Home", game: "Games", changelog: "Changelog", community: "Community", search: "Search", placeholder: "Search..." },
    // ... (补充其他语言)
};

// 翻译函数
function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[lang] && dict[lang][key]) el.innerText = dict[lang][key];
    });
    const input = document.getElementById('search-input');
    if(input) input.placeholder = dict[lang].placeholder;
}

// 核心：设置语言并更新所有链接
function setLang(lang) {
    localStorage.setItem('user-lang', lang);
    applyLang(lang);
    patchLinks(lang); // 切换后立刻修补链接
    if(typeof toggleLangMenu === 'function') toggleLangMenu();
}

// 核心：给全站所有 A 标签加上当前语言参数
function patchLinks(lang) {
    document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            let baseUrl = href.split('?')[0]; 
            link.setAttribute('href', baseUrl + '?lang=' + lang);
        }
    });
}

// 页面加载时自动运行
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || localStorage.getItem('user-lang') || 'zh';
    applyLang(lang);
    patchLinks(lang);
};
