(() => {
  const entries = Array.isArray(window.DEVDESK_SEARCH_INDEX)
    ? window.DEVDESK_SEARCH_INDEX
    : [];
  const base = location.pathname.includes('/manual/') ? '../' : '';
  const stopWords = new Set([
    'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could',
    'do', 'does', 'for', 'from', 'how', 'i', 'if', 'in', 'is', 'it', 'me',
    'my', 'of', 'on', 'or', 'please', 'should', 'tell', 'that', 'the', 'this',
    'to', 'use', 'what', 'when', 'where', 'which', 'why', 'with', 'would',
  ]);
  const synonymGroups = [
    ['create', 'make', 'new', 'add', 'start'],
    ['open', 'load', 'import', 'select', 'choose'],
    ['workspace', 'project', 'folder'],
    ['document', 'file', 'note', 'markdown'],
    ['graph', 'relationship', 'connection', 'link', 'backlink', 'node'],
    ['git', 'repository', 'commit', 'stage', 'source', 'control'],
    ['agent', 'ai', 'mcp', 'codex', 'gemini', 'connector'],
    ['automation', 'schedule', 'scheduled', 'task', 'recurring', 'check'],
    ['api', 'request', 'http', 'environment', 'collection'],
    ['secret', 'credential', 'token', 'password', 'privacy'],
    ['android', 'phone', 'mobile'],
    ['windows', 'desktop', 'store'],
    ['download', 'install', 'update', 'release'],
    ['error', 'problem', 'failed', 'failure', 'troubleshoot'],
    ['json', 'format', 'validate', 'minify'],
    ['openapi', 'swagger', 'schema', 'contract'],
    ['remove', 'delete', 'discard'],
    ['backup', 'restore', 'export', 'copy', 'recovery', 'reinstall', 'reconnect'],
  ];
  const synonymMap = new Map();
  const genericActionTerms = new Set([
    'add', 'choose', 'create', 'import', 'load', 'make', 'new', 'open',
    'select', 'start', 'use',
  ]);
  const topicRoutes = [
    {
      terms: ['recovery', 'kit'],
      url: 'manual/backup-restore.html',
      answer: 'A Reinstall Recovery Kit restores supported DevDesk-managed data and a sanitized workspace reconnection catalog. It does not contain workspace folders, protected secrets, trust, Android folder permission, or Agent Connector access keys.',
    },
    {
      terms: ['reinstall'],
      url: 'manual/backup-restore.html',
      answer: 'Before reinstalling, export a Reinstall Recovery Kit and back up every external workspace folder separately. Import the kit afterward, then reconnect each recorded folder.',
    },
    {
      terms: ['text', 'editor'],
      url: 'manual/developer-workspaces.html',
      answer: 'Open a supported project text file from Files. Save updates only the active file with conflict protection; Save As exports an independent copy.',
    },
    {
      terms: ['git', 'commit'],
      url: 'manual/diff-git.html',
      answer: 'Yes. DevDesk can create an explicit local commit after you review the staged files. It does not fetch, pull, push, change remotes, run hooks, or manage credentials.',
    },
    {
      terms: ['agent', 'connector'],
      url: 'manual/agent-connector.html',
      answer: 'The Agent Connector works only while DevDesk is open, stays on the device loopback address, and keeps its three optional permissions off by default. Its project map is metadata-only; source, configuration, test, and Markdown content require Share redacted workspace text.',
    },
    {
      terms: ['schedule', 'graph'],
      url: 'manual/agent-connector.html',
      answer: 'Scheduled graph-health checks are read-only, run only while DevDesk is open, and resume an overdue check after the app reopens.',
    },
    {
      terms: ['scheduled', 'graph'],
      url: 'manual/agent-connector.html',
      answer: 'Scheduled graph-health checks are read-only, run only while DevDesk is open, and resume an overdue check after the app reopens.',
    },
    {
      terms: ['android', 'folder'],
      url: 'manual/downloads-installation.html',
      answer: 'On Android, approve the folder that directly contains project.devdesk in the system folder picker. DevDesk keeps that granted folder access for later use.',
    },
    {
      terms: ['workspace', 'create'],
      url: 'manual/getting-started.html',
      answer: 'Choose New workspace, select a starter profile, review the exact folders and files, choose a parent folder, and confirm creation.',
    },
  ];

  synonymGroups.forEach((group) => {
    group.forEach((term) => synonymMap.set(term, group));
  });

  function normalize(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9+.#/-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stem(term) {
    if (term.length > 5 && term.endsWith('ies')) return `${term.slice(0, -3)}y`;
    if (term.length > 4 && term.endsWith('s') && !term.endsWith('ss')) {
      return term.slice(0, -1);
    }
    return term;
  }

  function queryTerms(value) {
    const phrase = normalize(value);
    const direct = [...new Set(
      phrase
        .split(' ')
        .map(stem)
        .filter((term) => term.length > 1 && !stopWords.has(term)),
    )];
    const expanded = new Set(direct);
    direct.forEach((term) => {
      const group = synonymMap.get(term);
      group?.forEach((item) => expanded.add(item));
    });
    return { phrase, direct, expanded: [...expanded] };
  }

  const searchableEntries = entries.map((entry) => ({
    entry,
    title: normalize(entry.title),
    summary: normalize(entry.summary),
    group: normalize(entry.group),
    text: normalize(entry.text),
  }));

  function scoreEntry(candidate, query) {
    if (!query.direct.length) return 0;
    let score = 0;
    let directHits = 0;

    const specificTerms = query.direct.filter((term) => !genericActionTerms.has(term));
    query.direct.forEach((term) => {
      const weight = genericActionTerms.has(term) ? 0.34 : 1;
      let matched = false;
      if (candidate.title.includes(term)) {
        score += 24 * weight;
        matched = true;
      }
      if (candidate.summary.includes(term)) {
        score += 11 * weight;
        matched = true;
      }
      if (candidate.group.includes(term)) {
        score += 6 * weight;
        matched = true;
      }
      if (candidate.text.includes(term)) {
        score += 2 * weight;
        matched = true;
      }
      if (matched) directHits += 1;
    });

    if (!directHits) return 0;
    const requiredHits = Math.max(1, Math.ceil(query.direct.length * 0.34));
    if (directHits < requiredHits) return 0;

    const searchable = `${candidate.title} ${candidate.summary} ${candidate.text}`;
    if (specificTerms.length > 1 && specificTerms.every((term) => searchable.includes(term))) {
      score += 32;
    }
    topicRoutes.forEach((route) => {
      if (
        candidate.entry.url === route.url
        && route.terms.every((term) => query.direct.includes(term))
      ) {
        score += 72;
      }
    });

    query.expanded
      .filter((term) => !query.direct.includes(term))
      .forEach((term) => {
        if (candidate.title.includes(term)) score += 3;
        else if (candidate.summary.includes(term)) score += 1.5;
        else if (candidate.text.includes(term)) score += 0.25;
      });

    if (query.phrase.length > 3) {
      if (candidate.title.includes(query.phrase)) score += 60;
      else if (candidate.summary.includes(query.phrase)) score += 28;
      else if (candidate.text.includes(query.phrase)) score += 12;
    }

    const coverageTerms = specificTerms.length ? specificTerms : query.direct;
    const coverageHits = coverageTerms.filter((term) => searchable.includes(term)).length;
    score += (coverageHits / coverageTerms.length) * 20;
    const currentPage = location.pathname.split('/').pop();
    if (currentPage && candidate.entry.url.endsWith(`/${currentPage}`)) score += 4;
    return score;
  }

  function searchManual(value, limit = 5) {
    const query = queryTerms(value);
    return searchableEntries
      .map((candidate) => ({
        entry: candidate.entry,
        score: scoreEntry(candidate, query),
        query,
      }))
      .filter((result) => result.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);
  }

  function matchingTopicRoute(query) {
    return topicRoutes.find((route) => (
      route.terms.every((term) => query.direct.includes(term))
    ));
  }

  function excerpt(value, query) {
    const clean = String(value || '').replace(/\s+/g, ' ').trim();
    if (clean.length <= 320) return clean;
    const lower = normalize(clean);
    const positions = query.direct
      .map((term) => lower.indexOf(term))
      .filter((position) => position >= 0);
    const position = positions.length ? Math.min(...positions) : 0;
    let start = Math.max(0, position - 95);
    let end = Math.min(clean.length, start + 315);
    if (start > 0) {
      const nextSpace = clean.indexOf(' ', start);
      if (nextSpace > start && nextSpace < start + 30) start = nextSpace + 1;
    }
    if (end < clean.length) {
      const previousSpace = clean.lastIndexOf(' ', end);
      if (previousSpace > start + 180) end = previousSpace;
    }
    return `${start > 0 ? '…' : ''}${clean.slice(start, end).trim()}${end < clean.length ? '…' : ''}`;
  }

  function relevantPassages(entry, query) {
    const source = String(entry.text || '').replace(/\s+/g, ' ').trim();
    const sentences = source.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
    return sentences
      .map((sentence) => {
        const normalized = normalize(sentence);
        let score = 0;
        let specificHits = 0;
        query.direct.forEach((term) => {
          if (!normalized.includes(term)) return;
          if (genericActionTerms.has(term)) score += 1;
          else {
            score += 7;
            specificHits += 1;
          }
        });
        query.expanded.forEach((term) => {
          if (normalized.includes(term)) score += 0.4;
        });
        if (query.phrase && normalized.includes(query.phrase)) score += 15;
        if (sentence.length > 260) {
          score -= Math.min(5, (sentence.length - 260) / 120);
        }
        return { sentence: sentence.trim(), score, specificHits };
      })
      .filter((item) => {
        const hasSpecificQuery = query.direct.some((term) => !genericActionTerms.has(term));
        return item.score > 0
          && item.sentence.length >= 35
          && item.sentence.length <= 700
          && (!hasSpecificQuery || item.specificHits > 0);
      })
      .sort((left, right) => right.score - left.score)
      .filter((item, index, all) => (
        all.findIndex((candidate) => normalize(candidate.sentence) === normalize(item.sentence)) === index
      ))
      .slice(0, 2)
      .map((item) => excerpt(item.sentence, query));
  }

  function safeManualUrl(entry) {
    const value = String(entry?.url || '');
    return /^manual\/[a-z0-9-]+\.html(?:#[a-z0-9-]+)?$/i.test(value)
      ? `${base}${value}`
      : `${base}manual/user-manual.html`;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  const launcher = element('button', 'support-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open DevDesk Support Assistant');
  launcher.innerHTML = '<span aria-hidden="true">?</span><strong>Ask DevDesk</strong>';

  const overlay = element('div', 'support-assistant-overlay');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <section class="support-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="support-assistant-title">
      <header class="support-assistant-header">
        <div>
          <span class="support-assistant-kicker">Manual-powered / local</span>
          <h2 id="support-assistant-title">DevDesk Support Assistant</h2>
        </div>
        <button class="support-assistant-close" type="button" aria-label="Close support assistant">Close</button>
      </header>
      <div class="support-assistant-trust"><span aria-hidden="true"></span> Uses this manual only. Your questions are not sent or stored.</div>
      <div class="support-assistant-log" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="support-assistant-form">
        <label for="support-assistant-input">Ask a DevDesk question</label>
        <div>
          <textarea id="support-assistant-input" rows="2" maxlength="500" placeholder="How do I create a workspace?"></textarea>
          <button type="submit" disabled>Send</button>
        </div>
        <small>Answers are extracts, not AI-generated advice. Verify important steps in the linked source.</small>
      </form>
    </section>`;

  document.body.append(launcher, overlay);

  const panel = overlay.querySelector('.support-assistant-panel');
  const closeButton = overlay.querySelector('.support-assistant-close');
  const log = overlay.querySelector('.support-assistant-log');
  const form = overlay.querySelector('.support-assistant-form');
  const input = overlay.querySelector('textarea');
  const sendButton = form.querySelector('button[type="submit"]');
  let previousFocus = null;
  let greeted = false;

  function scrollLog() {
    requestAnimationFrame(() => {
      log.scrollTop = log.scrollHeight;
    });
  }

  function addUserMessage(question) {
    const message = element('div', 'support-message support-message-user');
    message.append(element('span', 'support-message-label', 'You'));
    message.append(element('p', '', question));
    log.append(message);
    scrollLog();
  }

  function addGreeting() {
    if (greeted) return;
    greeted = true;
    const message = element('div', 'support-message support-message-assistant');
    message.append(element('span', 'support-message-label', 'DevDesk manual'));
    message.append(element(
      'p',
      '',
      'Ask about installation, workspaces, Markdown, graph links, APIs, Git, Android, or the Agent Connector.',
    ));
    const quick = element('div', 'support-quick-questions');
    [
      'How do I create a workspace?',
      'How do I recover after reinstalling?',
      'Can DevDesk create a Git commit?',
      'How does Android folder access work?',
      'How does the Agent Connector protect files?',
    ].forEach((question) => {
      const button = element('button', '', question);
      button.type = 'button';
      button.addEventListener('click', () => ask(question));
      quick.append(button);
    });
    message.append(quick);
    log.append(message);
  }

  function appendSources(container, results) {
    const sources = element('div', 'support-answer-sources');
    sources.append(element('strong', '', results.length === 1 ? 'Source' : 'Sources'));
    results.forEach(({ entry }) => {
      const link = element('a', '', entry.title);
      link.href = safeManualUrl(entry);
      link.addEventListener('click', closeAssistant);
      sources.append(link);
    });
    container.append(sources);
  }

  function addAnswer(question) {
    const results = searchManual(question, 5);
    const message = element('div', 'support-message support-message-assistant');
    message.append(element('span', 'support-message-label', 'DevDesk manual'));

    if (!results.length || results[0].score < 8) {
      message.append(element(
        'p',
        '',
        'I could not find a strong manual match. Try naming the screen, action, file type, or error message.',
      ));
      appendSources(message, [{
        entry: {
          title: 'Complete user manual',
          url: 'manual/user-manual.html',
        },
      }, {
        entry: {
          title: 'Troubleshooting',
          url: 'manual/troubleshooting.html',
        },
      }]);
      log.append(message);
      scrollLog();
      return;
    }

    const best = results[0];
    const title = element('strong', 'support-answer-title', best.entry.title);
    message.append(title);
    const topicRoute = matchingTopicRoute(best.query);
    if (topicRoute?.answer) {
      message.append(element('p', 'support-answer-direct', topicRoute.answer));
    } else if (best.entry.summary) {
      message.append(element('p', '', best.entry.summary));
    }

    const passages = relevantPassages(best.entry, best.query);
    if (passages.length) {
      const guidance = element('div', 'support-answer-guidance');
      guidance.append(element('span', '', 'Relevant manual guidance'));
      const list = document.createElement('ul');
      passages.forEach((passage) => list.append(element('li', '', passage)));
      guidance.append(list);
      message.append(guidance);
    }

    const related = results
      .filter((result, index) => index === 0 || result.score >= best.score * 0.52)
      .slice(0, 3);
    appendSources(message, related);
    log.append(message);
    scrollLog();
  }

  function ask(question) {
    const clean = String(question || '').replace(/\s+/g, ' ').trim();
    if (clean.length < 2) return;
    addUserMessage(clean);
    addAnswer(clean);
    input.value = '';
    sendButton.disabled = true;
    input.focus();
  }

  function openAssistant() {
    previousFocus = document.activeElement;
    addGreeting();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('support-assistant-open');
    window.setTimeout(() => input.focus(), 20);
  }

  function closeAssistant() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('support-assistant-open');
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }

  launcher.addEventListener('click', openAssistant);
  document.querySelectorAll('[data-assistant-open]').forEach((button) => {
    button.addEventListener('click', openAssistant);
  });
  closeButton.addEventListener('click', closeAssistant);
  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) closeAssistant();
  });
  input.addEventListener('input', () => {
    sendButton.disabled = input.value.trim().length < 2;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeAssistant();
    }
    if (event.key === 'Tab' && overlay.classList.contains('open')) {
      const focusable = [...panel.querySelectorAll(
        'a[href], button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
      )];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.DEVDESK_SUPPORT_ASSISTANT = {
    search: (query, limit = 5) => searchManual(query, limit).map((result) => ({
      title: result.entry.title,
      url: result.entry.url,
      score: result.score,
    })),
    open: openAssistant,
  };

  if (!entries.length) {
    launcher.disabled = true;
    launcher.title = 'The DevDesk manual index is unavailable.';
  }
})();
