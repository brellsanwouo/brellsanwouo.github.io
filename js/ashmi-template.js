document.addEventListener('DOMContentLoaded', () => {
  setupNavbarBurger();
  setupHighlights();
  setupPublicationToggle();
  setupMiscTabs();
  setupCvSkillsTabs();
  setupCvRowToggles();
  setupCvShowMore();
  setupCvSkillShowMore();
});

function setupNavbarBurger() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById('navbar-menu');

  if (!burger || !menu) {
    return;
  }

  burger.addEventListener('click', () => {
    const expanded = burger.classList.toggle('is-active');
    menu.classList.toggle('is-active', expanded);
    burger.setAttribute('aria-expanded', String(expanded));
  });

  menu.querySelectorAll('a.navbar-item').forEach((item) => {
    item.addEventListener('click', () => {
      burger.classList.remove('is-active');
      menu.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupHighlights() {
  const contentEl = document.getElementById('highlight-content');
  const dotsEl = document.getElementById('highlight-dots');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (!contentEl || !dotsEl || !prevButton || !nextButton) {
    return;
  }

  const highlights = [
    {
      title: 'Dynamic Agent Generation for Self-Adaptive Root Cause Analysis',
      meta: 'SEAMS 2026 · Research Track · Rio de Janeiro',
      desc: 'Talk delivered on Tue 14 Apr 2026 at 11:00 in Oceania II.',
      link: 'https://conf.researchr.org/details/seams-2026/seams-2026-research-track/5/Dynamic-Agent-Generation-for-Self-Adaptive-Root-Cause-Analysis',
      image: './images/city-rio.jpg'
    },
    {
      title: 'Artifact of Dynamic Agent Generation for Self-Adaptive Root Cause Analysis',
      meta: 'SEAMS 2026 · Artifact Track · Rio de Janeiro',
      desc: 'Second talk on Tue 14 Apr 2026 at 11:15, recognized with Best Artifact Award.',
      link: 'https://conf.researchr.org/program/seams-2026/program-seams-2026/?date=Tue%2014%20Apr%202026&room=Oceania%20II&prog=Your%20Program&track=SEAMS%20Artifact%20Track',
      image: './images/city-rio.jpg'
    },
    {
      title: 'Breaking the Loop: AWARE is the New MAPE-K',
      meta: 'FSE 2025 · Trondheim, Norway',
      desc: 'Conference publication proposing a renewed adaptation model for autonomous software.',
      link: 'https://hal.science/hal-04992342/document',
      image: './images/city-trondheim.jpg'
    },
    {
      title: 'Generative AI-based Adaptation in Microservices Architectures',
      meta: 'ICWS 2025 · Helsinki, Finland',
      desc: 'Systematic mapping study on generative AI-driven adaptation in microservices.',
      link: 'https://hal.science/hal-05082732',
      image: './images/city-helsinki.jpg'
    },
    {
      title: 'Toward AI-based Complex Self-Adaptive Systems',
      meta: 'BENEVOL 2024 · Namur, Belgium',
      desc: 'Workshop work on AI-based complex self-adaptive systems and research roadmap.',
      link: 'https://inria.hal.science/hal-04896457/document',
      image: './images/city-namur.jpg'
    }
  ];

  let activeIndex = 0;
  let autoplay = null;

  const render = () => {
    const current = highlights[activeIndex];

    contentEl.innerHTML = `
      <div class="highlight-thumbnail">
        <img class="highlight-img" src="${current.image}" alt="highlight image" />
      </div>
      <div class="highlight-text">
        <div class="highlight-title">${current.title}</div>
        <div class="highlight-meta">${current.meta}</div>
        <p class="highlight-desc">${current.desc}</p>
        <a class="highlight-link" href="${current.link}" target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    `;

    dotsEl.innerHTML = '';
    highlights.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `dot${index === activeIndex ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to highlight ${index + 1}`);
      dot.addEventListener('click', () => {
        activeIndex = index;
        render();
        restartAutoplay();
      });
      dotsEl.appendChild(dot);
    });
  };

  const goNext = () => {
    activeIndex = (activeIndex + 1) % highlights.length;
    render();
  };

  const goPrev = () => {
    activeIndex = (activeIndex - 1 + highlights.length) % highlights.length;
    render();
  };

  const restartAutoplay = () => {
    if (autoplay) {
      clearInterval(autoplay);
    }
    autoplay = setInterval(goNext, 6500);
  };

  prevButton.addEventListener('click', () => {
    goPrev();
    restartAutoplay();
  });

  nextButton.addEventListener('click', () => {
    goNext();
    restartAutoplay();
  });

  render();
  restartAutoplay();
}

function setupPublicationToggle() {
  const toggleButton = document.getElementById('toggle-publications');
  const extraItems = document.querySelectorAll('.publication-extra');
  const totalItems = document.querySelectorAll('.publication-item').length;

  if (!toggleButton || extraItems.length === 0) {
    return;
  }

  const collapsedLabel = `Show all ${totalItems} Publications`;
  const expandedLabel = 'Show fewer publications';

  toggleButton.textContent = collapsedLabel;

  toggleButton.addEventListener('click', () => {
    const isCollapsed = extraItems[0].classList.contains('is-hidden');

    extraItems.forEach((item) => {
      item.classList.toggle('is-hidden', !isCollapsed);
    });

    toggleButton.textContent = isCollapsed ? expandedLabel : collapsedLabel;
  });
}

function setupMiscTabs() {
  const tabButtons = document.querySelectorAll('[data-misc-tab-button]');
  const tabPanels = document.querySelectorAll('[data-misc-tab-panel]');

  if (tabButtons.length === 0 || tabPanels.length === 0) {
    return;
  }

  const activateTab = (tabId, updateHash = false) => {
    tabButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.miscTabButton === tabId);
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.miscTabPanel === tabId);
    });

    if (updateHash) {
      window.location.hash = tabId;
    }
  };

  tabButtons.forEach((button) => {
    const anchor = button.querySelector('a');

    if (!anchor) {
      return;
    }

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      activateTab(button.dataset.miscTabButton, true);
    });
  });

  const syncFromHash = () => {
    const hash = window.location.hash;

    if (hash === '#awards') {
      activateTab('awards');
    } else if (hash === '#features') {
      activateTab('features');
    }
  };

  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
}

