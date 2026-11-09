/* Tiny dependency-free Markdown renderer for Legacy Docs.
   Supports: headings, paragraphs, lists (nested by 2 spaces), fenced code,
   inline code, bold/italic, links, tables, callouts (> [!NOTE]), blockquotes, hr. */
(function () {
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function slugify(s) {
    return s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[`*_]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  }

  function inline(text) {
    var codes = [];
    text = text.replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    text = esc(text);
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, url) {
      if (/^\s*javascript:/i.test(url)) url = '#';
      var ext = /^https?:\/\//.test(url);
      return '<a href="' + url + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
    text = text.replace(/(^|\W)_([^_\n]+)_(?!\w)/g, '$1<em>$2</em>');
    text = text.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
    return text;
  }

  // Minimal syntax highlighting for lua / sql / json / bash / cfg.
  var KW = {
    lua: 'local function end if then else elseif for in do while return and or not nil true false repeat until break',
    sql: 'SELECT FROM WHERE INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE IF NOT EXISTS PRIMARY KEY DEFAULT NULL ALTER ADD INT VARCHAR TEXT LONGTEXT TINYINT BIGINT AUTO_INCREMENT ENGINE CHARSET UNIQUE INDEX DATETIME TIMESTAMP CURRENT_TIMESTAMP',
    cfg: 'ensure start set setr add_ace add_principal exec',
    bash: 'cd ls git npm npx node sudo apt mkdir cp mv rm'
  };
  function highlight(code, lang) {
    lang = (lang || '').toLowerCase();
    if (lang === 'js' || lang === 'javascript' || lang === 'ts') lang = 'lua';
    var words = KW[lang];
    var out = '', i = 0, n = code.length;
    var kwSet = {};
    if (words) words.split(' ').forEach(function (w) { kwSet[lang === 'sql' ? w.toUpperCase() : w] = 1; });
    while (i < n) {
      var rest = code.slice(i), m;
      if ((lang === 'lua' && (m = rest.match(/^--\[\[[\s\S]*?\]\]|^--[^\n]*/))) ||
          (lang === 'sql' && (m = rest.match(/^--[^\n]*/))) ||
          ((lang === 'bash' || lang === 'cfg') && (m = rest.match(/^#[^\n]*/)))) {
        out += '<span class="t-c">' + esc(m[0]) + '</span>';
      } else if ((m = rest.match(/^"(?:\\.|[^"\\\n])*"|^'(?:\\.|[^'\\\n])*'|^`[^`]*`/))) {
        out += '<span class="t-s">' + esc(m[0]) + '</span>';
      } else if ((m = rest.match(/^\b\d+(?:\.\d+)?\b/))) {
        out += '<span class="t-n">' + m[0] + '</span>';
      } else if ((m = rest.match(/^[A-Za-z_][\w]*/))) {
        var w = m[0], key = lang === 'sql' ? w.toUpperCase() : w;
        if (kwSet[key]) out += '<span class="t-k">' + w + '</span>';
        else if (lang === 'json' && (w === 'true' || w === 'false' || w === 'null')) out += '<span class="t-k">' + w + '</span>';
        else if (/^\s*\(/.test(code.slice(i + w.length))) out += '<span class="t-f">' + w + '</span>';
        else out += esc(w);
      } else {
        m = [rest[0]];
        out += esc(m[0]);
      }
      i += m[0].length;
    }
    return out;
  }

  function render(md) {
    var lines = md.replace(/\r\n?/g, '\n').split('\n');
    var html = [], headings = [], used = {};
    var i = 0;

    function heading(level, raw) {
      var base = slugify(raw) || 'section', id = base, k = 2;
      while (used[id]) id = base + '-' + k++;
      used[id] = 1;
      if (level > 1 && level < 4) headings.push({ level: level, id: id, text: raw.replace(/[`*_]/g, '') });
      return '<h' + level + ' id="' + id + '">' + inline(raw) +
        (level > 1 ? '<a class="anchor" href="#" data-anchor="' + id + '" aria-label="Link to section">#</a>' : '') +
        '</h' + level + '>';
    }

    function isBlockStart(l) {
      return /^(#{1,6})\s|^```|^>\s?|^\s*([-*+]|\d+\.)\s|^\|.*\|\s*$|^(---|\*\*\*)\s*$/.test(l);
    }

    function parseList(start) {
      var items = [], j = start;
      var ordered = /^\s*\d+\./.test(lines[start]);
      var baseIndent = lines[start].match(/^\s*/)[0].length;
      while (j < lines.length) {
        var l = lines[j];
        var m = l.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
        if (m && m[1].length === baseIndent) {
          items.push({ text: m[3], children: [] });
          j++;
        } else if (m && m[1].length > baseIndent && items.length) {
          var sub = parseList(j);
          items[items.length - 1].children.push(sub.html);
          j = sub.end;
        } else if (l.trim() && !isBlockStart(l) && items.length && /^\s+/.test(l)) {
          items[items.length - 1].text += ' ' + l.trim();
          j++;
        } else if (!l.trim() && j + 1 < lines.length && /^(\s*)([-*+]|\d+\.)\s/.test(lines[j + 1]) &&
                   lines[j + 1].match(/^\s*/)[0].length >= baseIndent) {
          j++;
        } else break;
      }
      var tag = ordered ? 'ol' : 'ul';
      return {
        html: '<' + tag + '>' + items.map(function (it) {
          return '<li>' + inline(it.text) + it.children.join('') + '</li>';
        }).join('') + '</' + tag + '>',
        end: j
      };
    }

    function splitRow(l) {
      return l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(function (c) { return c.trim().replace(/\\\|/g, '|'); });
    }

    while (i < lines.length) {
      var line = lines[i], m;

      if (!line.trim()) { i++; continue; }

      if ((m = line.match(/^```\s*([\w-]*)/))) {
        var lang = m[1], buf = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
        i++;
        var code = buf.join('\n');
        html.push('<div class="code"><div class="code-head"><span>' + esc(lang || 'text') +
          '</span><button class="copy-code" type="button">Copy</button></div><pre><code>' +
          highlight(code, lang) + '</code></pre></div>');
        continue;
      }

      if ((m = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) {
        html.push(heading(m[1].length, m[2]));
        i++; continue;
      }

      if (/^(---|\*\*\*|___)\s*$/.test(line)) { html.push('<hr>'); i++; continue; }

      if (/^>\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
        var cm = q[0] && q[0].match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]\s*(.*)$/i);
        if (cm) {
          var type = cm[1].toLowerCase();
          if (type === 'important' || type === 'info') type = 'note';
          if (type === 'caution') type = 'warning';
          var body = (cm[2] ? [cm[2]] : []).concat(q.slice(1)).join('\n');
          html.push('<div class="callout callout-' + type + '"><div class="callout-title">' +
            ({ note: 'Note', tip: 'Tip', warning: 'Warning' })[type] + '</div>' + render(body).html + '</div>');
        } else {
          html.push('<blockquote>' + render(q.join('\n')).html + '</blockquote>');
        }
        continue;
      }

      if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
        var list = parseList(i);
        html.push(list.html);
        i = list.end; continue;
      }

      if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{2,}/.test(lines[i + 1])) {
        var head = splitRow(line);
        var aligns = splitRow(lines[i + 1]).map(function (c) {
          return /^:-+:$/.test(c) ? 'center' : /-+:$/.test(c) ? 'right' : '';
        });
        i += 2;
        var rows = [];
        while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) rows.push(splitRow(lines[i++]));
        function cell(tag, c, k) { return '<' + tag + (aligns[k] ? ' style="text-align:' + aligns[k] + '"' : '') + '>' + inline(c) + '</' + tag + '>'; }
        html.push('<div class="table-wrap"><table><thead><tr>' + head.map(function (c, k) { return cell('th', c, k); }).join('') +
          '</tr></thead><tbody>' + rows.map(function (r) {
            return '<tr>' + r.map(function (c, k) { return cell('td', c, k); }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>');
        continue;
      }

      var p = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) p.push(lines[i++].trim());
      if (!p.length) { p.push(lines[i++]); }
      html.push('<p>' + inline(p.join(' ')) + '</p>');
    }

    return { html: html.join('\n'), headings: headings };
  }

  window.LegacyMarkdown = { render: render, slugify: slugify, escape: esc };
})();
