(function () {
  function hideDuplicateTerms() {
    var seenTerms = new Set();

    document.querySelectorAll('.glossary-term[data-glossary-key]').forEach(function (term) {
      term.classList.remove('glossary-term--duplicate');
    });

    document.querySelectorAll('.glossary-term[data-glossary-key]').forEach(function (term) {
      var key = term.getAttribute('data-glossary-key');

      if (seenTerms.has(key)) {
        term.classList.add('glossary-term--duplicate');
      } else {
        seenTerms.add(key);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideDuplicateTerms);
  } else {
    hideDuplicateTerms();
  }

  new MutationObserver(hideDuplicateTerms).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();