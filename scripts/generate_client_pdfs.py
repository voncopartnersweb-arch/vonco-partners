from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

REPORT_PATH = OUTPUT_DIR / "Vonco_Partners_work_report_UK.pdf"
QUESTIONS_PATH = OUTPUT_DIR / "Vonco_Partners_client_questions_UK.pdf"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"

pdfmetrics.registerFont(TTFont("Arial", FONT_REGULAR))
pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_BOLD))
pdfmetrics.registerFont(TTFont("Arial-Italic", FONT_ITALIC))

RED = colors.HexColor("#D71920")
DARK = colors.HexColor("#151515")
INK = colors.HexColor("#242424")
MUTED = colors.HexColor("#666666")
LIGHT = colors.HexColor("#F2F3F5")
MID = colors.HexColor("#D9DCE1")
GREEN = colors.HexColor("#168447")
AMBER = colors.HexColor("#B26A00")
WHITE = colors.white


def styles_for(base_size=9.2):
    sample = getSampleStyleSheet()
    return {
        "cover_brand": ParagraphStyle(
            "cover_brand",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=11,
            leading=14,
            textColor=RED,
            spaceAfter=8,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=sample["Title"],
            fontName="Arial-Bold",
            fontSize=25,
            leading=30,
            textColor=DARK,
            alignment=TA_LEFT,
            spaceAfter=12,
        ),
        "cover_subtitle": ParagraphStyle(
            "cover_subtitle",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=11.5,
            leading=16,
            textColor=MUTED,
            spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=sample["Heading1"],
            fontName="Arial-Bold",
            fontSize=16,
            leading=20,
            textColor=DARK,
            spaceBefore=8,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=sample["Heading2"],
            fontName="Arial-Bold",
            fontSize=11.5,
            leading=14,
            textColor=RED,
            spaceBefore=7,
            spaceAfter=5,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "body",
            parent=sample["BodyText"],
            fontName="Arial",
            fontSize=base_size,
            leading=base_size * 1.42,
            textColor=INK,
            spaceAfter=5,
        ),
        "small": ParagraphStyle(
            "small",
            parent=sample["BodyText"],
            fontName="Arial",
            fontSize=7.6,
            leading=9.5,
            textColor=INK,
        ),
        "small_bold": ParagraphStyle(
            "small_bold",
            parent=sample["BodyText"],
            fontName="Arial-Bold",
            fontSize=7.6,
            leading=9.5,
            textColor=INK,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=sample["BodyText"],
            fontName="Arial",
            fontSize=base_size,
            leading=base_size * 1.4,
            textColor=INK,
            leftIndent=10,
            firstLineIndent=-8,
            spaceAfter=3,
        ),
        "callout": ParagraphStyle(
            "callout",
            parent=sample["BodyText"],
            fontName="Arial",
            fontSize=9.2,
            leading=13,
            textColor=INK,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=7.5,
            textColor=MUTED,
        ),
    }


def P(text, style):
    return Paragraph(text, style)


def bullet(text, s):
    return P(f"- {text}", s["bullet"])


def checkbox(text, s):
    return P(f"[ ] {text}", s["bullet"])


