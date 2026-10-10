/* ============================================================
   Beauty Studio — основной скрипт
   - бургер-меню (выезжает слева направо, повторное нажатие скрывает)
   - карусели (десктоп: стрелки; мобильный: нативный скролл)
   - модальное окно «Связаться»
   ============================================================ */

(function () {
    'use strict';

    // ---------- БУРГЕР-МЕНЮ ----------
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('navOverlay');

    /** Открыть/закрыть мобильное меню */
    function toggleMenu(force) {
        const willOpen = (typeof force === 'boolean')
            ? force
            : !nav.classList.contains('is-open');

        nav.classList.toggle('is-open', willOpen);
        burger.classList.toggle('is-open', willOpen);
        overlay.classList.toggle('is-open', willOpen);
        burger.setAttribute('aria-expanded', String(willOpen));
        // Блокируем скролл фона
        document.body.style.overflow = willOpen ? 'hidden' : '';
    }

    if (burger && nav) {
        // Повторное нажатие — закрытие
        burger.addEventListener('click', () => toggleMenu());
        // Клик по затемнению — закрытие
        overlay.addEventListener('click', () => toggleMenu(false));
        // Клик по пункту меню — закрытие
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
        // Закрытие по Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                toggleMenu(false);
            }
        });
    }

    // ---------- КАРУСЕЛИ ----------
    // На больших экранах используем стрелки .carousel__btn:
    // прокручиваем трек на ширину одной карточки.
    document.querySelectorAll('.carousel__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const selector = btn.dataset.target;
            if (!selector) return;
            const track = document.querySelector(selector);
            if (!track) return;

            const card = track.querySelector('.card');
            if (!card) return;

            // ширина карточки + gap
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
            const step = card.getBoundingClientRect().width + gap;

            const dir = btn.classList.contains('carousel__btn--left') ? -1 : 1;
            track.scrollBy({ left: dir * step, behavior: 'smooth' });
        });
    });

    // ---------- МОДАЛЬНОЕ ОКНО ----------
    const modal = document.getElementById('callModal');

    // Открываем глобально, т.к. вызывается через onclick в HTML
    window.openCallMenu = function () {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    // Закрытие: клик по фону или кнопке «Закрыть»
    window.closeCallMenu = function (e) {
        if (!modal) return;
        // Если клик внутри .modal__content — не закрываем (только по фону)
        if (e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Закрытие модалки по Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            window.closeCallMenu();
        }
    });

    // Кнопки «Связаться» открывают модальное окно
    document.querySelectorAll('.cta-btn, .btn--primary, .btn--ghost-light').forEach(btn => {
        btn.addEventListener('click', window.openCallMenu);
    });

    if (modal) {
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => window.closeCallMenu());
        }
        modal.addEventListener('click', e => {
            if (e.target === modal) window.closeCallMenu();
        });
    }

    // ---------- ЛАЙТБОКС (увеличение фото) ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxScale = document.getElementById('lightboxScale');
    const lightboxStage = lightbox ? lightbox.querySelector('.lightbox__stage') : null;

    // Все галерейные изображения: карточки каруселей и фото косметолога
    const galleryImages = Array.from(document.querySelectorAll('.card img, .profile-photo img'));

    let currentIndex = -1;
    let zoomLevel = 1;
    const ZOOM_MIN = 1;
    const ZOOM_MAX = 4;
    const ZOOM_STEP = 0.25;

    // Смещение при перетаскивании
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let panX = 0;
    let panY = 0;

    /** Применить текущий масштаб/смещение к изображению */
    function applyTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoomLevel + ')';
        if (lightboxScale) {
            lightboxScale.textContent = Math.round(zoomLevel * 100) + '%';
        }
        lightboxImg.classList.toggle('is-dragging', isDragging);
    }

    /** Сбросить масштаб и смещение */
    function resetZoom() {
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyTransform();
    }

    /** Установить масштаб с ограничениями */
    function setZoom(next) {
        zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
        // При возврате к 100% убираем смещение
        if (zoomLevel === 1) {
            panX = 0;
            panY = 0;
        }
        applyTransform();
    }

    /** Показать изображение по индексу (по кругу) */
    function showImage(index) {
        if (!lightboxImg || !galleryImages.length) return;
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const source = galleryImages[currentIndex];
        lightboxImg.src = source.currentSrc || source.src;
        lightboxImg.alt = source.alt || 'Просмотр изображения';
        resetZoom();
    }

    function openLightbox(index) {
        if (!lightbox) return;
        showImage(index);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isDragging = false;
    }

    if (lightbox) {
        // Клик (или Enter/Space) по изображению — открываем лайтбокс
        galleryImages.forEach((img, i) => {
            img.setAttribute('draggable', 'false');
            img.addEventListener('click', () => openLightbox(i));
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(i);
                }
            });
        });

        // Кнопки закрытия и навигации
        const lbClose = lightbox.querySelector('.lightbox__close');
        const lbPrev = lightbox.querySelector('.lightbox__nav--prev');
        const lbNext = lightbox.querySelector('.lightbox__nav--next');

        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        if (lbPrev) lbPrev.addEventListener('click', () => showImage(currentIndex - 1));
        if (lbNext) lbNext.addEventListener('click', () => showImage(currentIndex + 1));

        // Кнопки масштаба: −, +, 1:1
        lightbox.querySelectorAll('[data-zoom]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.zoom;
                if (action === 'in') setZoom(zoomLevel + ZOOM_STEP);
                else if (action === 'out') setZoom(zoomLevel - ZOOM_STEP);
                else resetZoom();
            });
        });

        // Масштаб колёсиком мыши
        lightbox.addEventListener('wheel', e => {
            e.preventDefault();
            setZoom(zoomLevel + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
        }, { passive: false });

        // Перетаскивание (мышь и касание) при увеличении
        const stage = lightboxStage || lightbox;
        stage.addEventListener('pointerdown', e => {
            if (zoomLevel <= 1) return;
            isDragging = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            if (lightboxImg) lightboxImg.classList.add('is-dragging');
            if (stage.setPointerCapture) {
                try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            }
        });
        stage.addEventListener('pointermove', e => {
            if (!isDragging) return;
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            applyTransform();
        });
        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            if (lightboxImg) lightboxImg.classList.remove('is-dragging');
        };
        stage.addEventListener('pointerup', endDrag);
        stage.addEventListener('pointercancel', endDrag);
        stage.addEventListener('pointerleave', endDrag);

        // Двойной клик по фото — быстрый зум
        if (lightboxImg) {
            lightboxImg.setAttribute('draggable', 'false');
            lightboxImg.addEventListener('dblclick', () => setZoom(zoomLevel > 1 ? 1 : 2));
        }

        // Клик по тёмному фону — закрытие
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox || e.target === lightboxStage) closeLightbox();
        });

        // Клавиатура: Esc, стрелки, +/−, 0
        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === '+' || e.key === '=') {
                setZoom(zoomLevel + ZOOM_STEP);
            } else if (e.key === '-' || e.key === '_') {
                setZoom(zoomLevel - ZOOM_STEP);
            } else if (e.key === '0') {
                resetZoom();
            }
        });
    }
})();