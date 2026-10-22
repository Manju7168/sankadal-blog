'use strict';
const english = {
researchCredit:'Researched and compiled by Manjunath Harakatti—a personal effort to document Sankadal’s history, heritage, and census records.',
brand:'Sankadal',stories:'Stories',about:'Our village',location:'Naragund taluk · Gadag district · Karnataka',headline:'Our village.\nOur stories.',intro:'A little home for the history, memories and everyday life of Sankadal.',explore:'Explore the stories',artLabel:'Our village, our pride',journal:'The village journal',latest:'From the village pages',edition:'Sankadal · The complete report',historyTag:'History',historyTitle:'Tracing the footsteps of the past',historyExcerpt:'An introduction to our village’s past through inscriptions, gazetteers and historical records.',read:'Read the story →',recordsTag:'Records',recordsTitle:'Our village through the census',recordsExcerpt:'Census records from 1951 to 2011 tell a story of change across generations.',memoriesTag:'Community',memoriesTitle:'Religious life and village news',memoriesExcerpt:'The math, village festivals and local news documented in the report.',roots:'Our roots',aboutTitle:'Welcome to Sankadal',aboutText:'Sankadal is our village in Naragund taluk, Gadag district, Karnataka. This blog is a place to share its history and people’s memories in Kannada and English.',historyBody:'According to the cited historical records, an inscription set into the platform of Sankadal’s Hanuman temple is among the village’s early written references. The report connects it with South Indian Inscriptions, volume XVIII, number 288. The stone is undated; the proposed date of approximately 1547–48 is an estimate in the report, not a confirmed date.',historySource:'Source: ARIE 1933–34; SII XVIII, No. 288. Independent verification against the original inscription remains pending.',recordsBody:'The historical census figures give a population of 661 in 1951 and 1,831 in 2011. Over the same period, households increased from 127 to 337. These are historical census figures, not estimates of the population today.',population1951:'Population in 1951',population2011:'Population in 2011',recordsSource:'Source: census records for 1951 and 2011. Independent verification of the original census tables remains pending.',memoriesBody:'A village’s history lives in more than documents. It lives in people’s memories, celebrations and old family photographs. This page can grow to include real village photographs and stories shared by residents. No contributed stories or photographs have been added yet.',back:'Back to stories ↑',heroByline:'— by Manjunath Harakatti',authorCredit:'Manjunath Harakatti',footer:'From our village, with warmth.',top:'Back to top ↑'
};
const translatedElements = [...document.querySelectorAll('[data-i18n]')];
const kannada = Object.fromEntries(translatedElements.map(el => [el.dataset.i18n, el.textContent]));
// Keep the heading’s line break without using HTML from translation strings.
kannada.headline = 'ನಮ್ಮ ಊರು.\nನಮ್ಮ ಕಥೆಗಳು.';
function setLanguage(language) {
  const selected = language === 'en' ? 'en' : 'kn';
  const dictionary = selected === 'en' ? english : kannada;
  translatedElements.forEach(el => { el.textContent = dictionary[el.dataset.i18n]; });
  document.querySelectorAll('[data-report-language]').forEach(panel => { panel.hidden = panel.dataset.reportLanguage !== selected; });
  document.querySelectorAll('[data-report-link]').forEach(link => { link.href = '#' + link.dataset.reportLink + '-' + selected; });
  // Keep the reader at the same report section when switching languages.
  if (location.hash.match(/-(kn|en)$/)) {
    const nextHash = location.hash.replace(/-(kn|en)$/, '-' + selected);
    history.replaceState(null, '', nextHash);
    requestAnimationFrame(() => document.getElementById(nextHash.slice(1))?.scrollIntoView());
  }
  document.documentElement.lang = selected;
  document.title = selected === 'en' ? 'Sankadal | Our village, our stories' : 'ಸಂಕದಾಳ | ನಮ್ಮ ಊರು, ನಮ್ಮ ಕಥೆಗಳು';
  document.querySelector('nav').setAttribute('aria-label', selected === 'en' ? 'Main navigation' : 'ಮುಖ್ಯ ಸಂಚರಣೆ');
  document.querySelector('[data-hero-photo]').alt = selected === 'en' ? 'A school building with a hill rising behind it' : 'ಶಾಲೆಯ ಕಟ್ಟಡ ಮತ್ತು ಅದರ ಹಿಂದಿರುವ ಗುಡ್ಡದ ನೋಟ';
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === selected)));
  try { localStorage.setItem('sankadal-language', selected); } catch (_) { /* Language switching also works when storage is unavailable. */ }
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
let savedLanguage = 'kn';
try { savedLanguage = localStorage.getItem('sankadal-language') || 'kn'; } catch (_) {}
if (location.hash.endsWith('-en')) savedLanguage = 'en';
if (location.hash.endsWith('-kn')) savedLanguage = 'kn';
setLanguage(savedLanguage);
document.querySelector('h1').style.whiteSpace = 'pre-line';
