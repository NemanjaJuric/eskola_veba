import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Course } from '../classes/course';
import { Lesson } from '../classes/lesson';
import { Programmer } from '../classes/programmer';
import { Technologie } from '../classes/technologie';
import { Button } from '../classes/button';
import 'rxjs/Rx';

const assetsDestination = 'assets/';
const coursesDestination = 'courses/';

const PROGRAMMERS: Array<Programmer> = [
    { name: 'Nemanja Jurić', course: 'eŠkola veba', url: assetsDestination + 'images/team/nemanja_juric.jpg' },
    { name: 'Milana Grab', course: 'jQuery', url: assetsDestination + 'images/team/milana_grab.jpg' },
    { name: 'Marija Vujičić', course: 'JavaScript', url: assetsDestination + 'images/team/marija_vujicic.jpg' },
    { name: 'Milena Milovanović', course: 'JavaScript', url: assetsDestination + 'images/team/milena_milovanovic.jpg' },
    { name: 'Milica Panić', course: 'CSS', url: assetsDestination + 'images/team/milica_panic.jpg' },
    { name: 'Tijana Spasić', course: 'JavaScript', url: assetsDestination + 'images/team/tijana_spasic.jpg' },
    { name: 'Marija Đorđević', course: 'JavaScript', url: assetsDestination + 'images/team/marija_djordjevic.jpg' },
    { name: 'Dragana Miletić', course: 'HTML', url: assetsDestination + 'images/team/dragana_miletic.jpg' },
    { name: 'Nikola Aćimović', course: 'CSS', url: assetsDestination + 'images/team/nikola_acimovic.jpg' },
    { name: 'Tamara Tešić', course: 'JavaScript', url: assetsDestination + 'images/team/tamara_tesic.jpg' },
    { name: 'Bojana Milivojević', course: 'CSS', url: assetsDestination + 'images/team/bojana_milivojevic.jpg' },
    { name: 'Petra Šarčević', course: 'CSS', url: assetsDestination + 'images/team/petra_sarcevic.jpg' },
    { name: 'Ivana Jovanović', course: 'CSS', url: assetsDestination + 'images/team/ivana_jovanovic.jpg' },
    { name: 'Ljubica Ilić', course: 'HTML', url: assetsDestination + 'images/team/ljubica_ilic.jpg' },
    { name: 'Tanja Ivanović', course: 'Bootstrap', url: assetsDestination + 'images/team/tanja_ivanovic.jpg' },
    { name: 'Miroslav Marić', course: 'profesor', url: assetsDestination + 'images/team/miroslav_maric.jpg' },
    { name: 'Aleksandar Đenić', course: 'asistent', url: assetsDestination + 'images/team/aleksandar_djenic.jpg' }
];

const COURSE_BUTTONS: Array<Button> = [
    { name: 'Prikaži u većem prozoru', func: 'open', icon: 'open_in_new', dataToggle: '', dataTarget: '' },
    { name: 'Prethodna lekcija', func: 'prev', icon: 'skip_previous', dataToggle: '', dataTarget: '' },
    { name: 'Pokreni kod', func: 'run', icon: 'play_circle_filled', dataToggle: '', dataTarget: '' },
    { name: 'Sledeća lekcija', func: 'next', icon: 'skip_next', dataToggle: '', dataTarget: '' },
    { name: 'Pomoć', func: 'help', icon: 'lightbulb_outline', dataToggle: 'modal', dataTarget: '#helpModal' },
]

const WEB_CENTER_BUTTONS: Array<Button> = [
    { name: 'Editor', func: 'editor', icon: 'create', dataToggle: '', dataTarget: '' },
    { name: 'Pregled', func: 'view', icon: 'visibility', dataToggle: '', dataTarget: '' },
    { name: 'Paleta', func: 'colors', icon: 'palette', dataToggle: '', dataTarget: '' },
    { name: 'Konvertor', func: 'converter', icon: 'loop', dataToggle: '', dataTarget: '' },
    { name: 'Transliterator', func: 'transliterator', icon: 'text_fields', dataToggle: '', dataTarget: '' }
]

