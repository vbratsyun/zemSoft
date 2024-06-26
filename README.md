# Сайт zemSoft

ООО "Земсофт" создано сообществом профессионалов для разработки программного обеспечения

1. В проекте реализована верстка страницы `index.html`.
2. Адаптивность сетки: мобильная, планшетная и десктопная версии.
3. Адаптивность графики: ретинизация, векторные изображения.
4. Используемая методология: БЭМ.
5. Используемый препроцессор - Sass.
6. Используемый инструмент автоматизации: Gulp.
7. Используемые библиотеки: нет.
8. Используемый шрифт: 'Tilda Sans'.

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Настройка вилки

[Откройте мастер-репозиторий] и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий будет скопирован в ваш аккаунт.

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк). Также обратите внимание, что клонировать можно репозиторий нужно через SSH или HTTPS. Если клонирование будет через SSH, нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Репозиторий создан

### 5. Не удаляйте и не обращайте внимание на файлы: `.editorconfig`, `.gitattributes`, `.gitignore`, `Readme.md`.

### 6. Обратите внимание, что папка с вашими исходными файлами — `source/`.

### 7. Для сборки необходимо установить [Node.js](https://nodejs.org/ru/) LTS 16.20.2 и т.д.


### 8. Из чего состоит сборка:

#### 8.1. package.json. Этот файл нужен для установки программ, которые будут выполнять всю работу, например, превращать SASS-файлы в CSS-файлы. 

#### 8.2. devDependencies. Все программы находятся в секции devDependencies. Набирая в терминале 
```
npm install,
```
вы скачиваете на ваш компьютер программы, указанные в devDependencies.

#### 8.3. scripts. В секции scripts описаны команды, которые можно вызвать в терминале.

```
npm start //запускает команду gulp start 
npm run build //запускает команду gulp styles 
npm test //запускает команды npm run editorconﬁg и npm run stylelint
npm run editorconﬁg //запускает команду editorconﬁg-cli 
npm run stylelint //запускает команду stylelint "source/sass/**/*.scss" --syntax scss

```

#### 8.4. gulpfile.js. Gulp — программа, которая позволяет быстро создавать автоматизацию: оптимизация картинок, минификация файлов, транспиляция Sass-файлов в CSS-файлы и так далее. Вся автоматизация описывается в файле gulpfile.js. gulpfile.js — файл с управляющими инструкциями, которые указывают, как именно будет происходить автоматизация. из чего состоит gulpfile.js.
Первая часть. Добавление программ
```
import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import del from "del";
import browser from "browser-sync";
```

В package.json мы скачали программы. В этой части происходит вызов программ. 

Вторая часть. Создание задач
Во второй части находятся задачи или таски, которые непосредственно выполняют поставленные перед ними цели.

```
const styles = () => { // Название задачи для дальнейшего обращения к ней.
  return gulp.src('source/sass/style.scss') // Нахождение необходимых файлов, над которыми будет производится работа.
    .pipe(plumber()) //  Здесь происходит непосредственно сама работа. В данном случае мы обрабатываем ошибки, затем превращаем Sass-файлы в CSS-файлы и в конце добавляем префиксы.
		.pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))//  Перенос итогового результата, CSS-файл с префиксами, в необходимую папку `source/css`.
    .pipe(browser.stream());
}
```

Третья часть. Наблюдатели
Здесь перечислены наблюдатели или вотчеры, которые следят за указанными файлами и при любых изменениях в наблюдаемых файлах запускают задачи.
```
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

gulp.watch('source/sass/**/*.scss', gulp.series('styles')); — следит за всеми препроцессорными Sass-файлами и, как только в файле будет изменения, например, вы добавите новое CSS-свойство, запустится задача styles, описание которой было чуть выше.
```

Четвёртая часть. Цепочки задач

Описание самых главных задач, которые управляют всеми мелкими задачами.

```
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, svg),
  gulp.series(server, watcher)
);

```

Когда в терминале вы набираете 

```
npm start,
```

вы запускаете задачу gulp. Это главная управляющая задача, которая запускает мелкие задачи:
styles — превращай Sass-файлы с CSS-файлы.
server — обновляй страницу в браузере.
watcher — при каждом изменении в файлах обновляй стили и перезапускай страницу в браузере.

### 9. Если в проекте имеется файл `package.json`, то установить все зависимости этого проекта можно командой в терминале

```
npm install
```

Эта команда загрузит все, что нужно проекту и поместит эти материалы в папку `node_modules`

### 10. Для запуска сборки проекта необходимо запустить задачу в терминале _gulp_.

```
npm start
```

### 11. Завершить работу сервера можно комбинацией клавиш

```
Ctrl + C
```