def callout(text, s, color=LIGHT, stripe=RED):
    table = Table([[P(text, s["callout"])]], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("BOX", (0, 0), (-1, -1), 0.4, MID),
                ("LINEBEFORE", (0, 0), (0, -1), 4, stripe),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


class ClientDocTemplate(BaseDocTemplate):
    def __init__(self, filename, display_title, pagesize=A4, **kwargs):
        self.document_title = display_title
        self.page_width, self.page_height = pagesize
        super().__init__(
            filename,
            pagesize=pagesize,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=20 * mm,
            bottomMargin=18 * mm,
            **kwargs,
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="normal",
        )
        self.addPageTemplates(
            [PageTemplate(id="content", frames=frame, onPage=self._decorate_page)]
        )

    def _decorate_page(self, canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(RED)
        canvas.setLineWidth(1.5)
        canvas.line(
            self.leftMargin,
            self.page_height - 12 * mm,
            self.page_width - self.rightMargin,
            self.page_height - 12 * mm,
        )
        canvas.setFont("Arial-Bold", 7.5)
        canvas.setFillColor(DARK)
        canvas.drawString(self.leftMargin, self.page_height - 9 * mm, "VONCO PARTNERS")
        canvas.setFont("Arial", 7.2)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(
            self.page_width - self.rightMargin,
            self.page_height - 9 * mm,
            self.document_title,
        )
        canvas.setStrokeColor(MID)
        canvas.setLineWidth(0.5)
        canvas.line(
            self.leftMargin,
            11 * mm,
            self.page_width - self.rightMargin,
            11 * mm,
        )
        canvas.setFont("Arial", 7.2)
        canvas.setFillColor(MUTED)
        canvas.drawString(self.leftMargin, 7 * mm, "Підготовлено 16 липня 2026 року")
        canvas.drawRightString(
            self.page_width - self.rightMargin, 7 * mm, f"Сторінка {doc.page}"
        )
        canvas.restoreState()


def cover(title, subtitle, status, s):
    return [
        Spacer(1, 18 * mm),
        P("VONCO PARTNERS", s["cover_brand"]),
        P(title, s["cover_title"]),
        P(subtitle, s["cover_subtitle"]),
        Spacer(1, 8 * mm),
        callout(status, s, color=colors.HexColor("#F8EFEF")),
        Spacer(1, 10 * mm),
        P("Дата актуальності: 16 липня 2026 року", s["body"]),
        P("Сайт: https://vonco.partners", s["body"]),
        Spacer(1, 15 * mm),
    ]


def status_table(s):
    rows = [
        [P("Напрям", s["small_bold"]), P("Статус", s["small_bold"]), P("Результат", s["small_bold"])],
        [P("SEO та індексація", s["small"]), P("Виконано", s["small_bold"]), P("Metadata, canonical, hreflang, schema, sitemap", s["small"])],
        [P("Нові сторінки", s["small"]), P("Виконано", s["small_bold"]), P("Викуп, блог, 4 нові міста", s["small"])],
        [P("Аналітика", s["small"]), P("Працює", s["small_bold"]), P("GTM, GA4, події, DebugView", s["small"])],
        [P("Search Console", s["small"]), P("Підключено", s["small_bold"]), P("Verified owner, GA4 link, sitemap подано", s["small"])],
        [P("Дані від замовника", s["small"]), P("Частково", s["small_bold"]), P("Очікуються умови викупу, автопарк, фото", s["small"])],
    ]
    table = Table(rows, colWidths=[45 * mm, 30 * mm, 96 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.35, MID),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def build_work_report():
    s = styles_for()
    doc = ClientDocTemplate(
        str(REPORT_PATH),
        "Звіт про виконані та наступні роботи",
        pagesize=A4,
        title="Vonco Partners - звіт про виконані та наступні роботи",
        author="Codex",
    )
    story = cover(
        "Звіт про виконані роботи",
        "Реалізація SEO-рекомендацій, розвиток сайту, аналітика та наступні кроки",
        "<b>Поточний статус:</b> основні зміни доступні на production. Додаткові виправлення за результатами автономного аудиту підготовлені локально та очікують публікації. GTM, GA4 і Search Console налаштовані; sitemap подано Google.",
        s,
    )
    story += [status_table(s), PageBreak()]

    story += [P("1. Короткий результат", s["h1"])]
    for item in [
        "Усунено ключові технічні SEO-помилки та дублювання бренду в title.",
        "Налаштовано 13 мовних версій: canonical, hreflang, x-default та коректні польські URL.",
        "Розширено автопарк, додано регіональні ціни, категорії платформ і сторінку авто під викуп.",
        "Створено сторінки Бельсько-Бяли, Гдині, Освенцима та Затора для польської, англійської, української та російської мов.",
        "Створено блог і першу локалізовану статтю для водіїв.",
        "Підключено GTM, GA4, події заявок і контактів, Search Console та production sitemap.",
        "Виконано повний обхід 492 production URL і 456 локальних індексованих URL, а також Lighthouse та перевірку залежностей.",
    ]:
        story.append(bullet(item, s))

    story += [P("2. Виконані технічні та SEO-роботи", s["h1"])]
    sections = [
        (
            "Metadata і мультимовність",
            [
                "Централізовано формування title та description; прибрано дублювання Vonco Partners.",
                "Перевірено canonical, Open Graph, hreflang для 13 мов і x-default.",
                "Виправлено redirect loop польської версії; /pl перенаправляється на canonical URL без префікса.",
                "Прибрано застарілі meta keywords і змішані мовні фрагменти.",
            ],
        ),
        (
            "Schema.org і навігація",
            [
                "Створено єдину LocalBusiness/Organization сутність з юридичною адресою в Katowice.",
                "Додано NIP, REGON, KRS, телефони, міста обслуговування та офіційні соціальні мережі.",
                "Уніфіковано Service, FAQPage, BreadcrumbList та Article schema.",
                "Додано видимі хлібні крихти на вкладені сторінки.",
            ],
        ),
        (
            "Sitemap і контроль якості",
            [
                "Sitemap містить нові міста, сторінку викупу, блог і статті; production sitemap має 492 URL.",
                "Мовні альтернативи додаються лише для перекладів, які реально готові.",
                "Створено npm run seo:audit для title, description, canonical, hreflang, H1, JSON-LD та sitemap.",
                "Успішно пройдено ESLint, TypeScript, build, i18n audit і браузерні перевірки.",
            ],
        ),
    ]
    for heading, items in sections:
        story.append(P(heading, s["h2"]))
        for item in items:
            story.append(bullet(item, s))

    story += [P("3. Комерційні сторінки та контент", s["h1"])]
    content_blocks = [
        (
            "Автопарк",
            "Ціни переведено у структурований формат, локалізовано валюту й період, додано порівняння автомобілів, категорії Uber/Bolt, регіональні тарифи та посилання на детальні картки.",
        ),
        (
            "Авто під викуп",
            "Створено /vykup-avto з описом процесу, FAQ, CTA, metadata та schema. Непідтверджені фінансові обіцянки не використовуються.",
        ),
        (
            "Міста",
            "Додано Бельсько-Бялу, Гдиню, Освенцим і Затор. Для Освенцима й Затора описано окремі зони Bolt, спільну конфігурацію Uber з Краковом і перемикання Uber для Закопаного.",
        ),
        (
            "Блог",
            "Створено список матеріалів, сторінку статті, Article schema, breadcrumbs, CTA та sitemap integration. Перший матеріал доступний чотирма мовами.",
        ),
    ]
    for heading, text in content_blocks:
        story.append(KeepTogether([P(heading, s["h2"]), P(text, s["body"])]))

    story += [P("4. Google Reviews", s["h1"])]
    story.append(
        callout(
            "У Google Business Profile на момент перевірки є <b>17 оцінок</b>. Стандартний Places API повертає до п'яти вибраних оцінок. Тому сайт показує всі <b>5</b> доступних через API: 2 з текстом і 3 з автором та рейтингом. Це ліміт джерела, а не дизайну сайту.",
            s,
            color=colors.HexColor("#FFF7EA"),
            stripe=AMBER,
        )
    )
    story.append(Spacer(1, 5 * mm))
    for item in [
        "Усі 17 оцінок доступні за прямим посиланням на Google Maps.",
        "Для автоматичного показу більш ніж п'яти потрібен Google Business Profile API з авторизацією власника або погоджена ручна добірка.",
        "Вигадані, дубльовані або непідтверджені відгуки не додаються.",
    ]:
        story.append(bullet(item, s))

    story += [PageBreak(), P("5. Аналітика та Search Console", s["h1"])]
    analytics_rows = [
        [P("Компонент", s["small_bold"]), P("Налаштування", s["small_bold"]), P("Статус", s["small_bold"])],
        [P("GTM", s["small"]), P("GTM-MN3FS6B8", s["small"]), P("Version 4 live", s["small_bold"])],
        [P("GA4", s["small"]), P("G-KK48Z3WBJP", s["small"]), P("Події надходять", s["small_bold"])],
        [P("Cookie consent", s["small"]), P("GTM лише після згоди", s["small"]), P("Працює", s["small_bold"])],
        [P("Search Console", s["small"]), P("Domain property, verified owner", s["small"]), P("Linked to GA4", s["small_bold"])],
        [P("Sitemap", s["small"]), P("492 URL, HTTP 200", s["small"]), P("Подано Google", s["small_bold"])],
    ]
    at = Table(analytics_rows, colWidths=[42 * mm, 75 * mm, 54 * mm], repeatRows=1)
    at.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.35, MID),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(at)
    story.append(Spacer(1, 5 * mm))
    story.append(P("Підготовлені події", s["h2"]))
    for event in [
        "application_form_start - початок заповнення форми",
        "application_city_select - вибір міста",
        "application_submit - натискання відправлення заявки",
        "quick_contact_click - телефон, Telegram, WhatsApp або SMS",
        "city_page_engaged_120s - активність на сторінці міста протягом 120 секунд",
    ]:
        story.append(bullet(event, s))
    story.append(P("У DebugView підтверджено page_view та quick_contact_click. Персональні дані форми в GA4 не передаються.", s["body"]))

    story += [P("6. Що ще залишилося", s["h1"])]
    remaining = [
        ("P0", "Підтвердити ціни, наявність авто та повні умови програми викупу/лізингу."),
        ("P0", "Позначити application_submit і quick_contact_click як Key events після появи у Recent events."),
        ("P1", "Додати в GA4 параметри channel, city, locale, transport і platform та створити custom dimensions."),
        ("P1", "Встановити Data retention 14 months і перевірити результат обробки sitemap."),
        ("P1", "Перевірити Schema.org через Rich Results Test і зробити URL Inspection пріоритетних /ru сторінок."),
        ("P1", "Отримати й обробити реальні фотографії автопарку, офісу та водіїв."),
        ("P2", "Замінити mailto-форму на серверне надсилання для вимірювання підтверджених заявок."),
        ("P2", "Розширити блог, FAQ, переклади та унікальні platform pages після підготовки контенту."),
        ("Регулярно", "Перевіряти індексацію раз на два тижні, трафік і заявки щомісяця."),
    ]
    rem_rows = [[P("Пріоритет", s["small_bold"]), P("Наступна дія", s["small_bold"])]]
    for priority, action in remaining:
        rem_rows.append([P(priority, s["small_bold"]), P(action, s["small"])])
    rt = Table(rem_rows, colWidths=[28 * mm, 143 * mm], repeatRows=1)
    rt.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), RED),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.35, MID),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(rt)

    story += [P("7. Рекомендований план на 30 днів", s["h1"])]
    plan_rows = [
        [P("Період", s["small_bold"]), P("Дії", s["small_bold"])],
        [P("Тиждень 1", s["small_bold"]), P("Дані автопарку й викупу, фото, Key events, retention, custom dimensions.", s["small"])],
        [P("Тиждень 2", s["small_bold"]), P("GSC sitemap processing, URL Inspection /ru, Rich Results Test, виправлення знайдених проблем.", s["small"])],
        [P("Тиждень 3", s["small_bold"]), P("Наступна стаття, розширений FAQ, підготовка додаткових перекладів.", s["small"])],
        [P("Тиждень 4", s["small_bold"]), P("Перший звіт: трафік, джерела, сторінки, контактні кліки, індексація й рекомендації.", s["small"])],
    ]
    pt = Table(plan_rows, colWidths=[30 * mm, 141 * mm], repeatRows=1)
    pt.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.35, MID),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(pt)
    story.append(Spacer(1, 7 * mm))
    story.append(P("8. Результат автономного технічного аудиту", s["h1"]))
    for item in [
        "Production: 492 URL зі sitemap, 492 відповіді HTTP 200, 0 критичних технічних помилок.",
        "15 некритичних production-попереджень стосуються однакових описів у вірменській та неповній грузинській локалізаціях.",
        "Грузинську локалізацію тимчасово прибрано з sitemap і hreflang та позначено noindex, follow до отримання професійного перекладу.",
        "Локальний production build: 456 індексованих URL, 0 помилок і 0 попереджень повного обходу.",
        "Production Lighthouse: mobile Performance 97/100, SEO 100/100; desktop усі чотири категорії 100/100.",
        "Відомі production-вразливості npm audit зменшено з 6 до 0; Next.js оновлено до 16.2.10.",
        "Посилено захисні HTTP-заголовки, заборонено кешування API чату, додано перевірку Origin, Content-Type і розміру запиту.",
        "Виправлено доступність каруселі, мінімальні мобільні зони натискання та блокування прокрутки під відкритим меню.",
    ]:
        story.append(bullet(item, s))
    story.append(Spacer(1, 5 * mm))
    story.append(callout("<b>Наступна контрольна точка:</b> отримання підтверджених комерційних даних від замовника та перевірка перших повних даних GA4/GSC після завершення обробки Google.", s, color=colors.HexColor("#EEF7F1"), stripe=GREEN))
    doc.build(story)


