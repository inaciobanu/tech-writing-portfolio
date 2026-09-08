(function () {
  var tooltip;
  var activeTerm;

  // Keep in sync with the abbreviation table on docs/glossary.md.
  var TERMS = [
    { key: 'api', term: 'API', definition: 'Application programming interface: a defined way for software systems to communicate.' },
    { key: 'fm', term: 'FM', definition: 'Facilities management: the coordination of buildings, services, and workplace operations.' },
    { key: 'reo', term: 'REO', definition: 'Real Estate Operations: the management of workplace facilities, buildings, sites, and related operational services across a property portfolio.' },
    { key: 'ppm', term: 'PPM', definition: 'Planned preventive maintenance: scheduled maintenance performed before equipment failure occurs.' },
    { key: 'sop', term: 'SOP', definition: 'Standard operating procedure: an approved, repeatable set of instructions for completing a task.' },
    { key: 'sow', term: 'SOW', definition: 'Statement of work: a document that defines the scope, deliverables, and responsibilities for contracted work.' },
    { key: 'emea', term: 'EMEA', definition: 'Europe, Middle East, Africa: the region covering operations and documentation for EMEA markets and facilities.' },
    { key: 'apac', term: 'APAC', definition: 'Asia-Pacific: the region covering operations and documentation for APAC markets and facilities.' },
    { key: 'ams', term: 'AMS', definition: 'Americas: the region covering operations and documentation for North, Central, and South American markets.' },
    { key: 'sme', term: 'SME', definition: 'Subject matter expert: the person with authoritative knowledge of a process, system, or domain, who validates that documentation reflects how things actually work.' }
  ];

  // Pages that already author glossary terms by hand and shouldn't be auto-tagged.
  var EXCLUDED_PATH_PATTERNS = [/\/docs\/glossary$/, /\/docs\/glossary\/reference$/];

  var SKIP_ANCESTOR_TAGS = { CODE: true, PRE: true, SCRIPT: true, STYLE: true, A: true, H1: true, H2: true, H3: true, H4: true, H5: true, H6: true };

  function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.className = 'glossary-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);
  }

  function positionTooltip(term) {
    var gap = 10;
    var bounds = term.getBoundingClientRect();
    var tooltipBounds = tooltip.getBoundingClientRect();
    var left = bounds.left + (bounds.width - tooltipBounds.width) / 2;
    var top = bounds.bottom + gap;

    if (top + tooltipBounds.height > window.innerHeight - gap) {
      top = bounds.top - tooltipBounds.height - gap;
    }

    left = Math.max(gap, Math.min(left, window.innerWidth - tooltipBounds.width - gap));
    top = Math.max(gap, top);
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function showTooltip(term) {
    if (!term || !term.dataset.definition) return;
    activeTerm = term;
    tooltip.textContent = term.dataset.definition;
    tooltip.classList.add('glossary-tooltip--visible');
    positionTooltip(term);
  }

  function hideTooltip(term) {
    if (activeTerm === term) {
      activeTerm = null;
      tooltip.classList.remove('glossary-tooltip--visible');
    }
  }

  function isExcludedPath(pathname) {
    return EXCLUDED_PATH_PATTERNS.some(function (pattern) {
      return pattern.test(pathname);
    });
  }

  function wrapTermInTextNode(textNode, term, definition, key) {
    var regex = new RegExp('\\b' + term + '\\b');
    var match = regex.exec(textNode.nodeValue);
    if (!match) return false;

    var value = textNode.nodeValue;
    var before = value.slice(0, match.index);
    var matched = match[0];
    var after = value.slice(match.index + matched.length);

    var span = document.createElement('span');
    span.className = 'glossary-term glossary-term--auto';
    span.tabIndex = 0;
    span.setAttribute('data-definition', definition);
    span.setAttribute('data-glossary-key', key);
    span.textContent = matched;

    var fragment = document.createDocumentFragment();
    if (before) fragment.appendChild(document.createTextNode(before));
    fragment.appendChild(span);
    if (after) fragment.appendChild(document.createTextNode(after));

    textNode.parentNode.replaceChild(fragment, textNode);
    return true;
  }

  function findFirstMatchingTextNode(root, term) {
    var regex = new RegExp('\\b' + term + '\\b');
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!regex.test(node.nodeValue)) return NodeFilter.FILTER_SKIP;
        var el = node.parentElement;
        while (el && el !== root) {
          if (SKIP_ANCESTOR_TAGS[el.tagName] || el.classList.contains('glossary-term')) {
            return NodeFilter.FILTER_REJECT;
          }
          el = el.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    return walker.nextNode();
  }

  function autoTagGlossaryTerms(root) {
    TERMS.forEach(function (item) {
      if (root.querySelector('.glossary-term[data-glossary-key="' + item.key + '"]')) return;
      var textNode = findFirstMatchingTextNode(root, item.term);
      if (textNode) wrapTermInTextNode(textNode, item.term, item.definition, item.key);
    });
  }

  function processPage() {
    if (isExcludedPath(window.location.pathname)) return;
    var containers = document.querySelectorAll('.theme-doc-markdown');
    containers.forEach(function (container) {
      if (container.dataset.glossaryPath === window.location.pathname) return;
      autoTagGlossaryTerms(container);
      container.dataset.glossaryPath = window.location.pathname;
    });
  }

  function setupAutoTagging() {
    processPage();
    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        processPage();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function setupGlossary() {
    createTooltip();
    document.addEventListener('pointerover', function (event) {
      var term = event.target.closest('.glossary-term[data-definition]');
      if (term) showTooltip(term);
    });
    document.addEventListener('pointerout', function (event) {
      var term = event.target.closest('.glossary-term[data-definition]');
      if (term && !term.contains(event.relatedTarget)) hideTooltip(term);
    });
    document.addEventListener('focusin', function (event) {
      showTooltip(event.target.closest('.glossary-term[data-definition]'));
    });
    document.addEventListener('focusout', function (event) {
      hideTooltip(event.target.closest('.glossary-term[data-definition]'));
    });
    window.addEventListener('resize', function () {
      if (activeTerm) positionTooltip(activeTerm);
    });
    window.addEventListener('scroll', function () {
      if (activeTerm) positionTooltip(activeTerm);
    }, true);
    setupAutoTagging();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlossary);
  } else {
    setupGlossary();
  }
})();
