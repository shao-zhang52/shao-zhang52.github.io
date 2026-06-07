// master.js - 网站的“总管家”
window.onload = () => {
    // 1. 读取当前语言 (URL参数 > 本地存储 > 默认zh)
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || localStorage.getItem('user-lang') || 'zh';
    
    // 2. 自动翻译全页
    applyLang(lang);
    
    // 3. 给所有跳转链接自动带上 ?lang=xxx
    document.querySelectorAll('a').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target && target.startsWith('http') === false) {
                window.location.href = target + (target.includes('?') ? '&' : '?') + 'lang=' + lang;
            }
        };
    });
};