CARS = [
    ("Skoda Fabia", "2019-2023", "UberX, Uber Priority, Bolt", "500", "550"),
    ("Toyota Auris", "2010-2013", "UberX, Uber Hybrid, Uber Priority, Bolt Green", "600", "650"),
    ("Toyota Auris Comfort", "2019", "UberX, Uber Hybrid, Uber Priority, Bolt, Bolt Green", "650", "700"),
    ("Toyota Prius Plus", "2014-2016", "UberX, Uber Hybrid, Uber Priority, UberXL, Bolt Green, Bolt XL", "750", "800"),
    ("Toyota Prius Plus Comfort", "2016-2020", "UberX, Uber Hybrid, Uber Priority, Uber Comfort (2018+), UberXL, Bolt, Bolt Green, Bolt Comfort, Bolt XL", "800", "850"),
    ("Toyota Corolla", "2019-2022", "UberX, Uber Hybrid, Uber Priority, Uber Comfort, Bolt, Bolt Green, Bolt Comfort", "800", "850"),
    ("Suzuki Swace Hybrid", "2021-2023", "UberX, Uber Hybrid, Uber Priority, Uber Comfort, Bolt, Bolt Green, Bolt Comfort", "800", "850"),
    ("Toyota Camry", "2019-2022", "UberX, Uber Hybrid, Uber Priority, Uber Comfort, Bolt, Bolt Green, Bolt Comfort", "1 000", "900"),
    ("Lexus IS 300h", "2016", "UberX, Uber Hybrid, Uber Priority, Bolt, Bolt Green, Bolt Comfort, Bolt Premium", "900", "850"),
    ("Tesla Model 3", "2021-2023", "UberX, Uber Hybrid, Uber Priority, Uber Comfort, Bolt, Bolt Green, Bolt Comfort, Bolt Comfort Electric, Bolt Premium", "900", "1 000"),
]


