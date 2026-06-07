// master.js - ZZ H Lab 全站语言覆盖管家
window.onload = () => {
    // 1. 优先级策略：先从 URL 拿，拿不到就从 localStorage 拿，最后才用 'zh'
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const storageLang = localStorage.getItem('user-lang');
    
    // 如果 URL 有参数，说明是跳转过来的，优先级最高，同步存入保险柜
    // 如果 URL 没有，但 localStorage 有，说明是老用户，继续使用之前的设置
    const lang = urlLang || storageLang || 'zh';
    
    // 强制更新保险柜
    localStorage.setItem('user-lang', lang);
    
    // 2. 核心功能：强制执行翻译 (哪怕页面只有中文文字，只要你有字典，它就给你翻)
    if (typeof applyLang === 'function') {
        applyLang(lang);
    }
    
    // 3. 全站链接“防丢失”补丁
    // 遍历所有链接，给它们加上当前语言后缀，保证跳转不会“断链”
    document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.includes('lang=')) {
            const connector = href.includes('?') ? '&' : '?';
            link.setAttribute('href', href + connector + 'lang=' + lang);
        }
    });
};
