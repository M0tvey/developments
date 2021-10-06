Чек-лист для сдачи верстки
Общее:

1) Все странички на тестовой площадке должны быть доступны по адресу /sitemap.html
2) Есть favicon под разные разрешения
3)Перед push проверить gitignore!
4)Стараемся отказываться от bootstrap, все классы наследуем в css @extend!
5)Одинаковые блоки на разных страницах должны быть сделаны одинаковыми классами. Все небольшие различия должны задаваться модификаторами.
6)Каждый блок должен быть в своем независимом контейнере (то есть, например, если 5 блоков находятся в классе .container , то лучше в container обернуть каждый из блоков). Это в дальнейшем облегчит интеграцию.

Ссылки:

1)Все пустые ссылки должны быть с заглушкой javascript:void(0);
2)target="blank" для ссылок на чужой сайт

Чистота кода:

1)В консоли нет ошибок и console.log
2)Нет дублирования кода, все прописано в отдельных функциях
3)В вёрстке не должны оставаться закомментированные «на всякий случай» куски кода, лишние неиспользуемые файлы, старые версии файлов и т.п. Все изменения и старые версии можно посмотреть через git
4)Классы, которые участвуют в js, должны быть с приставкой js (например: .js-toggle-block)

СSS:
1)Все переменные, миксины и медиа прописываются в одном файле (_variables.scss)
2)Стараемся отказываться от bootstrap, все классы наследуем в css @extend!

Адаптивность:

1)Нет горизонтальной прокрутки
2)Верстка гибкая, не ломается при изменении контента
3)Нет багов при изменении масштаба в браузере
4)Нет багов при переходе из мобильной версии в десктопную и обратно
5)Сайт корректно отображается на мобильных устройствах

Изображения:

1)Картинки оптимизированы по весу
2)Картинки бэкграундов, которые будут потом меняться (напирмер, загружаться через админку), задаются инлайново!

Формы:

1)Ресайз textarea не ломает верстку
2)Все label слинкованы с input
3)Формы валидируются во всех браузерах
4)Отправка форм: прописывать beforeSend, success, error обязательно!
5)По дефолту: если форма находится статично на странице, то после отправки вызывается попап; если форма находится в попапе, то после отправки меняется содерживмое попапа с соотвествующем тесктом (все варианты после отправки нужно СРАЗУ при получении мактов согласовать с дизайнером!)

Интерактив

1)У всех ссылок, button и прочих интерактивных элементах должен быть hover. Если в дизайне ховер не показан, делаем opacity 0.8
2) Всплывающие окна закрываются при клике на overlay

Верстка писем

Отказываемся от margin, padding, все верстаем на таблицах
Используем только универсальные шрифты, даже если в макете будут другие (об этом надо заранее предупредить дизайнера):
• Arial (без засечек)
• Helvetica (без засечек, Имеет закругленные строчные буквы и широкие заглавные)
• Times New Roman (с засечками)
• Georgia (c засечками)
• Verdana (без засечек, Характерная особенность этого шрифта — широкий внутрибуквенный просвет)
Стандартный размер тела письма – 600 или 800 px

Попапы

1)Все попапы должны лежать в отдельной папке popups и подтягиваться ajax-ом