def build_client_questions():
    s = styles_for(base_size=9.0)
    doc = ClientDocTemplate(
        str(QUESTIONS_PATH),
        "Інформація для уточнення у замовника",
        pagesize=landscape(A4),
        title="Vonco Partners - інформація для уточнення у замовника",
        author="Codex",
    )
    story = cover(
        "Інформація для уточнення",
        "Чеклист даних, необхідних для завершення комерційного контенту, автопарку та наступного етапу SEO",
        "<b>Як заповнювати:</b> підтвердьте правильні значення, виправте неактуальні та додайте відсутні дані. Паролі передавати не потрібно - доступи надаються через запрошення користувача.",
        s,
    )
    story.append(PageBreak())

    story += [P("1. Умови авто під викуп", s["h1"])]
    story.append(
        callout(
            "Вартість автомобіля, сума викупу, внесок, графік і строк не публікуються як універсальні ціни. Менеджер погоджує їх індивідуально для конкретного водія й автомобіля.",
            s,
            color=colors.HexColor("#FFF7EA"),
            stripe=AMBER,
        )
    )

    story += [P("2. Автопарк: підтвердити моделі, категорії та оренду", s["h1"])]
    story.append(P("Поточні дані сайту наведено нижче. Публікується тільки оренда у PLN за тиждень.", s["body"]))
    header = [
        P("Модель", s["small_bold"]),
        P("Рік", s["small_bold"]),
        P("Категорії", s["small_bold"]),
        P("Краківська група", s["small_bold"]),
        P("Катовіцька група", s["small_bold"]),
        P("Підтверджено", s["small_bold"]),
    ]
    rows = [header]
    for model, year, cats, rent_a, rent_b in CARS:
        rows.append(
            [
                P(model, s["small_bold"]),
                P(year, s["small"]),
                P(cats, s["small"]),
                P(f"{rent_a} PLN", s["small"]),
                P(f"{rent_b} PLN", s["small"]),
                P("[ ] Так  [ ] Ні", s["small"]),
            ]
        )
    car_table = Table(
        rows,
        colWidths=[42 * mm, 24 * mm, 86 * mm, 34 * mm, 34 * mm, 32 * mm],
        repeatRows=1,
    )
    car_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.35, MID),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(car_table)
    story.append(Spacer(1, 5 * mm))
    for item in [
        "Підтвердити, що Освенцим і Затор мають тарифи Кракова.",
        "Уточнити тариф для Гдині: група Гданська чи окремий прайс.",
        "Перевірити Toyota Camry, Lexus і Tesla: зараз Катовіце дешевше за Краків.",
        "Підтвердити, чи всі категорії Uber/Bolt актуальні для кожного року та міста.",
        "Додати Free Now там, де модель і місто реально підтримуються.",
        "Надати актуальну наявність і приблизну кількість авто кожної моделі.",
    ]:
        story.append(checkbox(item, s))

    story += [PageBreak(), P("3. Загальні умови оренди", s["h1"])]
    for item in [
        "Ціна брутто чи нетто?",
        "Розмір застави та умови її повернення.",
        "Що входить у тижневу оренду: OC/AC, сервіс, шини, техогляд, ліцензія, заміна авто.",
        "Ліміт пробігу й вартість перевищення.",
        "Франшиза або власна відповідальність при ДТП.",
        "Чи дозволено приватне використання автомобіля.",
        "Мінімальний строк оренди, попередження про розірвання й штрафи.",
        "У яких містах можна отримати й повернути автомобіль.",
        "Чи можна змінити модель під час співпраці.",
    ]:
        story.append(checkbox(item, s))

    story += [P("4. Міста й платформи", s["h1"])]
    story.append(P("Вже підтверджено: умови Освенцима й Затора практично такі самі, як у Кракові; Bolt використовує окремі зони, Uber працює спільно для Кракова/Освенцима/Затора, а перемикання на Закопане може займати до одного робочого дня.", s["body"]))
    for item in [
        "Підтвердити, чи Free Now реально доступний в Освенцимі та Заторі.",
        "Підтвердити формулювання про другий телефон і окремий Bolt-акаунт з урахуванням актуальних правил платформи.",
        "Підтвердити, в якому з офісів — Mysłowice чи Długa 1, 32-083 Szczyglice — видаються авто для водіїв з Освенцима й Затора.",
        "Надати локальний номер менеджера, якщо він відрізняється від номера краківського регіону.",
        "Підтвердити сезонність та головні робочі локації для Затора.",
    ]:
        story.append(checkbox(item, s))

    story += [P("5. Фотографії", s["h1"])]
    story.append(P("Потрібні оригінальні фотографії без стиснення і водяних знаків:", s["body"]))
    for item in [
        "кожна актуальна модель авто: спереду 45 градусів, збоку, ззаду, салон, багажник;",
        "загальний вигляд автопарку;",
        "офіс і зона видачі автомобілів;",
        "команда та менеджери;",
        "водій біля авто або момент передачі автомобіля;",
        "письмова згода людей на публікацію їхніх фото.",
    ]:
        story.append(checkbox(item, s))
    story.append(P("Допустима AI-обробка: світло, колір, кадрування, різкість, видалення випадкових об'єктів, нейтральний фон і розмиття номерів. Не можна змінювати модель, комплектацію, реальний стан авто або створювати неіснуючі машини.", s["body"]))

    story += [P("6. Контакти та публічні канали", s["h1"])]
    story.append(P("Вже підтверджено: @vonco_partners - основний контакт з офіс-менеджером; @voncopartnerstelegram - публічна група з новинами й рекомендаціями.", s["body"]))
    for item in [
        "Остаточно вирішити: залишити публічну Telegram-групу на сайті чи прибрати.",
        "Підтвердити телефони за регіонами та години роботи менеджерів.",
        "Підтвердити, хто відповідає на заявки з форми й у який строк.",
    ]:
        story.append(checkbox(item, s))

    story += [PageBreak(), P("7. Аналітика та доступи", s["h1"])]
    story.append(P("Налаштовано: GTM-MN3FS6B8, GA4 G-KK48Z3WBJP, Search Console Domain property, sitemap і події сайту.", s["body"]))
    for item in [
        "Надати робочий email підрядника як користувача GA4/GTM/GSC, якщо потрібне подальше обслуговування. Паролі не передавати.",
        "Підтвердити Data retention 14 months.",
        "Після появи подій у Recent events позначити application_submit і quick_contact_click як Key events.",
        "Вирішити, чи потрібно виключати внутрішній трафік офісу; для цього потрібна постійна IP-адреса.",
        "Погодити єдиний стандарт UTM-міток для реклами, Telegram і партнерських посилань.",
    ]:
        story.append(checkbox(item, s))

    story += [P("8. Контент, який потребує перевірки фахівців", s["h1"])]
    for item in [
        "Стаття про карту побиту - юридична перевірка перед публікацією.",
        "Стаття про податки й VAT - перевірка бухгалтером.",
        "Реалістичні діапазони доходу по містах - підтвердження операційними даними.",
        "15-20 реальних запитань водіїв для розширеного FAQ.",
        "План отримання нових відгуків Google після 2-4 тижнів роботи водія.",
    ]:
        story.append(checkbox(item, s))

    story += [P("9. Шаблон короткої відповіді", s["h1"])]
    answer_rows = [
        [P("Блок", s["small_bold"]), P("Відповідь замовника", s["small_bold"])],
        [P("Авто в наявності", s["small_bold"]), P("", s["small"])],
        [P("Ціни оренди", s["small_bold"]), P("", s["small"])],
        [P("Умови викупу/лізингу", s["small_bold"]), P("", s["small"])],
        [P("Що входить у платіж", s["small_bold"]), P("", s["small"])],
        [P("Міста й платформи", s["small_bold"]), P("", s["small"])],
        [P("Фото та дозволи", s["small_bold"]), P("", s["small"])],
        [P("Контакти", s["small_bold"]), P("", s["small"])],
    ]
    ans = Table(answer_rows, colWidths=[55 * mm, 196 * mm], rowHeights=[10 * mm] + [18 * mm] * 7, repeatRows=1)
    ans.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.5, MID),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(ans)
    story.append(Spacer(1, 6 * mm))
    story.append(callout("Після отримання підтверджених даних потрібно оновити сайт, повторно пройти SEO/analytics verification і зафіксувати зміни у клієнтському звіті.", s, color=colors.HexColor("#EEF7F1"), stripe=GREEN))
    doc.build(story)


if __name__ == "__main__":
    build_work_report()
    build_client_questions()
    print(REPORT_PATH)
    print(QUESTIONS_PATH)
