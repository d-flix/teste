const WHATSAPP_NUMBER = '5551995460187';

const whatsappMessages = {
  teste: 'Olá! Vim pelo site da DFLIX e quero fazer o teste grátis de 4 horas. Pode me orientar conforme o meu aparelho?',
  'tres-telas': 'Olá! Quero testar o plano DFLIX de 3 telas simultâneas por R$ 29,90. Pode me explicar como funciona?',
  aparelho: 'Olá! Vim pelo site da DFLIX e quero consultar a compatibilidade do meu aparelho para fazer o teste grátis.',
  catalogo: 'Olá! Vim pelo site da DFLIX e gostaria de saber mais sobre o catálogo e fazer um teste grátis.',
  suporte: 'Olá! Preciso de atendimento da DFLIX.',
  duvidas: 'Olá! Vim pelo site da DFLIX e tenho uma dúvida antes de fazer o teste.',
  site: 'Olá! Vim pelo site da DFLIX e quero conhecer os planos e o teste grátis.'
};

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('[data-wa]').forEach((link) => {
  const key = link.dataset.wa;
  link.href = whatsappUrl(whatsappMessages[key] || whatsappMessages.site);
  link.target = '_blank';
  link.rel = 'noopener';
});

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mainNav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

const header = document.querySelector('.site-header');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('show'));
}

const deviceData = {
  smart: {
    eyebrow: 'Para TVs compatíveis',
    title: 'Interface ampla e controle remoto',
    text: 'Navegação criada para a tela grande, com categorias visíveis e orientação para instalar no modelo compatível.',
    list: ['Configuração acompanhada', 'Aplicativo indicado conforme o aparelho', 'Teste antes da assinatura'],
    image: 'assets/app-dflix-smart-tv.webp',
    alt: 'Prévia do aplicativo para Smart TV',
    tag: 'SMART TV'
  },
  android: {
    eyebrow: 'Para Android TV e TV Box',
    title: 'Uma experiência prática no sistema Android',
    text: 'A equipe ajuda a escolher uma opção compatível e orienta o acesso para TV Box e aparelhos com Android TV.',
    list: ['Navegação por categorias', 'Orientação para instalação', 'Compatibilidade confirmada no atendimento'],
    image: 'assets/app-android-tvbox.webp',
    alt: 'Prévia do aplicativo para Android TV e TV Box',
    tag: 'ANDROID / TV BOX'
  },
  mobile: {
    eyebrow: 'Para celular e computador',
    title: 'Acompanhe também fora da televisão',
    text: 'O acesso pode ser orientado para aparelhos móveis e computador, respeitando a compatibilidade e os limites do plano escolhido.',
    list: ['Uso individual ou como tela adicional', 'Orientação conforme o sistema', 'Ideal para acompanhar em outro ambiente'],
    image: 'assets/app-kplay-smart-tv.webp',
    alt: 'Prévia do aplicativo para celular e computador',
    tag: 'CELULAR / PC'
  }
};

const deviceTabs = document.querySelectorAll('.device-tab');
const previewFrame = document.querySelector('.preview-frame');
const deviceImage = document.getElementById('deviceImage');
const deviceEyebrow = document.getElementById('deviceEyebrow');
const deviceTitle = document.getElementById('deviceTitle');
const deviceText = document.getElementById('deviceText');
const deviceList = document.getElementById('deviceList');
const deviceTag = document.getElementById('deviceTag');