const TS_COMPILER_BUTTONS: Array<Button> = [
    { name: 'Pokreni JS kod', func: 'openNewWindow', icon: 'open_in_new', dataToggle: '', dataTarget: '' },
    { name: 'Kompajliraj', func: 'runCompiler', icon: 'settings', dataToggle: '', dataTarget: '' }
]

const SASS_COMPILER_BUTTONS: Array<Button> = [
    { name: 'Kompajliraj', func: 'runCompiler', icon: 'settings', dataToggle: '', dataTarget: '' }
]

const LESSONS_INPUT_BUTTONS: Array<Button> = [
    { name: 'Pokreni kod', func: 'run', icon: 'play_circle_filled', dataToggle: '', dataTarget: '' },
    { name: 'Pomoć', func: 'help', icon: 'lightbulb_outline', dataToggle: 'modal', dataTarget: '#helpModal' }
]

const TECHNOLOGIES: Array<Technologie> = [
    { name: 'HTML5', url: assetsDestination + 'images/logos/html.png' },
    { name: 'CSS3', url: assetsDestination + 'images/logos/css.png' },
    { name: 'JavaScript', url: assetsDestination + 'images/logos/js.png' },
    { name: 'jQuery', url: assetsDestination + 'images/logos/jq.png' },
    { name: 'Bootstrap', url: assetsDestination + 'images/logos/bs.png' },
    { name: 'Sass', url: assetsDestination + 'images/logos/sass.png' },
    { name: 'PHP', url: assetsDestination + 'images/logos/php.png' },
    { name: 'TypeScript', url: assetsDestination + 'images/logos/ts.png' },
    { name: 'Angular', url: assetsDestination + 'images/logos/ang.png' }
]

