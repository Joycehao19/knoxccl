import $ from 'jquery';
import 'popper.js';
require('bootstrap-loader');

if ('customElements' in window) {
    require('dark-mode-toggle');
}

require('lazyload');
require('@fortawesome/fontawesome-free/css/brands.css');
require('@fortawesome/fontawesome-free/css/solid.css');
require('@fortawesome/fontawesome-free/css/fontawesome.css');
require('./main.css');

$( function() {

    async function load(id, url) {
        const response = await fetch(url);
        const body = await response.text();
        document.getElementById(id).innerHTML = body;
    }

    async function loadMeetingsTab() {
        await load('meetings', 'meetings.html');
        return Promise.all([load('agenda-2017-10', 'agendas/2017-10.html'),
                            load('agenda-2017-11', 'agendas/2017-11.html')]);
    }

    async function loadNewslettersTab() {
        await load('newsletters', 'newsletters.html');
        return Promise.all([load('newsletter-2017-10', 'newsletters/2017-10.html'),
                            load('newsletter-2017-11', 'newsletters/2017-11.html')]);
    }

    async function loadNewslettersAndPhotosTabs() {
        await Promise.all([loadNewslettersTab(), load('photos', 'photos.html')]);
        lazyload();
    }

    function logError(e) {
        console.log(`Error: {e.message}`);
    }

    function setupAboveFoldContent(){
        setUpDarkModeToggle();
        load('home', 'home.html').catch(logError);
        $('body').on('click', '.switch', function() {
            const match = $(this).attr('class').match(/to-tab-(\w+)/);
            if (match !== null && match.length > 1) {
                const tab = match[1];
                $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
        });
    }

    function setUpDarkModeToggle(){
        const toggle = document.querySelector('dark-mode-toggle');
        const body = document.body;

        // Set or remove the `dark` class the first time.
        if (toggle.mode === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }

        // Remember the user's last color scheme choice
        toggle.setAttribute('permanent', '');

        // Listen for toggle changes (which includes `prefers-color-scheme` changes)
        // and toggle the `dark` class accordingly.
        toggle.addEventListener('colorschemechange', () => {
            body.classList.toggle('dark-theme', toggle.mode === 'dark');
        });
    }

    setupAboveFoldContent();
    load('about', 'about.html').catch(logError);
    load('calendar', 'calendar.html').catch(logError);
    loadMeetingsTab().catch(logError);
    loadNewslettersAndPhotosTabs().catch(logError);
});