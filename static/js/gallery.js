(function () {
  var SAMPLES = [
    '0c3ca2b32545416f8f1e6f0e87def1a6',
    '154c88671d9e8785bd909e9283bc87fb2709ac7ce13890832603ea7533981a46',
    '245af7dde0cd4add9f7e11db3bbbccba',
    '25a32b2b119948c3b905a21db1098f45',
    '290af2dd390c95db88a35b8062fdd2ac1a9c28edc6533bc6a26ab2c83c523c61',
    '2A16A619-4A5E-4A4B-B7F7-2A5CD8B58C0F',
    '2ef369ebae66464f9d2479057a6bf6d2',
    '36CA80BB-2C3A-4EB1-A3D5-025E49B15D74',
    '416ea8eb185542499bab9b523c072fd6',
    '53d9d21ff95f42428225f906cd9a0a5a',
    '6499bf2bcc024d419bd23f4d2eb332ce',
    '7c8bd48528554b3da47f2510287d78b4',
    '87ae2a99547f4240a15f7fe30e9a7122',
    '8fb088daf56f434c9595b2d1e01ba2ea',
    '963c5f8b81c045fcab90387bf3aa5143',
    'AA1D1E77-99FA-4CF8-D339-2A2D27C70678',
    'C4686445-998B-4E04-B459-9DF7DA052E18',
    'D01F3FE3-F211-44D4-BF5C-1ECB686B2A7F',
    'ab3bb3e183991253ae66c06d44dc6105f3c113a1a1f819ab57a93c6f60b0d32b',
    'b8c12a34914f41c18bc4d2c3a9710562',
    'e3afb2e543314bd08dc1adcbabb1e5c6',
    'f044310ff65243f9b90fa0904025c034',
    'f0742330720b49e59740835a12380219',
    'f634e3aae845402ca63e015086c9dbb4'
  ];

  var COMPLEX = [
    'turret_railgun_source',
    'turret_anti_air_flak',
    'turret_repair_arm'
  ];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var v = entry.target;
      if (entry.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(function () {});
      } else if (v.src) {
        v.pause();
      }
    });
  }, { threshold: 0.1 });

  function makeVideo(id) {
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.poster = 'static/images/posters/' + id + '.jpg';
    video.dataset.src = 'static/videos/' + id + '.mp4';
    observer.observe(video);
    return video;
  }

  function chunk(arr, size) {
    var out = [];
    for (var i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  function initSwiper(el) {
    var shell = el.closest('.gallery-shell');
    new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 24,
      rewind: true,
      navigation: {
        nextEl: shell.querySelector('.swiper-button-next'),
        prevEl: shell.querySelector('.swiper-button-prev')
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true
      }
    });
  }

  function build() {
    var gallery = document.getElementById('video-gallery');
    if (gallery) {
      var wrapper = gallery.querySelector('.swiper-wrapper');
      chunk(SAMPLES, 4).forEach(function (ids) {
        var slide = document.createElement('div');
        slide.className = 'swiper-slide';
        var grid = document.createElement('div');
        grid.className = 'video-grid';
        ids.forEach(function (id) { grid.appendChild(makeVideo(id)); });
        slide.appendChild(grid);
        wrapper.appendChild(slide);
      });
      initSwiper(gallery);
    }

    var complex = document.getElementById('video-gallery-complex');
    if (complex) {
      var cWrapper = complex.querySelector('.swiper-wrapper');
      COMPLEX.forEach(function (id) {
        var slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(makeVideo(id));
        cWrapper.appendChild(slide);
      });
      initSwiper(complex);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
