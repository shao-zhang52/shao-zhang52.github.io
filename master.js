const dict = {
    zh: { home: "首页", game: "小游戏", changelog: "更新日志", community: "社区", search: "搜索", placeholder: "搜索内容..." },
    en: { home: "Home", game: "Games", changelog: "Changelog", community: "Community", search: "Search", placeholder: "Search..." },
    es: { home: "Inicio", game: "Juegos", changelog: "Registro", community: "Comunidad", search: "Buscar", placeholder: "Buscar..." },
    fr: { home: "Accueil", game: "Jeux", changelog: "Journal", community: "Communauté", search: "Rechercher", placeholder: "Rechercher..." },
    de: { home: "Start", game: "Spiele", changelog: "Protokoll", community: "Community", search: "Suche", placeholder: "Suche..." },
    ja: { home: "ホーム", game: "ゲーム", changelog: "更新履歴", community: "コミュニティ", search: "検索", placeholder: "検索..." },
    ru: { home: "Главная", game: "Игры", changelog: "Журнал", community: "Сообщество", search: "Поиск", placeholder: "Поиск..." },
    pt: { home: "Início", game: "Jogos", changelog: "Log", community: "Comunidade", search: "Pesquisar", placeholder: "Pesquisar..." },
    ko: { home: "홈", game: "게임", changelog: "로그", community: "커뮤니티", search: "검색", placeholder: "검색..." },
    ar: { home: "الرئيسية", game: "ألعاب", changelog: "السجل", community: "مجتمع", search: "بحث", placeholder: "بحث..." }
};

// 确保函数绑定在 window 上，这样 HTML 里的 onclick 才能找到它们
window.applyLang = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(dict[lang] && dict[lang][key]) el.innerText = dict[lang][key];
    });
    const input = document.getElementById('search-input');
    if(input) input.placeholder = dict[lang].placeholder;
};

window.setLang = function(lang) {
    console.log("正在切换语言为:", lang); // 如果控制台没打印，说明函数没触发
    localStorage.setItem('user-lang', lang);
    window.applyLang(lang);
    window.patchLinks(lang);
    window.toggleLangMenu();
};

window.patchLinks = function(lang) {
    document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            let baseUrl = href.split('?')[0];
            link.setAttribute('href', baseUrl + '?lang=' + lang);
        }
    });
};

window.toggleLangMenu = function() {
    const menu = document.getElementById('lang-menu');
    if (menu) {
        menu.style.display = menu.style.display === 'grid' ? 'none' : 'grid';
    } else {
        console.error("找不到 lang-menu 元素！");
    }
};

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || localStorage.getItem('user-lang') || 'zh';
    window.applyLang(lang);
    window.patchLinks(lang);
    console.log("管家已就绪，当前语言:", lang);
});