function setupCvSkillsTabs() {
  const tabButtons = document.querySelectorAll('[data-cv-skill-tab]');
  const tabPanels = document.querySelectorAll('[data-cv-skill-panel]');

  if (tabButtons.length === 0 || tabPanels.length === 0) {
    return;
  }

  const activateTab = (tabId) => {
    tabButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.cvSkillTab === tabId);
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.cvSkillPanel === tabId);
    });
  };

  tabButtons.forEach((button) => {
    const anchor = button.querySelector('a');

    if (!anchor) {
      return;
    }

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      activateTab(button.dataset.cvSkillTab);
    });
  });

  const syncFromHash = () => {
    const hashTarget = window.location.hash.replace('#', '');
    const knownTargets = new Set(['tech-skills', 'certifications', 'languages']);

    if (knownTargets.has(hashTarget)) {
      activateTab(hashTarget);
    }
  };

  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
}

function setupCvRowToggles() {
  const toggleButtons = document.querySelectorAll('[data-cv-row-toggle]');

  if (toggleButtons.length === 0) {
    return;
  }

  toggleButtons.forEach((button) => {
    const card = button.closest('.cv-row-card');
    const details = card ? card.querySelector('[data-cv-row-details]') : null;

    if (!details) {
      return;
    }

    button.addEventListener('click', () => {
      const isCollapsed = details.classList.contains('is-hidden');

      details.classList.toggle('is-hidden', !isCollapsed);
      button.classList.toggle('is-open', isCollapsed);
      button.setAttribute('aria-expanded', String(isCollapsed));
    });
  });
}

function setupCvShowMore() {
  const buttons = document.querySelectorAll('[data-cv-show-more-target]');

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    const target = button.dataset.cvShowMoreTarget;
    const label = button.dataset.cvShowMoreLabel || 'Items';
    const group = document.querySelector(`[data-cv-show-more-group="${target}"]`);

    if (!group) {
      return;
    }

    const rows = group.querySelectorAll('.cv-row-card');
    const hiddenRows = group.querySelectorAll('.cv-row-extra');

    if (hiddenRows.length === 0) {
      button.classList.add('is-hidden');
      return;
    }

    const collapsedLabel = `Show all ${rows.length} ${label}`;
    const expandedLabel = `Show fewer ${label.toLowerCase()}`;
    button.textContent = collapsedLabel;

    button.addEventListener('click', () => {
      const shouldExpand = hiddenRows[0].classList.contains('is-hidden');

      hiddenRows.forEach((row) => {
        row.classList.toggle('is-hidden', !shouldExpand);
      });

      button.textContent = shouldExpand ? expandedLabel : collapsedLabel;
    });
  });
}

function setupCvSkillShowMore() {
  const buttons = document.querySelectorAll('[data-cv-skill-show-more-target]');

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    const target = button.dataset.cvSkillShowMoreTarget;
    const group = document.querySelector(`[data-cv-skill-group="${target}"]`);

    if (!group) {
      return;
    }

    const extraItems = group.querySelectorAll('.cv-skill-extra');

    if (extraItems.length === 0) {
      button.classList.add('is-hidden');
      return;
    }

    const collapsedLabel = button.dataset.cvSkillShowMoreCollapsed || 'Show all';
    const expandedLabel = button.dataset.cvSkillShowMoreExpanded || 'Show fewer';
    button.textContent = collapsedLabel;

    button.addEventListener('click', () => {
      const shouldExpand = extraItems[0].classList.contains('is-hidden');

      extraItems.forEach((item) => {
        item.classList.toggle('is-hidden', !shouldExpand);
      });

      button.textContent = shouldExpand ? expandedLabel : collapsedLabel;
    });
  });
}
