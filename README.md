# BUILDPLACE.CZ — Строительные заказы по Чехии

Официальный одностраничный лендинг платформы строительных заказов в Чешской Республике.

## Особенности проекта
- **Дизайн в фирменном стиле логотипа**: строгая индустриальная эстетика, темная металлическая палитра и благородные бронзово-медные акценты.
- **Главная иллюстрация**: архитектурная панорама Праги со строительными кранами и строящимся объектом (без людей), адаптированная под чешский строительный сектор.
- **Фокус на Telegram-канал**: официальный канал [https://t.me/buildplacecz](https://t.me/buildplacecz) (`@buildplacecz`), мгновенный переход в канал при нажатии на кнопки в хедере, первом экране, карточках заказов, баннере и футере, а также удобная кнопка копирования прямой ссылки.
- **Мультиязычность (4 языка)**:
  - Русский (основной)
  - Čeština (чешский)
  - Українська (украинский)
  - English (английский)
- **Все блоки по структуре**:
  1. Главный экран (Hero) с акцентом на заказы в Чехии и переход в Telegram
  2. «Почему Buildplace.cz?» (5 ключевых преимуществ с иконками)
  3. «Как это работает?» (4 шага от подписки до выхода на объект)
  4. «Почему именно наша компания» (подробное описание преимуществ, охват профессий)
  5. Живая лента реальных заказов (Прага, Брно, Пльзень, Острава)
  6. Призыв к действию («СТРОЙ. РАБОТАЙ. ЗАРАБАТЫВАЙ.»)
  7. Фирменный футер с контактами: `info@buildplace.cz`, Instagram `buildplacecz`, Facebook и Telegram.

---

## Как выложить на GitHub и GitHub Pages

Проект полностью настроен для статического хостинга (в `vite.config.ts` настроен относительный базовый путь `base: './'`, что гарантирует корректную загрузку всех картинок, шрифтов и скриптов в любой подпапке репозитория на GitHub).

### Вариант 1. Загрузка через Git и деплой на GitHub Pages

1. Инициализируйте Git и сделайте коммит:
```bash
git init
git add .
git commit -m "Initial commit for Buildplace.cz landing page"
```

2. Привяжите ваш репозиторий на GitHub и отправьте код:
```bash
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ.git
git push -u origin main
```

3. Для автоматической публикации на **GitHub Pages**:
   - Соберите проект:
     ```bash
     npm run build
     ```
   - Загрузите содержимое папки `dist` в ветку `gh-pages`, либо используйте официальный GitHub Action:
     Создайте файл `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to GitHub Pages

     on:
       push:
         branches: [ main ]

     permissions:
       contents: read
       pages: write
       id-token: write

     concurrency:
       group: 'pages'
       cancel-in-progress: true

     jobs:
       deploy:
         environment:
           name: github-pages
           url: ${{ steps.deployment.outputs.page_url }}
         runs-on: ubuntu-latest
         steps:
           - name: Checkout
             uses: actions/checkout@v4
           - name: Set up Node
             uses: actions/setup-node@v4
             with:
               node-version: 20
           - name: Install dependencies
             run: npm install
           - name: Build
             run: npm run build
           - name: Setup Pages
             uses: actions/configure-pages@v4
           - name: Upload artifact
             uses: actions/upload-pages-artifact@v3
             with:
               path: './dist'
           - name: Deploy to GitHub Pages
             id: deployment
             uses: actions/deploy-pages@v4
     ```
   - В настройках репозитория на GitHub перейдите в **Settings** -> **Pages** и в качестве источника выберите **GitHub Actions**. Сайт моментально опубликуется и будет доступен в сети!

### Локальный запуск для разработки
```bash
npm install
npm run dev
```