const COURSES: Array<Course> = [
    {
        name: 'HTML',
        id: 'html',
        logo: '< >',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: 'Detalji o HTML-u',
        lessons: [
            { name: 'Uvod u HTML', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Struktura HTML-a', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Title', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Paragraf', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Font', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Novi red', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Headings', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Komentari', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Div', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Span', url: null, type: 'lesson', parentCourse: 'html', sublessons: null },
            {
                name: 'Liste', url: null, type: 'lesson', parentCourse: 'html', sublessons: [
                    { name: 'Uređene liste', url: null, type: 'sublesson', parentCourse: 'html', sublessons: null },
                    { name: 'Neuređene liste', url: null, type: 'sublesson', parentCourse: 'html', sublessons: null }
                ]
            },
            { name: 'Linkovi', url: 'html_linkovi', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Slike', url: 'html_slike-opste', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Slike kao linkovi', url: 'html_slike-SlikeKaoLinkovi', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Video', url: 'html_video', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Audio', url: 'html_audio', type: 'lesson', parentCourse: 'html', sublessons: null },
            {
                name: 'Tabele', url: null, type: 'lesson', parentCourse: 'html', sublessons: [
                    { name: 'Opšte', url: 'html_Tabele_opste', type: 'sublesson', parentCourse: 'html', sublessons: null },
                    { name: 'Rowspan', url: 'html_Tabele_Rowspan', type: 'sublesson', parentCourse: 'html', sublessons: null },
                    { name: 'Colspan', url: 'html_Tabele_Colspan', type: 'sublesson', parentCourse: 'html', sublessons: null },
                    { name: 'Kolone', url: 'html_Tabele_kolone', type: 'sublesson', parentCourse: 'html', sublessons: null },
                    { name: 'Header i footer', url: 'html_Tabele_Heder_i_futer', type: 'sublesson', parentCourse: 'html', sublessons: null }
                ]
            },
            { name: 'Input', url: 'html_input', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Select', url: 'html_select', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'Meta etikete', url: 'html_meta_etikete', type: 'lesson', parentCourse: 'html', sublessons: null },
            { name: 'HTML - veliki primer', url: 'html_primer', type: 'lesson', parentCourse: 'html', sublessons: null }
        ]
    },
    {
        name: 'CSS',
        id: 'css',
        logo: '{ }',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: `
        CSS (engl. Cascade Style Sheets, jezik formatiranja pomoću kog se definiše izgled elemenata veb-stranice) služi za definisanje stilova koji određuju izgled HTML elemenata. Da bi učenje CSS-a imalo nekog smisla morate znati HTML. Prvobitno, HTML je služio da definiše kompletan izgled, strukturu i sadržaj veb-stranice, ali je od verzije 4.0 HTML-a uveden CSS koji bi definisao konkretan izgled, dok je HTML ostao u funkciji definisanja strukture i sadržaja. CSS je lako naučiti i razumeti, ali pruža moćnu kontrolu nad prezentacijom HTML dokumenta. CSS ima daleko veće dizajnerske mogućnosti od čistog HTML-a. Zato je danas CSS gotovo nezamenjiv u dizajniranju Web stranica. 
        <br>
        <br>
        Na kraju ovog kursa ćete naučiti osnove CSS-a i kako da stilizujete svoju veb stranu.
        `,
        lessons: [
            { name: 'Uvod u CSS', url: 'css_uvod', type: 'lesson', parentCourse: 'css', sublessons: null },
            {
                name: 'Upotreba css-a', url: null, type: 'lesson', parentCourse: 'css', sublessons: [
                    { name: 'Linijska', url: 'css_upotreba_linijska', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Unutar dokumenta', url: 'css_upotreba_unutar_dokumenta', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'U zasebnom dokumentu', url: 'css_upotreba_van_dokumenta', type: 'sublesson', parentCourse: 'css', sublessons: null }
                ]
            },
            { name: 'CSS selektori', url: 'css_selektori', type: 'lesson', parentCourse: 'css', sublessons: null },
            { name: 'Boje u CSS-u', url: 'css_bojeucssu', type: 'lesson', parentCourse: 'css', sublessons: null },
            { name: 'Osobina teksta', url: 'css_osobineteksta', type: 'lesson', parentCourse: 'css', sublessons: null },
            { name: 'Box elementi', url: 'css_box_model', type: 'lesson', parentCourse: 'css', sublessons: null },
            {
                name: 'CSS klase', url: null, type: 'lesson', parentCourse: 'css', sublessons: [
                    { name: 'Grupisanje i ugnježdavanje klasa', url: 'css_grupisanje_i_ugnjezdavanje', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Pseudo klase', url: 'css_pseudo_klase', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Skraćeno pisanje osobina', url: 'css_skraceni_zapis_osobina', type: 'sublesson', parentCourse: 'css', sublessons: null }
                ]
            },
            { name: 'Slike kao pozadina', url: 'css_slike_u_pozadini', type: 'lesson', parentCourse: 'css', sublessons: null },
            { name: 'Display svojstvo', url: 'css_display', type: 'lesson', parentCourse: 'css', sublessons: null },
            {
                name: 'Pozicioniranje', url: null, type: 'lesson', parentCourse: 'css', sublessons: [
                    { name: 'Uvod u pozicioniranje', url: 'css_layout_stranice_uvod', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Float', url: 'css_layout_stranice_float', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Relative', url: 'css_layout_stranice_relativno_pozicioniranje', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Absolute', url: 'css_layout_stranice_apsolutno_pozicioniranje', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Fixed', url: 'css_layout_stranice_fiksno_pozicioniranje', type: 'sublesson', parentCourse: 'css', sublessons: null }
                ]
            },
            {
                name: 'Transformacije', url: null, type: 'lesson', parentCourse: 'css', sublessons: [
                    { name: 'Translacija i rotacija', url: 'css_translacija_rotacija', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Skaliranje i iskošenje', url: 'css_skaliranje_iskosenje', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: '3D transformacije', url: 'css_3d_transformacije', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'Razlika između 2D i 3D transformacija', url: 'css_razlika_2d_3d', type: 'sublesson', parentCourse: 'css', sublessons: null }
                ]
            },
            { name: 'Tranzicije', url: 'css_tranzicija', type: 'lesson', parentCourse: 'css', sublessons: null },
            {
                name: 'Animacije', url: null, type: 'sublesson', parentCourse: 'css', sublessons: [
                    { name: 'Uvod u CSS animacije', url: 'css_animacije1', type: 'sublesson', parentCourse: 'css', sublessons: null },
                    { name: 'CSS animacije', url: 'css_animacije2', type: 'sublesson', parentCourse: 'css', sublessons: null }
                ]
            },
            { name: 'Media upiti', url: 'css_media_upiti', type: 'lesson', parentCourse: 'css', sublessons: null }]
    },
    {
        name: 'JavaScript',
        id: 'js',
        logo: '( )',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: `JavaScript je najpopularniji programski jezik koji programira dinamično ponašanje naših veb stranica. JavaScript je lagan, ali izuzetno moćan programski jezik. Najčešće se sa njim susrećemo u našim pregledačima. 
        Čak i veb serveri mogu biti pokrenuti od strane JavaScript-a. Kao dinamičan programski jezik JavaScript ne mora biti pokrenut kroz kompajler koji čita kod u nešto što naš pregledač razume. Pregledač efektivno čita kod na isti način kao i mi, zatim ga interpretira. `,
        lessons: [
            { name: 'Uvod u JavaScript', url: 'js_uvod', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'Promenljive', url: 'js_promenljive', type: 'lesson', parentCourse: 'js', sublessons: null },
            {
                name: 'Tipovi podataka', url: null, type: 'lesson', parentCourse: 'js', sublessons: [
                    { name: 'Brojevi, Math', url: 'js_tipovipodataka', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Stringovi', url: 'js_tipovipodatakastringovi', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Bull, null i undefined', url: 'js_promenljivebulovevrednostinullnedefinisannevrednosti', type: 'sublesson', parentCourse: 'js', sublessons: null }
                ]
            },
            { name: 'Operacije', url: 'js_operacije', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'Nizovi', url: 'js_nizoviuvod', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'If', url: 'js_if', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'While petlja', url: 'js_while', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'For petlja', url: 'js_for', type: 'lesson', parentCourse: 'js', sublessons: null },
            {
                name: 'Funkcije', url: null, type: 'lesson', parentCourse: 'js', sublessons: [
                    { name: 'Uvod u funkcije', url: 'js_funkcije_uvod', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Korisničke funkcije', url: 'js_funkcije_korisnicke', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Ugrađene funkcije', url: 'js_funkcije_ugradjene', type: 'sublesson', parentCourse: 'js', sublessons: null },
                ]
            },
            { name: 'Objekti', url: 'js_objekti', type: 'lesson', parentCourse: 'js', sublessons: null },
            {
                name: 'DOM', url: null, type: 'lesson', parentCourse: 'js', sublessons: [
                    { name: 'DOM elementi', url: 'js_DOMelementi', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Veze sa HTML elementima', url: 'js_vezasaHTMLdokumentom', type: 'sublesson', parentCourse: 'js', sublessons: null }
                ]
            },
            { name: 'Događaji', url: 'js_dogadjaji', type: 'lesson', parentCourse: 'js', sublessons: null },
            { name: 'Callbacks', url: 'js_callbacksfunctions', type: 'lesson', parentCourse: 'js', sublessons: null },
            {
                name: 'Primeri', url: null, type: 'lesson', parentCourse: 'js', sublessons: [
                    { name: 'Primeri fukcija', url: 'js_funkcije_primeri', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Primeri objekata', url: 'js_objekti_primeri', type: 'sublesson', parentCourse: 'js', sublessons: null }
                ]
            },
            {
                name: 'Zadaci', url: null, type: 'lesson', parentCourse: 'js', sublessons: [
                    { name: 'Zadatak 1', url: 'js_zadaci_zadatak1', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Zadatak 2', url: 'js_zadaci_zadatak2', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Zadatak 3', url: 'js_zadaci_zadatak3', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Zadatak 4', url: 'js_zadaci_zadatak4', type: 'sublesson', parentCourse: 'js', sublessons: null },
                    { name: 'Zadatak 5', url: 'js_zadaci_zadatak5', type: 'sublesson', parentCourse: 'js', sublessons: null },
                ]
            }
        ]
    },
    {
        name: 'jQuery',
        id: 'jq',
        logo: '$',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: `JQuery je trenutno najpopularnija JavaScript biblioteka, koristimo je najčešće da bismo manipulisali DOM(Document Object Model) elementima, da bismo pravili određene animacije, Ajax aplikacije i još mnogo toga. 
        Prilično je laka za koristiti, posebno ako ste vec upoznati sa CSS-om i JavaScript-om. `,
        lessons: [
            { name: 'Uvod u jQuery', url: 'jq_uvod', type: 'lesson', parentCourse: 'jq', sublessons: null },
            { name: 'DOM', url: 'jq_dom', type: 'lesson', parentCourse: 'jq', sublessons: null },
            { name: 'Efekti', url: 'jq_effects', type: 'lesson', parentCourse: 'jq', sublessons: null },
            { name: 'Događaji', url: 'jq_events', type: 'lesson', parentCourse: 'jq', sublessons: null },
            { name: 'Selektori', url: 'jq_selektori', type: 'lesson', parentCourse: 'jq', sublessons: null }
        ]
    },
    {
        name: 'Bootstrap',
        id: 'bs',
        logo: 'B',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: `Bootstrap je front-end css frejmvork čija je osnovna namena kreiranje responzivnih veb stranica, tj. 
        stranica koje mogu da prilagođavaju svoj izgled u zavisnosti od rezolucije uredjaja na kojem se prikazuiju. 
        Bootstrap pruža veoma dobar temelj za njihovo kreiranje zbog svoje prilagodljivosti i nudi način da se uštedi vreme, 
        a postigne zadovoljavajući kvalitet. Nalazi se u klasi najpopularnijih radnih okruženja za razvoj veb aplikacija.`,
        lessons: [
            { name: 'Uvod u Bootstrap', url: 'bs_uvod', type: 'lesson', parentCourse: 'bs', sublessons: null }
        ]
    },
    {
        name: 'Angular',
        id: 'ang',
        logo: 'A',
        type: 'course',
        lang: 'text/html',
        displayLang: 'HTML',
        detailsText: 'Detalji o Angular-u',
        lessons: null
    },
    {
        name: 'PHP',
        id: 'php',
        logo: '<?>',
        type: 'course',
        lang: 'application/x-httpd-php',
        displayLang: 'PHP',
        detailsText: 'Detalji o PHP-u',
        lessons: null
    },
    {
        name: 'TypeScript',
        id: 'ts',
        logo: 'TS',
        type: 'course',
        lang: 'application/typescript',
        displayLang: 'TypeScript',
        detailsText: 'Detalji o TypeScript-u',
        lessons: [
            { name: 'Uvod u TypeScript', url: 'ts_uvod', type: 'lesson', parentCourse: 'ts', sublessons: null },
            { name: 'Promenljive u TypeScript-u', url: 'ts_promenljive', type: 'lesson', parentCourse: 'ts', sublessons: null },
            { name: 'Tipovi podataka u TypeScript-u', url: 'ts_tipovi_podataka', type: 'lesson', parentCourse: 'ts', sublessons: null },
            { name: 'Operatori u TypeScript-u', url: 'ts_operatori', type: 'lesson', parentCourse: 'ts', sublessons: null }
        ]
    },
    {
        name: 'Angular 2',
        id: 'ang2',
        logo: 'A',
        type: 'book',
        lang: '',
        displayLang: '',
        detailsText: '',
        lessons: null
    },
    {
        name: 'JSON',
        id: 'json',
        logo: 'J',
        type: 'course',
        lang: 'application/x-httpd-php',
        displayLang: 'Json',
        detailsText: `
        JSON (JavaScript Object Notation) je jedan od lakših tekstualnih otvorenih standarda ( javno dostupnih ) dizajniran za čitljivu razmenu podataka. Lak je i za čitanje i pisanje, kao i za generisanje i analiziranje. Izveden je iz JavaScript jezika za predstavljanje jednostavnih struktura podataka i asocijativnih nizova, odnosno objekata. JSON je prvi put korišćen u State Software kompaniji koju je osnovao Douglas Crockford koji je takodje i izumeo JSON. Veb sajt JSON.org je počeo sa radom 2002.godine a GOOGLE počinje sa upotrebom JSONa za svoje gData web protokole decembra 2006.`,
        lessons: [
            { name: 'JSON', url: 'json_uvod', type: 'lesson', parentCourse: 'json', sublessons: null },
        ]
    },
    {
        name: 'Veb',
        id: 'veb',
        logo: 'W',
        type: 'book',
        lang: '',
        displayLang: '',
        detailsText: `
        Internet je svetski sistem umreženih računarskih mreža koji povezuje veliki broj različitih mreža i računara širom cele planete na jedan nehijerarhijski način. S obzirom na to da je veoma kompleksan, teško je definisati ga jednom rečenicom. Sa jedne strane, internet se definiše preko hardverskih, komunikacionih i softverskih komponenti koje ga sačinjavaju: kablovi, bežična veza, sateliti, ruteri, internet dobavljači... Sa druge strane, definišemo ga preko usluga koje nudi svojim korisnicima: pregled hipertekstualnih dokumenata, elektronske pošte, prenos fajlova, prijavljivanje na udaljene računare, instant poruke, reprodukcija slike i zvuka u realnom vremenu... Broj računara na internetu se trenutno procenjuje na oko 150 milijardi. Količina informacija koju ti računari poseduju je ogromna, i teško je prikazati realno kolika je ona zaista. `,
        lessons: null
    }

]

@Injectable()
export class SchoolService {

  constructor(private http: Http) { }

  private extractData(res: Response) {
        let body = res.text();
        return body || "";
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getLessonText(url: string): Observable<string> {
        let getUrl = coursesDestination + url + ".html"
        return this.http.get(getUrl)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getLessonCode(url: string): Observable<string> {
        let getUrl = coursesDestination + url + "_primer.html"
        return this.http.get(getUrl)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getLessonHelp(url: string): Observable<string> {
        let getUrl = coursesDestination + url + "_pomoc.html"
        return this.http.get(getUrl)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getBookLessonText(url: string): Observable<string> {
        let getUrl = coursesDestination + url + "/index.html"
        return this.http.get(getUrl)
            .map(this.extractData)
            .catch(this.handleError)
    }

    getLessonSiblings(lessonUrl: string, courseUrl: string): Array<Lesson> {
        let allLessons: Array<Lesson> = [];
        let nextLesson: Lesson = null;
        let previousLesson: Lesson = null;
        let currentCourse: Course;
        COURSES.forEach(course => {
            if (course.id === courseUrl) {
                currentCourse = course;
            }
        })
        if (currentCourse.lessons != null) {
            currentCourse.lessons.forEach(lesson => {
                if (lesson.url != null || lesson.sublessons != null) {
                    if (lesson.sublessons != null) {
                        allLessons = allLessons.concat(lesson.sublessons);
                    } else {
                        allLessons = allLessons.concat(lesson);
                    }
                }
            })
        }
        allLessons.forEach((lesson, index, all) => {
            if (lesson.url === lessonUrl) {
                nextLesson = all[index + 1] != undefined ? all[index + 1] : all[index];
                previousLesson = all[index - 1] != undefined ? all[index - 1] : all[index];
            }
        });
        return [nextLesson, previousLesson];
    }

    getProgrammers(): Array<Programmer> {
        return PROGRAMMERS;
    }

    getCourses(): Array<Course> {
        return COURSES;
    }

    getCourse(_course: string): Course {
        let course = COURSES.find(course => {
            return course.id === _course;
        })
        return course;
    }

    getCourseButtons(): Array<Button> {
        return COURSE_BUTTONS;
    }

    getWebCenterButtons(): Array<Button> {
        return WEB_CENTER_BUTTONS;
    }

    getTSCompilerButtons(): Array<Button> {
        return TS_COMPILER_BUTTONS;
    }

    getSASSCompilerButtons(): Array<Button> {
        return SASS_COMPILER_BUTTONS;
    }

    getLessonsInputButtons(): Array<Button> {
        return LESSONS_INPUT_BUTTONS;
    }

    getTechnologies(): Array<Technologie> {
        return TECHNOLOGIES;
    }

}