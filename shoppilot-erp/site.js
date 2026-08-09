(() => {
  const shopData = {
    repair: {
      symbol: '🔧',
      kicker: 'Repair shop workflow',
      title: 'From item received to payment and delivery',
      description: 'Keep the customer, device or item, complaint, charges, progress, payment, and delivery history connected to one repair job.',
      flow: ['Find or add the customer', 'Record the item and complaint', 'Update status, charges, and payment', 'Complete and deliver with history intact'],
      features: ['Repair dashboard and searchable job list', 'Expected dates and clear status updates', 'Charges, payments, notes, and history', 'Customer-linked repair records'],
      href: 'user-manual.html#repair-shop',
      link: 'Open the detailed repair guide →'
    },
    bakery: {
      symbol: '🥖',
      kicker: 'Bakery workflow',
      title: 'Plan catalogue orders from booking to pickup',
      description: 'Keep products, quantities, customer orders, due dates, amounts, status, payment, and pickup or delivery together.',
      flow: ['Prepare the product catalogue', 'Create the customer order', 'Set quantities, amount, and due date', 'Update status through pickup or delivery'],
      features: ['Bakery dashboard and product catalogue', 'Order list with due dates and status', 'Customer-linked order details', 'Amount, payment, pickup, and delivery tracking'],
      href: 'user-manual.html#bakery',
      link: 'Open the detailed bakery guide →'
    },
    grocery: {
      symbol: '🛒',
      kicker: 'Grocery and retail workflow',
      title: 'Sell quickly while stock stays connected',
      description: 'Use a practical product and invoice flow for grocery, general retail, and counter sales, with customer details only when required.',
      flow: ['Add products and opening stock', 'Select items, quantity, and price', 'Choose a customer when needed', 'Record payment and save the invoice'],
      features: ['Grocery or retail dashboard', 'Products, stock, and low-stock visibility', 'Fast sales and invoice workflow', 'Purchases, suppliers, and stock transfers'],
      href: 'user-manual.html#grocery-retail',
      link: 'Open the detailed grocery and retail guide →'
    },
    restaurant: {
      symbol: '🍽',
      kicker: 'Restaurant workflow',
      title: 'Run tables, menu, kitchen work, and settlement',
      description: 'Keep dine-in and takeaway orders organised from table selection and menu entry through kitchen progress, billing, and payment.',
      flow: ['Choose a table or create the order', 'Add menu items and quantities', 'Send or update kitchen work', 'Review the bill and settle payment'],
      features: ['Table board and restaurant dashboard', 'Menu and order management', 'Kitchen order workflow', 'Billing, dues, and payment settlement'],
      href: 'user-manual.html#restaurant',
      link: 'Open the detailed restaurant guide →'
    },
    tailor: {
      symbol: '✂',
      kicker: 'Tailor workflow',
      title: 'Keep measurements, material, fitting, and delivery together',
      description: 'Reuse customer measurement profiles, add material and garment details, follow due dates, and track fitting, payment, and delivery.',
      flow: ['Find the customer and measurements', 'Create the order and choose material', 'Set amount, due date, and status', 'Complete fitting, payment, and delivery'],
      features: ['Tailor dashboard and order list', 'Reusable measurement profiles', 'Materials and garment details', 'Fitting, due-date, payment, and delivery status'],
      href: 'user-manual.html#tailor',
      link: 'Open the detailed tailor guide →'
    },
    garage: {
      symbol: '🚗',
      kicker: 'Garage workflow',
      title: 'Manage vehicles and job cards with service history',
      description: 'Connect each customer and vehicle to complaints, labour, parts, progress, payment, reminders, and completed service history.',
      flow: ['Find the customer and vehicle', 'Create the job card', 'Add parts, labour, amount, and progress', 'Record payment, reminder, and completion'],
      features: ['Garage dashboard, vehicles, and job cards', 'Parts and counter sales', 'Service reminders and follow-ups', 'Vehicle-linked work and payment history'],
      href: 'user-manual.html#garage',
      link: 'Open the detailed garage guide →'
    }
  };

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  const closeNavigation = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('open');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav?.classList.toggle('open', !isOpen);
  });
  siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  const shopTabs = [...document.querySelectorAll('[data-shop]')].filter((item) => item.matches('.shop-tab'));
  const symbol = document.querySelector('[data-shop-symbol]');
  const kicker = document.querySelector('[data-shop-kicker]');
  const title = document.querySelector('[data-shop-title]');
  const description = document.querySelector('[data-shop-description]');
  const flow = document.querySelector('[data-shop-flow]');
  const features = document.querySelector('[data-shop-features]');
  const guideLink = document.querySelector('.shop-panel-features a');

  const renderList = (list, values) => {
    if (!list) return;
    list.replaceChildren(...values.map((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    }));
  };

  const selectShop = (shopKey, focusTab = false) => {
    const data = shopData[shopKey];
    if (!data) return;

    shopTabs.forEach((tab) => {
      const selected = tab.dataset.shop === shopKey;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focusTab) tab.focus();
    });

    if (symbol) symbol.textContent = data.symbol;
    if (kicker) kicker.textContent = data.kicker;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    renderList(flow, data.flow);
    renderList(features, data.features);
    if (guideLink) {
      guideLink.href = data.href;
      guideLink.textContent = data.link;
    }
  };

  shopTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectShop(tab.dataset.shop));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + shopTabs.length) % shopTabs.length;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % shopTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = shopTabs.length - 1;
      selectShop(shopTabs[nextIndex].dataset.shop, true);
    });
  });

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
