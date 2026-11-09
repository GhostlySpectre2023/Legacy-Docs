/* Legacy Scripts Docs — client-side router, sidebar, search and page rendering.
   Routes: #/                     -> home
           #/<product>            -> product overview (index.md)
           #/<product>/<page>     -> content/<product>/<page>.md
           #/<product>/<page>#id  -> same, scrolled to heading */
(function () {
  // ---- Site settings: edit these ----
  var SITE = {
    founder: {
      name: 'GhostlySpectre',
      role: 'Founder & Lead Developer',
      bio: 'Started Legacy Scripts to build premium, framework-ready FiveM resources that just work. Every script and every page of these docs comes from here.',
      avatar: 'assets/img/ls-icon.png'   // swap for a profile picture, e.g. assets/img/founder.png
    },
    store: '',     // Tebex store URL — the Store button stays hidden while this is empty
    discord: ''    // Discord invite URL
  };
  var MD = window.LegacyMarkdown;
  var $ = function (s) { return document.querySelector(s); };
  var main = $('#main'), sidebar = $('#sidebar'), toc = $('#toc');
  var nav = [], cache = {}, searchIndex = null;

  var ICONS = {
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v2H3z"/><circle cx="7.5" cy="13" r="1"/><circle cx="16.5" cy="13" r="1"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
    parachute: '<path d="M3 11a9 7 0 0 1 18 0"/><path d="M3 11l9 9 9-9M8 11l4 9 4-9"/>',
    radio: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M8 8 17 3"/><circle cx="9" cy="14" r="2.5"/><path d="M15 12h2M15 16h2"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2M10 2v-0M12 2V0"/>',
    loader: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>'
  };
  function icon(name) {
    return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.doc) + '</svg>';
  }
  var PAGE_ICONS = { index: 'doc', installation: 'download', configuration: 'sliders', api: 'code', faq: 'help', changelog: 'clock', about: 'user' };
  ICONS.download = '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/>';
  ICONS.sliders = '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>';
  ICONS.code = '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>';
  ICONS.help = '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17v.01"/>';
  ICONS.user = '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>';
  ICONS.clock = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';

  // ---------- data ----------
  function fetchText(url) {
    if (cache[url]) return Promise.resolve(cache[url]);
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (t) { cache[url] = t; return t; });
  }
  function product(slug) { return nav.find(function (p) { return p.slug === slug; }); }

  // ---------- routing ----------
  function parseRoute() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    var anchor = '';
    var k = h.indexOf('#');
    if (k >= 0) { anchor = h.slice(k + 1); h = h.slice(0, k); }
    var parts = h.split('/').filter(Boolean);
    return { slug: parts[0] || '', page: parts[1] || 'index', anchor: anchor };
  }

  function route() {
    var r = parseRoute();
    closeMenu();
    renderSidebar(r);
    if (!r.slug) return renderHome();
    var p = product(r.slug);
    if (!p) return renderNotFound();
    var pageMeta = p.pages.find(function (x) { return x.id === r.page; });
    if (!pageMeta) return renderNotFound();
    renderPage(p, pageMeta, r.anchor);
  }

  // ---------- sidebar ----------
  function renderSidebar(r) {
    var html = '<div class="side-inner">';
    html += '<a class="side-home' + (!r.slug ? ' active' : '') + '" href="#/">' + icon('home') + 'All products</a>';
    nav.forEach(function (p) {
      var open = p.slug === r.slug || p.slug === 'general';
      html += '<div class="side-group' + (open ? ' open' : '') + '">' +
        '<button class="side-title" type="button" aria-expanded="' + open + '">' + icon(p.icon) +
        '<span>' + MD.escape(p.title) + '</span>' +
        '<svg class="chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button><ul>';
      p.pages.forEach(function (pg) {
        var active = p.slug === r.slug && pg.id === r.page;
        html += '<li><a href="#/' + p.slug + '/' + pg.id + '"' + (active ? ' class="active" aria-current="page"' : '') + '>' +
          icon(PAGE_ICONS[pg.id] || 'doc') + MD.escape(pg.title) + '</a></li>';
      });
      html += '</ul></div>';
    });
    html += '</div>';
    sidebar.innerHTML = html;
    sidebar.querySelectorAll('.side-title').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.parentElement;
        g.classList.toggle('open');
        b.setAttribute('aria-expanded', g.classList.contains('open'));
      });
    });
  }

  // ---------- home ----------
  function renderHome() {
    document.title = 'Legacy Scripts Docs';
    toc.innerHTML = '';
    var products = nav.filter(function (p) { return p.slug !== 'general'; });
    var html = '<section class="hero">' +
      '<span class="eyebrow">Official documentation</span>' +
      '<h1>Premium FiveM resources,<br><span class="grad">documented.</span></h1>' +
      '<p>Installation guides, configuration, exports and fixes for every script we release. Pick a product to get started.</p>' +
      '<div class="hero-actions"><a class="btn-primary lg" href="#/general/getting-started">Getting started</a>' +
      '<button class="btn-ghost lg" type="button" data-open-search>Search the docs <kbd>Ctrl K</kbd></button></div>' +
      '</section><section class="grid">';
    products.forEach(function (p, idx) {
      html += '<a class="card" href="#/' + p.slug + '" style="--hue:' + ((idx * 37) % 70 - 20) + 'deg">' +
        '<div class="card-art"><div class="card-icon">' + icon(p.icon) + '</div>' +
        '<div class="card-name">' + MD.escape(p.title) + '</div>' +
        (p.version ? '<span class="pill">v' + MD.escape(String(p.version).replace(/^v/, '')) + '</span>' : '') +
        '</div><div class="card-body">' +
        '<p>' + MD.escape(p.tagline || '') + '</p>' +
        '<div class="chips">' + (p.frameworks || []).map(function (f) { return '<span>' + MD.escape(f) + '</span>'; }).join('') + '</div>' +
        '<span class="go">Go to docs <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
        '</div></a>';
    });
    html += '</section>' + founderCard() +
      '<section class="help-strip"><div><h3>Stuck somewhere?</h3><p>Check the FAQ of your product first. Still broken? Open a ticket in our Discord.</p></div>' +
      '<a class="btn-ghost" href="#/general/support">Get support</a></section>';
    main.innerHTML = html + footer();
    main.scrollTo && window.scrollTo(0, 0);
  }

  function founderCard() {
    var f = SITE.founder;
    return '<section class="founder" aria-label="Founder">' +
      '<div class="founder-avatar"><img src="' + MD.escape(f.avatar) + '" alt="' + MD.escape(f.name) + '"></div>' +
      '<div><span class="founder-label">Founder</span><h3>' + MD.escape(f.name) + '</h3>' +
      '<div class="founder-role">' + MD.escape(f.role) + ' · Legacy Scripts</div>' +
      '<p>' + MD.escape(f.bio) + '</p></div>' +
      '<a class="btn-ghost" href="#/general/about">About Legacy Scripts</a></section>';
  }

  function renderNotFound() {
    document.title = 'Not found · Legacy Scripts Docs';
    toc.innerHTML = '';
    main.innerHTML = '<article class="doc"><h1>Page not found</h1><p>This page does not exist (anymore). Head back to <a href="#/">all products</a> or use search.</p></article>' + footer();
  }

  function footer() {
    return '<footer class="foot"><span>© ' + new Date().getFullYear() + ' Legacy Scripts · Founded by <b>' + MD.escape(SITE.founder.name) + '</b></span>' +
      '<span>' + (SITE.discord ? '<a href="' + SITE.discord + '" target="_blank" rel="noopener">Discord</a> · ' : '') +
      (SITE.store ? '<a href="' + SITE.store + '" target="_blank" rel="noopener">Store</a> · ' : '') +
      '<a href="#/general/about">About</a></span></footer>';
  }

  // ---------- doc page ----------
  function renderPage(p, pg, anchor) {
    var url = 'content/' + p.slug + '/' + pg.id + '.md';
    main.innerHTML = '<div class="loading">Loading…</div>';
    fetchText(url).then(function (md) {
      var out = MD.render(md);
      var idx = p.pages.indexOf(pg);
      var prev = p.pages[idx - 1], next = p.pages[idx + 1];
      var base = '#/' + p.slug + '/' + pg.id;

      var crumbs = '<div class="doc-top"><nav class="crumbs"><a href="#/">Docs</a><span>/</span><a href="#/' + p.slug + '">' +
        MD.escape(p.title) + '</a>' + (pg.id !== 'index' ? '<span>/</span><b>' + MD.escape(pg.title) + '</b>' : '') + '</nav>' +
        '<div class="page-actions"><button class="btn-ghost sm" type="button" id="copyPage">' +
        '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>Copy page</button>' +
        '<a class="btn-ghost sm" href="' + url + '" target="_blank" rel="noopener">Markdown</a></div></div>';

      var pager = '<nav class="pager">' +
        (prev ? '<a href="#/' + p.slug + '/' + prev.id + '"><small>Previous</small>' + MD.escape(prev.title) + '</a>' : '<span></span>') +
        (next ? '<a class="next" href="#/' + p.slug + '/' + next.id + '"><small>Next</small>' + MD.escape(next.title) + '</a>' : '<span></span>') +
        '</nav>';

      main.innerHTML = crumbs + '<article class="doc">' + out.html + '</article>' + pager + footer();
      document.title = (pg.id === 'index' || pg.title === p.title ? p.title : pg.title + ' · ' + p.title) + ' · Legacy Scripts Docs';

      main.querySelectorAll('[data-anchor]').forEach(function (a) { a.href = base + '#' + a.dataset.anchor; });
      main.querySelectorAll('.doc a[href^="#"]:not([data-anchor])').forEach(function (a) {
        var h = a.getAttribute('href');
        if (/^#[^/]/.test(h)) a.setAttribute('href', base + h);
      });
      $('#copyPage').addEventListener('click', function (e) { copy(md, e.currentTarget, 'Copied!'); });

      // table of contents
      if (out.headings.length > 1) {
        toc.innerHTML = '<div class="toc-inner"><div class="toc-title">On this page</div><ul>' +
          out.headings.map(function (h) {
            return '<li class="l' + h.level + '"><a href="' + base + '#' + h.id + '" data-id="' + h.id + '">' + MD.escape(h.text) + '</a></li>';
          }).join('') + '</ul></div>';
        spy();
      } else toc.innerHTML = '';

      if (anchor) {
        var el = document.getElementById(anchor);
        if (el) { el.scrollIntoView(); flash(el); return; }
      }
      window.scrollTo(0, 0);
    }).catch(function () { renderNotFound(); });
  }

  function flash(el) {
    el.classList.add('flash');
    setTimeout(function () { el.classList.remove('flash'); }, 1400);
  }

  var observer;
  function spy() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var links = toc.querySelectorAll('a[data-id]');
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.dataset.id === en.target.id); });
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    main.querySelectorAll('.doc h2, .doc h3').forEach(function (h) { observer.observe(h); });
  }

  function copy(text, btn, label) {
    var done = function () {
      var old = btn.innerHTML;
      btn.classList.add('ok');
      btn.lastChild.textContent = label;
      setTimeout(function () { btn.innerHTML = old; btn.classList.remove('ok'); }, 1400);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
  }

  main.addEventListener('click', function (e) {
    var b = e.target.closest('.copy-code');
    if (b) copy(b.closest('.code').querySelector('code').innerText, b, 'Copied!');
    if (e.target.closest('[data-open-search]')) openSearch();
  });

  // ---------- search ----------
  var modal = $('#searchModal'), input = $('#searchInput'), results = $('#searchResults');
  var sel = 0, hits = [];

  function buildIndex() {
    if (searchIndex) return Promise.resolve(searchIndex);
    var jobs = [];
    nav.forEach(function (p) {
      p.pages.forEach(function (pg) {
        jobs.push(fetchText('content/' + p.slug + '/' + pg.id + '.md').then(function (md) {
          var entries = [], cur = { id: '', title: pg.title, text: '' };
          md.split('\n').forEach(function (l) {
            var m = l.match(/^(#{2,3})\s+(.*)/);
            if (m) {
              entries.push(cur);
              cur = { id: MD.slugify(m[2]), title: m[2].replace(/[`*_]/g, ''), text: '' };
            } else if (!/^#\s/.test(l)) cur.text += ' ' + l;
          });
          entries.push(cur);
          return entries.map(function (e) {
            return { p: p, pg: pg, id: e.id, title: e.title, text: e.text.replace(/[`*_>#|[\]()-]+/g, ' ').replace(/\s+/g, ' ').trim() };
          });
        }).catch(function () { return []; }));
      });
    });
    return Promise.all(jobs).then(function (all) { searchIndex = [].concat.apply([], all); return searchIndex; });
  }

  function openSearch() {
    modal.hidden = false;
    document.body.classList.add('modal-open');
    input.value = '';
    input.focus();
    results.innerHTML = '<li class="empty">Type to search across all products…</li>';
    buildIndex();
  }
  function closeSearch() { modal.hidden = true; document.body.classList.remove('modal-open'); }

  function doSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = '<li class="empty">Type to search across all products…</li>'; hits = []; return; }
    buildIndex().then(function (idx) {
      var terms = q.split(/\s+/);
      hits = idx.map(function (e) {
        var t = e.title.toLowerCase(), b = e.text.toLowerCase(), pt = e.p.title.toLowerCase(), score = 0;
        for (var i = 0; i < terms.length; i++) {
          var w = terms[i], s = 0;
          if (t.indexOf(w) >= 0) s += 10;
          if (pt.indexOf(w) >= 0) s += 4;
          if (b.indexOf(w) >= 0) s += 2;
          if (!s) return null;
          score += s;
        }
        return { e: e, score: score };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 12);
      sel = 0;
      if (!hits.length) { results.innerHTML = '<li class="empty">No results for “' + MD.escape(q) + '”</li>'; return; }
      results.innerHTML = hits.map(function (h, i) {
        var e = h.e, snip = '';
        var pos = e.text.toLowerCase().indexOf(terms[0]);
        if (pos >= 0) {
          var s = Math.max(0, pos - 40);
          snip = (s ? '…' : '') + e.text.slice(s, pos + 90);
        } else snip = e.text.slice(0, 120);
        snip = MD.escape(snip);
        terms.forEach(function (w) {
          if (w.length > 1) snip = snip.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
        });
        return '<li><a class="' + (i === 0 ? 'sel' : '') + '" href="#/' + e.p.slug + '/' + e.pg.id + (e.id ? '#' + e.id : '') + '">' +
          '<span class="r-path">' + MD.escape(e.p.title) + ' › ' + MD.escape(e.pg.title) + '</span>' +
          '<span class="r-title">' + MD.escape(e.title) + '</span>' +
          '<span class="r-snip">' + snip + '</span></a></li>';
      }).join('');
    });
  }

  function moveSel(d) {
    var links = results.querySelectorAll('a');
    if (!links.length) return;
    links[sel] && links[sel].classList.remove('sel');
    sel = (sel + d + links.length) % links.length;
    links[sel].classList.add('sel');
    links[sel].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', doSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
    else if (e.key === 'Enter') {
      var a = results.querySelectorAll('a')[sel];
      if (a) { location.hash = a.getAttribute('href'); closeSearch(); }
    }
  });
  results.addEventListener('click', function (e) { if (e.target.closest('a')) closeSearch(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  $('#searchBtn').addEventListener('click', openSearch);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); modal.hidden ? openSearch() : closeSearch(); }
    else if (e.key === '/' && modal.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') { if (!modal.hidden) closeSearch(); else closeMenu(); }
  });

  // ---------- mobile menu & theme ----------
  function closeMenu() { document.body.classList.remove('menu-open'); }
  $('#menuBtn').addEventListener('click', function () { document.body.classList.toggle('menu-open'); });
  $('#scrim').addEventListener('click', closeMenu);
  $('#themeBtn').addEventListener('click', function () {
    var t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('ld-theme', t); } catch (e) {}
  });

  // ---------- boot ----------
  if (SITE.store) { var sb = $('#storeBtn'); sb.href = SITE.store; sb.hidden = false; }
  window.addEventListener('hashchange', route);
  fetchText('content/nav.json').then(function (t) {
    nav = JSON.parse(t);
    route();
  }).catch(function () {
    main.innerHTML = '<article class="doc"><h1>Could not load the docs</h1>' +
      '<p>The navigation file <code>content/nav.json</code> could not be loaded. If you opened <code>index.html</code> straight from your disk, ' +
      'run it through a web server instead (see the README).</p></article>';
  });
})();