function setDevice(key) {
  const data = deviceData[key];
  if (!data) return;

  deviceTabs.forEach((tab) => {
    const active = tab.dataset.device === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  previewFrame?.classList.add('is-changing');
  window.setTimeout(() => {
    if (deviceImage) {
      deviceImage.src = data.image;
      deviceImage.alt = data.alt;
    }
    if (deviceEyebrow) deviceEyebrow.textContent = data.eyebrow;
    if (deviceTitle) deviceTitle.textContent = data.title;
    if (deviceText) deviceText.textContent = data.text;
    if (deviceTag) deviceTag.textContent = data.tag;
    if (deviceList) deviceList.innerHTML = data.list.map((item) => `<li>${item}</li>`).join('');
    previewFrame?.classList.remove('is-changing');
  }, 160);
}

deviceTabs.forEach((tab) => tab.addEventListener('click', () => setDevice(tab.dataset.device)));

const reviewTrack = document.querySelector('.reviews-track');
const reviewPrev = document.querySelector('.review-prev');
const reviewNext = document.querySelector('.review-next');

function scrollReviews(direction) {
  if (!reviewTrack) return;
  const card = reviewTrack.querySelector('.review-card');
  const amount = card ? card.getBoundingClientRect().width + 14 : reviewTrack.clientWidth;
  reviewTrack.scrollBy({ left: amount * direction, behavior: 'smooth' });
}
reviewPrev?.addEventListener('click', () => scrollReviews(-1));
reviewNext?.addEventListener('click', () => scrollReviews(1));

const planData = {
  family: {
    label: 'PLANO CASA COMPLETA',
    title: 'Todo mundo assiste junto.',
    description: 'Até três acessos simultâneos no mesmo plano, ideal para diferentes pessoas e aparelhos dentro de casa.',
    features: ['3 acessos ao mesmo tempo', 'Teste grátis de 4 horas', 'Configuração orientada', 'Atendimento humanizado'],
    price: '29,90',
    buttonPlan: '3 telas mensal',
    options: [
      ['Trimestral', 'R$ 79,90', '3 meses', '3 telas trimestral'],
      ['Semestral', 'R$ 149,90', '6 meses', '3 telas semestral'],
      ['Anual', 'R$ 209,90', '12 meses', '3 telas anual']
    ]
  },
  individual: {
    label: 'PLANO INDIVIDUAL',
    title: 'Um acesso para quem assiste sozinho.',
    description: 'Uma opção com um acesso por vez, indicada para uso individual e com escolha do aplicativo orientada pelo atendimento.',
    features: ['1 acesso por vez', 'Teste grátis de 3 horas', 'Configuração orientada', 'Conteúdo organizado'],
    price: '21,90',
    buttonPlan: '1 tela mensal',
    options: [
      ['Trimestral', 'R$ 57,90', '3 meses', '1 tela trimestral'],
      ['Semestral', 'R$ 139,90', '6 meses', '1 tela semestral'],
      ['Anual', 'R$ 189,90', '12 meses', '1 tela anual']
    ]
  }
};

const planTabs = document.querySelectorAll('.plan-tab');
const planLabel = document.getElementById('planLabel');
const planTitle = document.getElementById('planTitle');
const planDescription = document.getElementById('planDescription');
const planFeatures = document.getElementById('planFeatures');
const mainPrice = document.getElementById('mainPrice');
const mainPlanButton = document.getElementById('mainPlanButton');
const priceOptions = document.getElementById('priceOptions');

function planMessage(planName) {
  return `Olá! Vim pelo site da DFLIX e quero conhecer o plano ${planName}. Gostaria de fazer o teste antes de assinar.`;
}

function bindPriceOptionButtons() {
  priceOptions?.querySelectorAll('[data-plan-name]').forEach((button) => {
    button.addEventListener('click', () => window.open(whatsappUrl(planMessage(button.dataset.planName)), '_blank', 'noopener'));
  });
}

function setPlan(key) {
  const data = planData[key];
  if (!data) return;

  planTabs.forEach((tab) => {
    const active = tab.dataset.plan === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  if (planLabel) planLabel.textContent = data.label;
  if (planTitle) planTitle.textContent = data.title;
  if (planDescription) planDescription.textContent = data.description;
  if (planFeatures) planFeatures.innerHTML = data.features.map((item) => `<span>${item}</span>`).join('');
  if (mainPrice) mainPrice.textContent = data.price;
  if (mainPlanButton) {
    mainPlanButton.dataset.waPlan = data.buttonPlan;
    mainPlanButton.href = whatsappUrl(planMessage(data.buttonPlan));
    mainPlanButton.target = '_blank';
    mainPlanButton.rel = 'noopener';
  }
  if (priceOptions) {
    priceOptions.innerHTML = data.options.map(([period, price, length, planName]) => `
      <button type="button" data-plan-name="${planName}">
        <span>${period}</span><strong>${price}</strong><small>${length}</small>
      </button>`).join('');
    bindPriceOptionButtons();
  }
}

planTabs.forEach((tab) => tab.addEventListener('click', () => setPlan(tab.dataset.plan)));
setPlan('family');

const referralForm = document.getElementById('referralForm');
referralForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const referrer = document.getElementById('referrerName')?.value.trim();
  const lead = document.getElementById('leadName')?.value.trim();
  if (!referrer) {
    document.getElementById('referrerName')?.focus();
    return;
  }

  const message = `Olá! Vim pela área de indicação do site da DFLIX. Fui indicado por ${referrer}.${lead ? ` Meu nome é ${lead}.` : ''} Quero fazer o teste grátis e registrar a indicação. Caso eu assine, o indicador receberá 1 mês grátis.`;
  window.open(whatsappUrl(message), '_blank', 'noopener');
});

const year = document.getElementById('currentYear');
if (year) year.textContent = String(new Date().getFullYear());
