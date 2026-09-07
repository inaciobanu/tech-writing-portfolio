(function () {
  var tooltip;
  var activeTerm;

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlossary);
  } else {
    setupGlossary();
  }
})();